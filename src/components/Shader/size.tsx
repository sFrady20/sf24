"use client";

import { RefObject, useEffect, useState } from "react";

export function useSize(ref: RefObject<HTMLElement>) {
  const [size, setSize] = useState([0, 0]);

  useEffect(() => {
    function handleResize() {
      const rect = ref.current?.getBoundingClientRect();
      setSize([rect?.width || 0, rect?.height || 0]);
    }
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return size;
}
