import { useEffect, useRef } from "react";

type AfkHandlerOptions = {
  timeout?: number;
  onAfk: () => void;
};

export default function useAfkHandler({
  timeout = 5 * 60 * 1000,
  onAfk,
}: AfkHandlerOptions) {
  const timer = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    const resetTimer = () => {
      if (timer.current) clearTimeout(timer.current);
      timer.current = setTimeout(() => {
        onAfk();
      }, timeout);
    };

    const events = ["mousemove", "keydown", "mousedown", "touchstart"];
    events.forEach((event) => window.addEventListener(event, resetTimer));

    resetTimer();

    return () => {
      if (timer.current) clearTimeout(timer.current);
      events.forEach((event) => window.removeEventListener(event, resetTimer));
    };
  }, [timeout, onAfk]);
}
