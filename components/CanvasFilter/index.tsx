import { Canvas, useFrame } from "@react-three/fiber";
import {
  CSSProperties,
  DetailedHTMLProps,
  HTMLAttributes,
  ReactNode,
  useMemo,
  useState,
} from "react";
import { proxy } from "valtio";
import { useSnapshot } from "valtio/react";

type ImageProxy = {
  image: string | undefined;
};

function CanvasRenderer(props: {
  canvas: HTMLCanvasElement | null;
  store: ImageProxy;
}) {
  const { store, canvas } = props;
  useFrame(() => {
    store.image = canvas?.toDataURL();
  });
  return null;
}

const hidingStyles: CSSProperties = {
  opacity: 0,
  position: "absolute",
  left: 0,
  top: 0,
  width: "100%",
  height: "100%",
  pointerEvents: "none",
};

function CanvasFilter(
  props: { scene?: ReactNode; children?: ReactNode } & DetailedHTMLProps<
    HTMLAttributes<HTMLDivElement>,
    HTMLDivElement
  >
) {
  const { scene, children, style, ...rest } = props;

  const [canvas, setCanvas] = useState<HTMLCanvasElement | null>(null);
  const store = useMemo(() => proxy<ImageProxy>({ image: undefined }), []);
  const snap = useSnapshot(store);

  return (
    <div
      {...rest}
      style={{
        filter: "url(#blur)",
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
          ...hidingStyles,
        }}
      >
        <CanvasRenderer canvas={canvas} store={store} />
        {scene}
      </Canvas>
      <svg
        style={{
          ...hidingStyles,
        }}
      >
        <defs>
          <filter id={"blur"} colorInterpolationFilters={"sRGB"}>
            <feImage xlinkHref={snap.image} result={"SNAP"} />
            <feComposite
              in={"SourceGraphic"}
              in2={"SNAP"}
              operator="arithmetic"
              k1="0"
              k2="0"
              k3="1"
              k4="0"
            />
          </filter>
        </defs>
      </svg>
      {children}
    </div>
  );
}

export default CanvasFilter;
