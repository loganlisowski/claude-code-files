"use client";

import { useEffect, useRef } from "react";
import confetti from "canvas-confetti";

interface ConfettiEffectProps {
  trigger: boolean;
}

export function ConfettiEffect({ trigger }: ConfettiEffectProps) {
  const hasFired = useRef(false);

  useEffect(() => {
    if (trigger && !hasFired.current) {
      hasFired.current = true;
      confetti({
        particleCount: 200,
        spread: 70,
        origin: { y: 0.6 },
      });
    }

    if (!trigger) {
      hasFired.current = false;
    }
  }, [trigger]);

  return null;
}
