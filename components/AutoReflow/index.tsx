import { useFrame } from "@react-three/fiber";
import { useReflow } from "@react-three/flex";

export const AutoReflow = () => {
  const reflow = useReflow();
  useFrame(reflow);
  return null;
};
