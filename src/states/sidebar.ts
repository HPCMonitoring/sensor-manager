import { StoreName } from "@constants";
import { create } from "zustand";
import { devtools, persist } from "zustand/middleware";

interface DarkTheme {
  dark: boolean;
  toggle: () => void;
}

export const useDarkTheme = create<DarkTheme>()(
  devtools(
    persist(
      (set) => ({
        dark: false, // Init state
        toggle: () => set((state) => ({ dark: !state.dark }))
      }),
      {
        name: StoreName.DARK_THEME
      }
    )
  )
);
