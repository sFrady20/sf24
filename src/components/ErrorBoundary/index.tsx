import { Component, Dispatch, ReactNode, SetStateAction } from "react";

export class ErrorBoundary extends Component<{
  set: Dispatch<SetStateAction<Error | null>>;
  children: ReactNode;
}> {
  componentDidCatch(error: Error) {
    this.props.set(error);
  }
  render() {
    return this.props.children;
  }
}
