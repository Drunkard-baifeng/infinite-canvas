import { Moon, Sun } from "lucide-react";
import { useTranslation } from "react-i18next";
import { AnimatedThemeToggler } from "@/components/ui/animated-theme-toggler";
import { useThemeStore } from "@/stores/use-theme-store";
import { cn } from "@/lib/utils";

export function SidebarThemeToggle({ collapsed = false }: { collapsed?: boolean }) {
    const { t } = useTranslation();
    const theme = useThemeStore((state) => state.theme);
    const setTheme = useThemeStore((state) => state.setTheme);
    const label = t(theme === "dark" ? "topNav.lightMode" : "topNav.darkMode");
    return (
        <AnimatedThemeToggler theme={theme} onThemeChange={setTheme} aria-label={label} title={label} className={cn("flex w-full items-center gap-3 rounded-lg pr-3 py-2.5 text-sm leading-6 text-muted-foreground transition-colors hover:bg-muted hover:text-foreground", collapsed ? "justify-center pl-3" : "pl-5")}>
            {theme === "dark" ? <Sun className="size-[18px] shrink-0" /> : <Moon className="size-[18px] shrink-0" />}
            {!collapsed && <span>{label}</span>}
        </AnimatedThemeToggler>
    );
}
