"use client";

import {
  ComponentPropsWithoutRef,
  ElementRef,
  forwardRef,
  useId,
  useMemo,
  useRef,
} from "react";
import useSpringAnimation from "./use-spring-animation";

const DISSOLVE_SCALE = 400;

export const Thanos = forwardRef<
  ElementRef<"div">,
  ComponentPropsWithoutRef<"div"> & {
    children: React.ReactNode;
    initialAmount?: number;
    amount: number;
    dissolveScale?: number;
  }
>(function (props, forwardedRef) {
  const {
    style,
    amount,
    initialAmount = props.amount,
    dissolveScale = DISSOLVE_SCALE,
    ...rest
  } = props;

  const id = useId();

  const seed = useMemo(() => Math.floor(Math.random() * 1000), []);

  const contentRef = useRef<HTMLDivElement | null>(null);
  const displacementMapRef = useRef<SVGFEDisplacementMapElement | null>(null);

  const currentValue = useRef(initialAmount);

  useSpringAnimation(currentValue, amount, {
    onValueChange: (value) => {
      displacementMapRef.current?.setAttribute(
        "scale",
        `${value * dissolveScale}`
      );

      if (contentRef.current) {
        contentRef.current.style.opacity = `${0 + 1 - Math.pow(value, 0.5)}`;
        contentRef.current.style.transform = `scale(${
          1 + Math.pow(value, 0.5) * 0.1
        })`;
      }
    },
  });

  return (
    <>
      <svg xmlns="http://www.w3.org/2000/svg" style={{ display: "none" }}>
        <defs>
          {/*
          Define 'dissolve-filter' to create the dissolve effect.
          Enlarged filter area to prevent clipping.
        */}
          <filter
            id={`${id}-dissolve`}
            x="-200%"
            y="-200%"
            width="500%"
            height="500%"
            colorInterpolationFilters="sRGB"
            overflow="visible"
          >
            {/* Generate large-scale fractal noise */}
            <feTurbulence
              type="fractalNoise"
              baseFrequency="0.004"
              numOctaves="1"
              seed={seed}
              result="bigNoise"
            />

            {/* Enhance noise contrast */}
            <feComponentTransfer in="bigNoise" result="bigNoiseAdjusted">
              <feFuncR type="linear" slope="3" intercept="-1" />
              <feFuncG type="linear" slope="3" intercept="-1" />
            </feComponentTransfer>

            {/* Generate fine-grained fractal noise */}
            <feTurbulence
              type="fractalNoise"
              baseFrequency="1"
              numOctaves="1"
              result="fineNoise"
            />

            {/* Merge the adjusted big noise and fine noise */}
            <feMerge result="mergedNoise">
              <feMergeNode in="bigNoiseAdjusted" />
              <feMergeNode in="fineNoise" />
            </feMerge>

            {/* Apply displacement map to distort the image */}
            <feDisplacementMap
              ref={displacementMapRef}
              in="SourceGraphic"
              in2="mergedNoise"
              scale={initialAmount * dissolveScale}
              xChannelSelector="R"
              yChannelSelector="G"
            />
          </filter>
        </defs>
      </svg>
      <div
        ref={(node) => {
          // Assign the node to both the innerRef and the forwardedRef
          contentRef.current = node;
          if (typeof forwardedRef === "function") {
            forwardedRef(node);
          } else if (forwardedRef) {
            forwardedRef.current = node;
          }
        }}
        {...rest}
        style={{
          opacity: 0 + 1 - Math.pow(initialAmount, 0.5),
          willChange: `opacity,filter,transform`,
          filter: `url(#${id}-dissolve)`,
          WebkitFilter: `url(#${id}-dissolve)`,
          ...style,
        }}
      />
    </>
  );
});

/**
 * Creates an ease out curve using a cubic bezier function
 * @param t Time parameter between 0 and 1
 * @returns Eased value between 0 and 1
 */
const easeOut = (t: number): number => {
  // Clamp input between 0 and 1
  t = Math.max(0, Math.min(1, t));

  // Using cubic bezier curve
  // Formula: 1 - (1 - t)^3
  // This creates a smooth deceleration curve
  return 1 - Math.pow(1 - t, 3);
};
