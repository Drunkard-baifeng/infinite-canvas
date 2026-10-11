import { useTranslation } from "react-i18next";

import { AppConfigPanel } from "@/components/layout/app-config-modal";

export default function ConfigPage() {
    const { t } = useTranslation();

    return (
        <main className="h-full overflow-y-auto bg-background">
            <div className="mx-auto max-w-6xl px-5 py-8 sm:px-8 lg:py-10">
                <div className="mb-8 border-b border-border pb-6">
                    <h1 className="text-3xl font-semibold tracking-tight text-foreground">{t("config.title")}</h1>
                    <p className="mt-3 text-sm leading-6 text-muted-foreground">{t("config.description")}</p>
                </div>
                <AppConfigPanel />
            </div>
        </main>
    );
}
