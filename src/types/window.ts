export type WindowConfig = {
    key: string;
    pos: { x: number; y: number };
    size: { width: number | 'auto'; height: number | 'auto' };
    type: 'image' | 'text';
    src?: string;
    text?: string;
  };