"use client";

import { useEffect, useState } from "react";

export function useSize(el?: HTMLElement) {
  const [size, setSize] = useState([0, 0]);

  useEffect(() => {
    function handleResize() {
      const rect = el?.getBoundingClientRect();
      const w = rect?.width || 0;
      const h = rect?.height || 0;
      if (w !== size[0] || h != size[1]) setSize([w, h]);
    }
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [el, size]);

  return size;
}
