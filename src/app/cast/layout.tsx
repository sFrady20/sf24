import "@/components/analytics";
import { ReactNode } from "react";
import { CastReceiverProvider } from "@/components/cast/receiver";

export default function App(props: { children?: ReactNode }) {
  const { children } = props;
  return <CastReceiverProvider>{children}</CastReceiverProvider>;
}
