import { useRef } from "react";

type UseDebounceReturn = {
  debounce: (callback: () => void, delay: number) => void;
}

export function useDebounce(): UseDebounceReturn {
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const debounce = (callback: () => void, delay: number) =>{
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }

    timeoutRef.current = setTimeout(() => callback(), delay);
  }

  return { debounce };
}
