import { useRef } from 'react';

let id = 0;
const DEFAULT_ID_STRING = 'id__';

function getId(prefix?: string): string {
  const index = id++;
  return (prefix || DEFAULT_ID_STRING) + index;
}

export function useId(prefix?: string, providedId?: string): string {
  const ref = useRef<string | undefined>(providedId);
  if (!ref.current) {
    ref.current = getId(prefix);
  }
  return ref.current;
}
