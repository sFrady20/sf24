import { MutableRefObject, useEffect, useMemo } from "react";

// Spring animation defaults
const SPRING_TENSION = 0.05;
const SPRING_DAMPING = 0.1;
const SPRING_PRECISION = 0.001;

function useSpringAnimation(
  valueRef: MutableRefObject<number>,
  goal: number,
  options?: {
    tension?: number;
    damping?: number;
    precision?: number;
    onValueChange?: (value: number) => void;
  }
) {
  const {
    tension = SPRING_TENSION,
    damping = SPRING_DAMPING,
    precision = SPRING_PRECISION,
    onValueChange,
  } = options || {};

  useEffect(() => {
    let velocity = 0;
    let animationFrameId: number | null = null;
    let isAnimating = true;

    const animate = () => {
      if (!isAnimating) return;

      // Calculate spring physics
      const distance = goal - valueRef.current;
      const force = distance * tension;

      // Apply damping to velocity
      velocity = velocity * damping + force;

      // Update the current value
      valueRef.current += velocity;
      onValueChange?.(valueRef.current);

      // Check if we're close enough to stop animating
      if (Math.abs(distance) < precision && Math.abs(velocity) < precision) {
        valueRef.current = goal; // Snap to final value
        onValueChange?.(valueRef.current);
        isAnimating = false;
        return;
      }

      // Request next frame
      animationFrameId = requestAnimationFrame(animate);
    };

    // Start animation
    animate();

    // Cleanup function
    return () => {
      isAnimating = false;
      if (animationFrameId !== null) {
        cancelAnimationFrame(animationFrameId);
      }
    };
  }, [goal, tension, damping, precision]);
}

export default useSpringAnimation;
