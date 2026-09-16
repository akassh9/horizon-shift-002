import test from 'node:test';
import assert from 'node:assert/strict';
import { simulationResponse, readSimulation } from '../src/lib/simulation-stream.ts';

async function* parts(...items) { yield* items; }
async function read(response) { let text = ''; for await (const chunk of readSimulation(response)) text += chunk; return text; }
const stop = { type: 'finish', finishReason: 'stop' };

test('successful generation streams Unicode and requires a completion event', async () => {
  const response = await simulationResponse(parts({ type: 'text-delta', textDelta: '05:00 — Café' }, stop), assert.fail);
  assert.equal(response.status, 200);
  assert.equal(await read(response), '05:00 — Café');
});
test('provider error before output returns 502 instead of empty 200', async () => {
  const errors = [];
  const response = await simulationResponse(parts({ type: 'error', error: new Error('private provider details') }), e => errors.push(e));
  assert.equal(response.status, 502);
  await assert.rejects(read(response), /could not finish/);
  assert.equal(errors.length, 1);
});
test('empty successful provider stream is rejected', async () => {
  const response = await simulationResponse(parts(stop), () => {});
  assert.equal(response.status, 502);
});
test('midstream failure remains a failure after HTTP headers were sent', async () => {
  const response = await simulationResponse(parts({ type: 'text-delta', textDelta: 'Partial' }, { type: 'error', error: new Error('private details') }), () => {});
  assert.equal(response.status, 200);
  await assert.rejects(read(response), /could not finish/);
});
test('token exhaustion is not presented as a completed day', async () => {
  const response = await simulationResponse(parts({ type: 'text-delta', textDelta: 'Partial' }, { type: 'finish', finishReason: 'length' }), () => {});
  await assert.rejects(read(response), /could not finish/);
});
test('empty and interrupted HTTP responses are rejected', async () => {
  await assert.rejects(read(new Response('')), /could not finish/);
  await assert.rejects(read(new Response('{"type":"text","text":"Partial"}\n')), /could not finish/);
});
test('decoder preserves multibyte text split across network chunks', async () => {
  const bytes = new TextEncoder().encode('{"type":"text","text":"Café — 2034"}\n{"type":"done"}\n');
  const response = new Response(new ReadableStream({ start(controller) {
    for (const byte of bytes) controller.enqueue(new Uint8Array([byte]));
    controller.close();
  } }));
  assert.equal(await read(response), 'Café — 2034');
});
