import { Drawer } from "antd";
import { ExternalLink } from "lucide-react";
import { JISUAI_URL } from "@/constant/env";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";

import { navigationTools, type NavigationToolSlug } from "@/constant/navigation-tools";
import { cn } from "@/lib/utils";
import { UserStatusActions } from "@/components/layout/user-status-actions";
import { SidebarThemeToggle } from "@/components/layout/sidebar-theme-toggle";

type MobileNavDrawerProps = {
    open: boolean;
    activeToolSlug?: NavigationToolSlug;
    onClose: () => void;
};

export function MobileNavDrawer({ open, activeToolSlug, onClose }: MobileNavDrawerProps) {
    const { t } = useTranslation();

    return (
        <Drawer title={t("topNav.navigation")} placement="left" size={280} open={open} onClose={onClose} className="md:hidden" footer={<SidebarThemeToggle />}>
            <div className="space-y-1">
                {navigationTools.map((tool) => {
                    const Icon = tool.icon;
                    const active = tool.slug === activeToolSlug;
                    return (
                        <Link
                            key={tool.slug}
                            to={`/${tool.slug}`}
                            onClick={onClose}
                            className={cn(
                                "flex items-center gap-3 rounded-lg pl-5 pr-3 py-3 text-base transition",
                                active ? "bg-accent font-medium text-accent-foreground" : "text-muted-foreground hover:bg-muted hover:text-foreground",
                            )}
                        >
                            <Icon className="size-5" />
                            <span>{t(`navigation.${tool.slug}`)}</span>
                        </Link>
                    );
                })}
                <a href={JISUAI_URL} target="_blank" rel="noopener noreferrer" onClick={onClose} className="flex items-center gap-3 rounded-lg pl-5 pr-3 py-3 text-base text-stone-600 transition hover:bg-stone-100 hover:text-stone-950 dark:text-stone-300 dark:hover:bg-stone-800 dark:hover:text-stone-100">
                    <ExternalLink className="size-5" />
                    <span>极速AI</span>
                </a>
                <UserStatusActions variant="sidebar" showConfig={false} className="mt-3 border-t border-border pt-3" />
            </div>
        </Drawer>
    );
}
