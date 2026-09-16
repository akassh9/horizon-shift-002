type GenerationPart =
  | { type: 'text-delta'; textDelta: string }
  | { type: 'error'; error: unknown }
  | { type: 'finish'; finishReason: string }
  | { type: string };

const failureMessage = 'The simulation could not finish. Please try again.';

// Keep errors and completion explicit: an empty HTTP 200 must never look successful.
export async function simulationResponse(
  parts: AsyncIterable<GenerationPart>,
  onError: (error: unknown) => void,
): Promise<Response> {
  const iterator = parts[Symbol.asyncIterator]();
  const encoder = new TextEncoder();
  const encode = (event: object) => encoder.encode(JSON.stringify(event) + '\n');
  let hasText = false;
  let finished = false;

  const nextEvent = async (): Promise<object> => {
    while (true) {
      const next = await iterator.next();
      if (next.done) {
        if (!hasText || !finished) throw new Error('Empty or interrupted generation');
        return { type: 'done' };
      }
      const part = next.value;
      if (part.type === 'error' && 'error' in part) throw part.error;
      if (part.type === 'finish' && 'finishReason' in part) {
        if (part.finishReason !== 'stop') throw new Error('Incomplete generation');
        finished = true;
      }
      if (part.type === 'text-delta' && 'textDelta' in part && part.textDelta) {
        hasText ||= part.textDelta.trim().length > 0;
        return { type: 'text', text: part.textDelta };
      }
    }
  };

  // Await the first event so authentication/model errors can return a real 502.
  let first: object;
  try {
    first = await nextEvent();
  } catch (error) {
    onError(error);
    await iterator.return?.();
    return Response.json({ error: failureMessage }, { status: 502 });
  }

  return new Response(new ReadableStream<Uint8Array>({
    start(controller) { controller.enqueue(encode(first)); },
    async pull(controller) {
      try {
        const event = await nextEvent();
        controller.enqueue(encode(event));
        if ('type' in event && event.type === 'done') controller.close();
      } catch (error) {
        onError(error);
        controller.enqueue(encode({ type: 'error', error: failureMessage }));
        controller.close();
        await iterator.return?.();
      }
    },
    async cancel() { await iterator.return?.(); },
  }), { headers: { 'Content-Type': 'application/x-ndjson', 'Cache-Control': 'no-store' } });
}

export async function* readSimulation(response: Response): AsyncGenerator<string> {
  if (!response.ok) {
    const body = await response.json().catch(() => null);
    throw new Error(typeof body?.error === 'string' ? body.error : failureMessage);
  }
  if (!response.body) throw new Error(failureMessage);
  const reader = response.body.getReader();
  const decoder = new TextDecoder();
  let buffer = '';
  let hasText = false;
  let completed = false;
  try {
    while (true) {
      const { done, value } = await reader.read();
      buffer += decoder.decode(value, { stream: !done });
      let end: number;
      while ((end = buffer.indexOf('\n')) >= 0) {
        const line = buffer.slice(0, end);
        buffer = buffer.slice(end + 1);
        if (!line.trim()) continue;
        const event = JSON.parse(line);
        if (event.type === 'error') throw new Error(failureMessage);
        if (event.type === 'text' && typeof event.text === 'string') {
          hasText ||= event.text.trim().length > 0;
          yield event.text;
        } else if (event.type === 'done') completed = true;
      }
      if (done) break;
    }
    if (!hasText || !completed || buffer.trim()) throw new Error(failureMessage);
  } finally {
    await reader.cancel().catch(() => undefined);
    reader.releaseLock();
  }
}
