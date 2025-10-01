import { useState, useEffect } from "react";

export default function useFlickerOpacity(baseHex, flickerRange, intervalMs) {
  const [flickerOpacity, setFlickerOpacity] = useState(baseHex);
  const [range, setRange] = useState(flickerRange);

  useEffect(() => {
    const base = parseInt(baseHex, 16);
    const interval = setInterval(() => {
      const offset = Math.floor((Math.random() - 0.5) * 2 * range);
      let newVal = Math.max(0, Math.min(255, base + offset));
      setFlickerOpacity(newVal.toString(16).padStart(2, '0').toUpperCase());
    }, intervalMs);
    return () => clearInterval(interval);
  }, [baseHex, range, intervalMs]);

  return [flickerOpacity, setRange];
}
