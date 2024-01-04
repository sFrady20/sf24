"use client";

import { createContextStore } from "@/utils/store";

type AppState = {
  isMenuOpen: boolean;
  mouseX: number;
  mouseY: number;
};

export const { Provider: AppProvider, hook: useApp } =
  createContextStore<AppState>({ isMenuOpen: false, mouseX: 0, mouseY: 0 });
