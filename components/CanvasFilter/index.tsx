import { Canvas, useFrame } from "@react-three/fiber";
import {
  CSSProperties,
  DetailedHTMLProps,
  HTMLAttributes,
  ReactNode,
  useState,
  useRef,
  useCallback,
  useEffect,
} from "react";
import { throttle } from "lodash";

function CanvasRenderer(props: {
  canvas: HTMLCanvasElement | null;
  svgImg: SVGFEImageElement | null;
}) {
  const { svgImg, canvas } = props;

  const render = useCallback((href: string | undefined) => {
    if (!href) return;
    svgImg?.setAttribute("href", href || "");
    requestAnimationFrame(animation);
  }, []);

  const animation = useCallback(
    throttle(() => render(canvas?.toDataURL("image/webp", 0.1)), 1000 / 60, {
      trailing: true,
    }),
    []
  );

  useEffect(() => {
    requestAnimationFrame(animation);
  }, []);

  return null;
}

const hidingStyles = (scale: number): CSSProperties => ({
  opacity: 0,
  position: "absolute",
  left: 0,
  top: 0,
  width: `${scale * 100}%`,
  height: `${scale * 100}%`,
  pointerEvents: "none",
});

function CanvasFilter(
  props: {
    scene?: ReactNode;
    filter?: ReactNode;
    children?: ReactNode;
  } & DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement>
) {
  const { scene, children, filter, style, ...rest } = props;

  const id = useRef((Math.random() + 1).toString(36).substring(7)).current;

  const [canvas, setCanvas] = useState<HTMLCanvasElement | null>(null);
  const [svgImg, setSvgImg] = useState<SVGFEImageElement | null>(null);

  return (
    <div
      {...rest}
      style={{
        filter: `url(#${id})`,
        position: "relative",
        ...style,
      }}
    >
      <Canvas
        ref={setCanvas}
        dpr={[1, 1]}
        camera={{ fov: 75, position: [0, 0, 3] }}
        gl={{ preserveDrawingBuffer: true, alpha: true }}
        style={{
          ...hidingStyles(0.2),
        }}
      >
        <CanvasRenderer canvas={canvas} svgImg={svgImg} />
        {scene}
      </Canvas>
      <svg
        style={{
          ...hidingStyles(0.2),
        }}
      >
        <defs>
          <filter id={id} colorInterpolationFilters={"sRGB"}>
            {filter}
            <feImage ref={setSvgImg} result={"canvas"} />
            <feColorMatrix
              in="canvas"
              type="matrix"
              values="0 0 0 0 0
                      0 0 0 0 0
                      0 0 0 0 0
                      0 0 1 0 0"
              result={"b"}
            />
            <feComposite in={"SourceGraphic"} in2={"b"} operator="out" />
            <feDisplacementMap
              in2="canvas"
              scale="50"
              xChannelSelector="R"
              yChannelSelector="G"
            />
          </filter>
        </defs>
      </svg>
      {children}
    </div>
  );
}

export default CanvasFilter;
