export function isPresent<T>(obj: T | null | undefined): obj is T {
  return obj != null;
}
