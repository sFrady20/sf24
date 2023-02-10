import { ReactNode, useMemo, useRef, useCallback } from "react";
import { useFrame, createPortal, ComputeFunction } from "@react-three/fiber";
import {
  useFBO,
  PerspectiveCamera as PerspectiveCameraImpl,
} from "@react-three/drei";
import { Scene, PerspectiveCamera, Object3D } from "three";
import frag from "shaders/screen.frag.glsl";
import Slice from "components/Slice";
import { animated } from "@react-spring/web";
import { useApp, usePresence } from "components/AnimatePresence";

const AnimatedSlice = animated(Slice);

const Screen = (props: {
  distance: number;
  children?: ReactNode;
  frag?: string;
}) => {
  const { children, frag: fragProp, distance } = props;
  const app = useApp();
  const transition = usePresence();

  const sceneCamera = useRef<PerspectiveCamera>(null!);
  const scene = useMemo(() => new Scene(), []);
  const fbo = useFBO();

  const compute: ComputeFunction = useCallback((event, state, previous) => {
    // Since this is only a texture it does not have an easy way to obtain the parent, which we
    // need to transform event coordinates to local coordinates. We use r3f internals to find the
    // next Object3D.
    let parent = (fbo.texture as any)?.__r3f?.parent;
    while (parent && !(parent instanceof Object3D)) {
      parent = parent?.__r3f?.parent;
    }
    if (!parent) return false;
    // First we call the previous state-onion-layers compute, this is what makes it possible to nest portals
    if (!previous?.raycaster.camera)
      previous?.events?.compute?.(
        event,
        previous,
        previous.previousRoot?.getState()
      );
    // We run a quick check against the parent, if it isn't hit there's no need to raycast at all
    const [intersection] = previous?.raycaster.intersectObject(parent) || [];
    if (!intersection) return false;
    // We take that hits uv coords, set up this layers raycaster, et voilà, we have raycasting on arbitrary surfaces
    const uv = intersection.uv;
    if (!uv) return false;
    state.raycaster.setFromCamera(
      state.pointer.set(uv.x * 2 - 1, uv.y * 2 - 1),
      sceneCamera.current
    );
  }, []);

  const uniforms = useMemo(
    () => ({
      scene: { value: fbo.texture },
    }),
    []
  );

  useFrame(({ gl, size }) => {
    gl.setRenderTarget(fbo);
    gl.render(scene, sceneCamera.current);
    gl.setRenderTarget(null);

    const fov = sceneCamera.current.fov * (Math.PI / 180);
    const fovh = 2 * Math.atan(Math.tan(fov / 2) * sceneCamera.current.aspect);
    let dx = Math.abs(size.width / 2 / Math.tan(fovh / 2));
    let dy = Math.abs(size.height / 2 / Math.tan(fov / 2));
    let cameraZ = Math.max(dx, dy);

    sceneCamera.current.position.set(0, 0, cameraZ);
  });

  return (
    <>
      {createPortal(
        <>
          <PerspectiveCameraImpl ref={sceneCamera} />
          {children}
        </>,
        scene,
        { events: { compute } }
      )}
      <AnimatedSlice distance={distance}>
        <shaderMaterial
          transparent
          uniforms={{ ...uniforms, ...app.uniforms, ...transition.uniforms }}
          fragmentShader={fragProp || frag}
        />
        <primitive object={fbo.texture} />
      </AnimatedSlice>
    </>
  );
};

export default Screen;
