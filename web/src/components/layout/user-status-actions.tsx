import type { CSSProperties } from "react";
import { Tooltip } from "antd";
import { BookOpen, Bot, Keyboard, Languages, Moon, Puzzle, Settings2, Sun, Info, MessageCircle } from "lucide-react";
import { useTranslation } from "react-i18next";

import { AnimatedThemeToggler } from "@/components/ui/animated-theme-toggler";
import { VersionReleaseModal } from "@/components/layout/version-release-modal";
import { CONTACT_QQ, DOCS_URL } from "@/constant/env";
import { useCopyText } from "@/hooks/use-copy-text";
import { changeAppLocale, type AppLocale } from "@/i18n";
import { canvasThemes } from "@/lib/canvas-theme";
import { useConfigStore } from "@/stores/use-config-store";
import { useThemeStore } from "@/stores/use-theme-store";
import { useAgentStore } from "@/stores/use-agent-store";
import { APP_VERSION } from "@/constant/env";

type UserStatusActionsProps = {
    className?: string;
    showConfig?: boolean;
    variant?: "default" | "canvas" | "sidebar";
    collapsed?: boolean;
    onOpenShortcuts?: () => void;
    onOpenPlugins?: () => void;
};

export function UserStatusActions({ className = "", showConfig = true, variant = "default", collapsed = false, onOpenShortcuts, onOpenPlugins }: UserStatusActionsProps) {
    const { i18n, t } = useTranslation();
    const copyText = useCopyText();
    const theme = useThemeStore((state) => state.theme);
    const setTheme = useThemeStore((state) => state.setTheme);
    const openConfigDialog = useConfigStore((state) => state.openConfigDialog);
    const togglePanel = useAgentStore((state) => state.togglePanel);
    const panelOpen = useAgentStore((state) => state.panelOpen);
    const canvasTheme = canvasThemes[theme];
    const naturalIconClass = "inline-flex size-7 shrink-0 cursor-pointer items-center justify-center rounded-md text-stone-600 transition-colors hover:bg-black/5 hover:text-stone-950 dark:text-stone-300 dark:hover:bg-white/10 dark:hover:text-white [&_svg]:size-4";
    const iconStyle: CSSProperties | undefined = variant === "canvas" ? { color: canvasTheme.node.text } : undefined;
    const versionStyle = iconStyle;
    const locale = i18n.resolvedLanguage as AppLocale;
    const nextLocale = locale === "zh-CN" ? "en-US" : "zh-CN";
    const languageLabel = t("topNav.switchLanguage", { language: t(nextLocale === "zh-CN" ? "locale.zhCN" : "locale.enUS") });

    if (variant === "sidebar") {
        const rowClass = `flex w-full shrink-0 cursor-pointer items-center gap-3 rounded-lg px-3 py-2 text-left text-sm leading-6 text-muted-foreground transition-colors hover:bg-muted hover:text-foreground focus-visible:outline-2 focus-visible:outline-offset-[-2px] [&_svg]:size-[18px] [&_svg]:shrink-0 ${collapsed ? "justify-center" : ""}`;
        const agentLabel = t(panelOpen ? "topNav.closeAgent" : "topNav.openAgent");
        const themeLabel = t(theme === "dark" ? "topNav.lightTheme" : "topNav.darkTheme");
        return (
            <div className={`flex shrink-0 flex-col gap-1 ${className}`}>
                <button type="button" className={rowClass} onClick={togglePanel} aria-label={agentLabel} aria-pressed={panelOpen} title={agentLabel}>
                    <Bot />{!collapsed && <span>{agentLabel}</span>}
                </button>
                <button type="button" className={rowClass} onClick={() => void changeAppLocale(nextLocale)} aria-label={languageLabel} title={languageLabel}>
                    <Languages />{!collapsed && <span>{languageLabel}</span>}
                </button>
                <AnimatedThemeToggler theme={theme} onThemeChange={setTheme} className={rowClass} aria-label={themeLabel} title={themeLabel}>
                    {theme === "dark" ? <Sun /> : <Moon />}{!collapsed && <span>{themeLabel}</span>}
                </AnimatedThemeToggler>
                <VersionReleaseModal className={rowClass}>
                    <Info />{!collapsed && <span>{APP_VERSION}</span>}
                </VersionReleaseModal>
                <button type="button" className={rowClass} onClick={() => copyText(CONTACT_QQ)} title={t("topNav.contact", { qq: CONTACT_QQ })} aria-label={t("topNav.contact", { qq: CONTACT_QQ })}>
                    <MessageCircle />{!collapsed && <span className="text-xs">QQ · {CONTACT_QQ}</span>}
                </button>
            </div>
        );
    }

    return (
        <div className={`inline-flex shrink-0 items-center gap-1 ${className}`}>
            {onOpenPlugins ? (
                <button type="button" className={naturalIconClass} style={iconStyle} onClick={onOpenPlugins} aria-label={t("topNav.plugins")} title={t("topNav.plugins")}>
                    <Puzzle className="size-4" />
                </button>
            ) : null}
            <a href={DOCS_URL} target="_blank" rel="noopener noreferrer" className={naturalIconClass} style={iconStyle} aria-label={t("topNav.docs")} title={t("topNav.docs")}>
                <BookOpen className="size-4" />
            </a>
            {showConfig ? (
                <button type="button" className={naturalIconClass} style={iconStyle} onClick={() => openConfigDialog(false)} aria-label={t("navigation.config")} title={t("navigation.config")}>
                    <Settings2 className="size-4" />
                </button>
            ) : null}
            <Tooltip title={languageLabel} mouseEnterDelay={0.2}>
                <button type="button" className={`${naturalIconClass} text-[11px] font-semibold tracking-tight`} style={iconStyle} onClick={() => void changeAppLocale(nextLocale)} aria-label={languageLabel}>
                    {locale === "zh-CN" ? "中" : "EN"}
                </button>
            </Tooltip>
            <AnimatedThemeToggler theme={theme} onThemeChange={setTheme} className={naturalIconClass} style={iconStyle} aria-label={t(theme === "dark" ? "topNav.lightTheme" : "topNav.darkTheme")} title={t(theme === "dark" ? "topNav.lightTheme" : "topNav.darkTheme")} />
            <VersionReleaseModal style={versionStyle} />
            {onOpenShortcuts ? (
                <button type="button" className={naturalIconClass} style={iconStyle} onClick={onOpenShortcuts} aria-label={t("topNav.shortcuts")} title={t("topNav.shortcuts")}>
                    <Keyboard className="size-4" />
                </button>
            ) : null}
        </div>
    );
}
