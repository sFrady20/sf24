import { ReactNode } from "react";

export default function (props: { children: ReactNode }) {
  const { children } = props;
  return <>{children}</>;
}
