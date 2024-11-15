"use client";

import {
  ComponentPropsWithoutRef,
  ElementRef,
  forwardRef,
  memo,
  useEffect,
  useId,
  useMemo,
  useState,
} from "react";

export const Thanos = forwardRef<
  ElementRef<"div">,
  ComponentPropsWithoutRef<"div"> & {
    children: React.ReactNode;
    amount: number;
  }
>(function (props, ref) {
  const { style, amount, ...rest } = props;

  const id = useId();

  const [noise, setNoise] = useState(1);

  useEffect(() => {
    const interval = setInterval(() => {
      setNoise((x) => {
        if (x <= 0.001) {
          clearInterval(interval);
        }
        return (x *= 0.88);
      });
    }, 100);
  }, []);

  const seed = useMemo(() => Math.floor(Math.random() * 1000), []);

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
              in="SourceGraphic"
              in2="mergedNoise"
              scale={noise * 2000}
              xChannelSelector="R"
              yChannelSelector="G"
            />
          </filter>
        </defs>
      </svg>
      <div
        {...ref}
        {...rest}
        style={{
          ...style,

          willChange: `opacity,filter,transform`,
          opacity: 0.2 + 1 - Math.pow(noise, 0.5),
          transform: `scale(${1 + Math.pow(noise, 0.5) * 0.1})`,
          filter: `url(#${id}-dissolve)`,
          WebkitFilter: `url(#${id}-dissolve)`,
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
