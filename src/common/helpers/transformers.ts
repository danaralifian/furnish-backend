import { Transform } from 'class-transformer';

// Custom decorator to convert string to number automatically
export function ToNumber() {
  return Transform(({ value }): number | null | undefined =>
    value !== null && value !== undefined ? Number(value) : value,
  );
}
