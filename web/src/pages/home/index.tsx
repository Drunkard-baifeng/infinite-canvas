import { ArrowRight, ArrowUpRight } from "lucide-react";
import { useEffect, useState } from "react";
import { App, Image, Tag } from "antd";
import { Link } from "react-router-dom";
import { Trans, useTranslation } from "react-i18next";

import { fetchPrompts, type Prompt } from "@/services/api/prompts";
import { navigationTools } from "@/constant/navigation-tools";
import i18n from "@/i18n";
import { cn } from "@/lib/utils";

export default function IndexPage() {
    const { message } = App.useApp();
    const { t } = useTranslation();
    const [promptShowcase, setPromptShowcase] = useState<Prompt[]>([]);
    const [previewIndex, setPreviewIndex] = useState(0);
    const [previewOpen, setPreviewOpen] = useState(false);

    useEffect(() => {
        void fetchPrompts({ pageSize: 12 })
            .then((data) => setPromptShowcase(data.items))
            .catch((error) => message.error(error instanceof Error ? error.message : i18n.t("home.promptError")));
    }, [message]);

    return (
        <main className="h-full overflow-y-auto bg-background text-foreground">
            <div className="mx-auto max-w-7xl px-5 py-8 sm:px-8 lg:px-12 lg:py-12">
                <header className="flex flex-wrap items-center justify-between gap-3 border-b border-border pb-5 text-xs text-muted-foreground">
                    <span className="font-medium tracking-[0.16em]">{t("home.workspace")}</span>
                    <span>{t("home.localNote")}</span>
                </header>
                <section className="py-10 sm:py-14">
                    <div className="flex flex-wrap items-end justify-between gap-8">
                        <div className="max-w-2xl">
                            <h1 className="text-balance text-4xl font-semibold tracking-tight sm:text-5xl">{t("home.headline")}</h1>
                            <p className="mt-5 max-w-xl text-sm leading-7 text-muted-foreground sm:text-base">
                                <Trans i18nKey="home.description" components={{ canvas: <strong className="font-medium text-foreground" />, content: <strong className="font-medium text-foreground" /> }} />
                            </p>
                        </div>
                        <Link to="/canvas?mode=new" className="inline-flex items-center gap-6 rounded-xl bg-primary px-5 py-3 text-sm font-medium text-primary-foreground transition-opacity hover:opacity-85 focus-visible:outline-2 focus-visible:outline-offset-4">
                            {t("canvas.create")}<ArrowUpRight className="size-4" />
                        </Link>
                    </div>
                    <div className="mt-9 grid gap-3 md:grid-cols-3">
                        {navigationTools.slice(0, 3).map((tool, index) => (
                            <Link key={tool.slug} to={`/${tool.slug}`} className="group flex flex-col rounded-2xl border border-border bg-card p-5 transition-colors hover:border-foreground/30 hover:bg-muted/40 focus-visible:outline-2 focus-visible:outline-offset-4 sm:p-6">
                                <div className="mb-7 flex items-center justify-between">
                                    <tool.icon className="size-6 stroke-[1.5]" />
                                    <span className="font-mono text-xs text-muted-foreground">0{index + 1}</span>
                                </div>
                                <div className="flex items-center justify-between gap-3">
                                    <h2 className="text-base font-semibold">{t(`navigation.${tool.slug}`)}</h2>
                                    <ArrowUpRight className="size-4 text-muted-foreground transition-transform motion-safe:group-hover:-translate-y-0.5 motion-safe:group-hover:translate-x-0.5" />
                                </div>
                                <p className="mt-2 text-sm leading-6 text-muted-foreground">{t(`home.tools.${tool.slug}`)}</p>
                            </Link>
                        ))}
                    </div>
                </section>
                <section className="border-t border-border pt-8 pb-6">
                    <div className="mb-6 flex flex-wrap items-end justify-between gap-4">
                        <div className="max-w-2xl">
                            <h2 className="text-xl font-semibold tracking-tight">{t("home.showcaseTitle")}</h2>
                            <p className="mt-2 text-sm leading-6 text-muted-foreground">{t("home.showcaseDescription")}</p>
                        </div>
                        <Link to="/prompts" className="inline-flex items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-foreground">
                            {t("home.viewPrompts")}<ArrowRight className="size-4" />
                        </Link>
                    </div>
                    <div className="grid auto-rows-[210px] gap-4 md:grid-cols-4">
                        {promptShowcase.map((item, index) => (
                            <button
                                key={item.id}
                                type="button"
                                onClick={() => {
                                    setPreviewIndex(index);
                                    setPreviewOpen(true);
                                }}
                                className={cn(
                                    "group relative cursor-pointer overflow-hidden rounded-2xl border border-border bg-muted text-left focus-visible:outline-2 focus-visible:outline-offset-4",
                                    index === 0 && "md:col-span-2 md:row-span-2",
                                    index === 3 && "md:col-span-2",
                                )}
                            >
                                <img src={item.coverUrl} alt={item.title} loading="lazy" className="h-full w-full object-cover transition duration-500 motion-safe:group-hover:scale-[1.03]" />
                                <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/70 via-black/35 to-transparent p-4 text-white">
                                    <div className="mb-2 flex flex-wrap gap-1.5">
                                        {item.tags.slice(0, 2).map((tag) => (
                                            <Tag key={tag} variant="filled" className="m-0 bg-white/15 text-[11px] text-white backdrop-blur">
                                                {tag}
                                            </Tag>
                                        ))}
                                    </div>
                                    <h3 className="text-sm font-medium">{item.title}</h3>
                                    <p className="mt-1 line-clamp-2 text-xs leading-5 text-white/75">{item.prompt}</p>
                                </div>
                            </button>
                        ))}
                    </div>
                </section>
            </div>
            <Image.PreviewGroup
                preview={{
                    open: previewOpen,
                    current: previewIndex,
                    onOpenChange: setPreviewOpen,
                    onChange: setPreviewIndex,
                }}
            >
                <div className="hidden">
                    {promptShowcase.map((item) => (
                        <Image key={item.id} src={item.coverUrl} alt={item.title} />
                    ))}
                </div>
            </Image.PreviewGroup>
        </main>
    );
}
