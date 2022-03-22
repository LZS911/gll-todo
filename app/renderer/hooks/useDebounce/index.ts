import * as React from 'react';

export default function useDebounce(fn: (e: any) => void, delay: number, dep: Array<any> = []) {
  const { current } = React.useRef<{ fn: (e: any) => void; timer: NodeJS.Timeout | null }>({
    fn,
    timer: null,
  });
  React.useEffect(() => {
    current.fn = fn;
  }, [fn, current]);

  return React.useCallback((e: any) => {
    if (current.timer) {
      clearTimeout(current.timer);
    }
    current.timer = setTimeout(() => {
      current.fn(e);
    }, delay);
  }, dep);
}
