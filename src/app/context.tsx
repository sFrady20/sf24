"use client";

import { createContextStore } from "@/utils/store";

type AppState = {
  isMenuOpen: boolean;
};

export const { Provider: AppProvider, hook: useApp } =
  createContextStore<AppState>({ isMenuOpen: false });
