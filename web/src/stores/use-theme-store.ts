import { create } from "zustand";
import { persist } from "zustand/middleware";

export type ThemeName = "light" | "dark";

type ThemeStore = {
    theme: ThemeName;
    sidebarCollapsed: boolean;
    toggleSidebar: () => void;
    setTheme: (theme: ThemeName) => void;
};

export const useThemeStore = create<ThemeStore>()(
    persist(
        (set) => ({
            theme: "dark",
            sidebarCollapsed: false,
            toggleSidebar: () => set((state) => ({ sidebarCollapsed: !state.sidebarCollapsed })),
            setTheme: (theme) => set({ theme }),
        }),
        { name: "infinite-canvas:theme_store" },
    ),
);
