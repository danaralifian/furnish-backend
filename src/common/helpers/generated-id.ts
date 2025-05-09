import { customAlphabet } from 'nanoid';

export function generateCustomId(prefix: string): string {
  const nanoid = customAlphabet('1234567890ABCDEFGHIJKLMNOPQRSTUVWXYZ', 6); // 6-char random
  const date = new Date();
  const dateString = date.toISOString().slice(0, 10).replace(/-/g, ''); // YYYYMMDD
  return `${prefix}-${dateString}-${nanoid()}`;
}
