import "@/components/analytics";
import { ReactNode } from "react";
import { MainCastReceiverProvider } from "./components";

export default async function (props: { children?: ReactNode }) {
  const { children } = props;
  return <MainCastReceiverProvider>{children}</MainCastReceiverProvider>;
}
