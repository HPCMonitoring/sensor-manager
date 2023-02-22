import { StoreName } from "@constants";
import { create } from "zustand";
import { devtools, persist } from "zustand/middleware";

interface DarkTheme {
  dark: boolean;
  toggleTheme: () => void;
  loadTheme: () => void;
}

export const useDarkThemeStore = create<DarkTheme>()(
  devtools(
    persist(
      (set) => ({
        dark: true, // Init state
        toggleTheme: () =>
          set((state) => {
            const isDark = !state.dark;

            if (isDark) {
              document.documentElement.classList.add("dark-bg");
              document.documentElement.classList.add("dark");
              document.documentElement.classList.remove("white-bg");
            } else {
              document.documentElement.classList.remove("dark");
              document.documentElement.classList.add("white-bg");
              document.documentElement.classList.remove("dark-bg");
            }
            return { dark: isDark };
          }),
        loadTheme: () =>
          set(() => ({
            dark: window.localStorage.getItem("dark") === "true"
          }))
      }),
      {
        name: StoreName.DARK_THEME
      }
    )
  )
);
