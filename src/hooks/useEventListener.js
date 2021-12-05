import { useEffect, useRef } from 'react';

export default function useEventListener(
  eventType,
  callback,
  element = window,
  useCapture = false,
) {
  const callbackRef = useRef(callback);

  useEffect(() => {
    callbackRef.current = callback;
  }, [callback]);

  useEffect(() => {
    if (element == null) return undefined;
    const handler = e => callbackRef.current(e);
    element.addEventListener(eventType, handler, useCapture);

    return () => element.removeEventListener(eventType, handler);
  }, [eventType, element, useCapture]);
}
