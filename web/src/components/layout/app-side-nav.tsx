import { Menu, ExternalLink, PanelLeftClose, PanelLeftOpen } from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import { useTranslation } from "react-i18next";

import { navigationTools, type NavigationToolSlug } from "@/constant/navigation-tools";
import { JISUAI_URL } from "@/constant/env";
import { AppConfigModal } from "@/components/layout/app-config-modal";
import { MobileNavDrawer } from "@/components/layout/mobile-nav-drawer";
import { UserStatusActions } from "@/components/layout/user-status-actions";
import { cn } from "@/lib/utils";
import { useEffect, useRef, useState } from "react";
import { useAgentStore } from "@/stores/use-agent-store";
import { useThemeStore } from "@/stores/use-theme-store";

export function AppSideNav() {
    const { t } = useTranslation();
    const { pathname } = useLocation();
    const collapsed = useThemeStore((state) => state.sidebarCollapsed);
    const toggleSidebar = useThemeStore((state) => state.toggleSidebar);
    const [mobileNavOpen, setMobileNavOpen] = useState(false);
    const autoConnectRef = useRef(false);
    const agentToken = useAgentStore((state) => state.token);
    const agentEnabled = useAgentStore((state) => state.enabled);
    const agentConnected = useAgentStore((state) => state.connected);
    const connectAgent = useAgentStore((state) => state.connectAgent);
    const hideSidebar = /^\/canvas\/[^/]+/.test(pathname);
    const slug = pathname.split("/").filter(Boolean)[0];
    const activeToolSlug = navigationTools.some((tool) => tool.slug === slug) ? (slug as NavigationToolSlug) : undefined;

    useEffect(() => {
        if (autoConnectRef.current || agentEnabled || agentConnected || !agentToken.trim()) return;
        autoConnectRef.current = true;
        connectAgent({ silent: true });
    }, [agentConnected, agentEnabled, agentToken, connectAgent]);

    return (
        <>
            {!hideSidebar ? (
                <aside className={cn("z-20 flex shrink-0 flex-col border-b border-border bg-card transition-[width] duration-200 motion-reduce:transition-none md:h-full md:border-r md:border-b-0", collapsed ? "md:w-[76px]" : "md:w-60")}>
                    <div className="flex min-h-0 flex-1 flex-col px-4 md:px-3">
                        <div className={cn("flex h-14 shrink-0 items-center justify-between md:h-20", collapsed ? "md:justify-center" : "md:px-3")}>
                            <Link to="/" aria-label={t("meta.title")} title={t("meta.title")} className="flex shrink-0 items-center gap-3 text-sm font-semibold leading-none tracking-tight text-foreground transition hover:text-primary">
                                <span
                                    className="size-6 shrink-0 bg-primary"
                                    style={{
                                        mask: "url(/logo.svg) center / contain no-repeat",
                                        WebkitMask: "url(/logo.svg) center / contain no-repeat",
                                    }}
                                />
                                <span className={cn("text-base font-semibold", collapsed && "md:hidden")}>{t("meta.title")}</span>
                            </Link>

                            <button
                                type="button"
                                className="ml-3 inline-flex size-8 shrink-0 items-center justify-center text-stone-600 transition hover:text-stone-950 md:hidden dark:text-stone-300 dark:hover:text-white"
                                onClick={() => setMobileNavOpen(true)}
                                aria-label={t("topNav.openMenu")}
                                title={t("topNav.menu")}
                            >
                                <Menu className="size-5" />
                            </button>
                        </div>
                        <nav aria-label={t("topNav.navigation")} className="hidden min-h-0 flex-1 flex-col gap-1 overflow-y-auto pb-4 md:flex">
                            {!collapsed && <p className="px-3 pb-2 text-[11px] font-medium tracking-wider text-muted-foreground">{t("topNav.workspace")}</p>}
                            {navigationTools.map((tool) => {
                                const Icon = tool.icon;
                                const active = tool.slug === activeToolSlug;
                                return (
                                    <Link
                                        key={tool.slug}
                                        to={`/${tool.slug}`}
                                        aria-current={active ? "page" : undefined}
                                        aria-label={t(`navigation.${tool.slug}`)}
                                        title={collapsed ? t(`navigation.${tool.slug}`) : undefined}
                                        className={cn(
                                            "flex shrink-0 items-center gap-3 rounded-lg px-3 py-2.5 text-sm leading-6 transition-colors focus-visible:outline-2 focus-visible:outline-offset-[-2px]",
                                            collapsed && "justify-center",
                                            active
                                                ? "bg-accent font-semibold text-accent-foreground"
                                                : "text-muted-foreground hover:bg-muted hover:text-foreground",
                                        )}
                                    >
                                        <Icon className="size-[18px] shrink-0" />
                                        {!collapsed && <span className="truncate">{t(`navigation.${tool.slug}`)}</span>}
                                    </Link>
                                );
                            })}
                            <a href={JISUAI_URL} target="_blank" rel="noopener noreferrer" aria-label="极速AI" title="极速AI" className={cn("mt-2 flex shrink-0 items-center gap-3 rounded-lg px-3 py-2.5 text-sm leading-6 text-muted-foreground transition-colors hover:bg-accent hover:text-accent-foreground", collapsed && "justify-center")}>
                                <ExternalLink className="size-4" />
                                {!collapsed && <span>极速AI</span>}
                            </a>
                            <UserStatusActions variant="sidebar" collapsed={collapsed} showConfig={false} className="mt-3 border-t border-border pt-3" />
                        </nav>

                        <button type="button" onClick={toggleSidebar} aria-expanded={!collapsed} aria-label={t(collapsed ? "topNav.expandSidebar" : "topNav.collapseSidebar")} title={t(collapsed ? "topNav.expandSidebar" : "topNav.collapseSidebar")} className={cn("mb-3 hidden shrink-0 items-center gap-3 rounded-lg px-3 py-2 text-sm text-muted-foreground transition-colors hover:bg-muted hover:text-foreground md:flex", collapsed && "justify-center")}>
                            {collapsed ? <PanelLeftOpen className="size-[18px]" /> : <PanelLeftClose className="size-[18px]" />}
                            {!collapsed && <span>{t("topNav.collapseSidebar")}</span>}
                        </button>
                    </div>
                </aside>
            ) : null}

            <MobileNavDrawer open={mobileNavOpen} activeToolSlug={activeToolSlug} onClose={() => setMobileNavOpen(false)} />
            <AppConfigModal />
        </>
    );
}
