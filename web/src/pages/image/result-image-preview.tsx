import { useEffect, useState } from "react";
import { App, Image } from "antd";
import { useTranslation } from "react-i18next";
import { getImageBlob } from "@/services/image-storage";

export function ResultImagePreview({ image, onClose }: { image: { storageKey?: string; dataUrl: string }; onClose: () => void }) {
    const { message } = App.useApp();
    const { t } = useTranslation();
    const [source, setSource] = useState("");

    useEffect(() => {
        let canceled = false;
        let objectUrl: string | undefined;
        void (async () => {
            const blob = image.storageKey ? await getImageBlob(image.storageKey) : undefined;
            if (canceled) return;
            const url = blob ? (objectUrl = URL.createObjectURL(blob)) : image.dataUrl;
            if (!url) throw new Error(t("common.imageReadFailed"));
            setSource(url);
        })().catch(() => {
            if (canceled) return;
            message.error(t("common.imageReadFailed"));
            onClose();
        });
        return () => {
            canceled = true;
            if (objectUrl) URL.revokeObjectURL(objectUrl);
        };
    }, [image.storageKey, image.dataUrl, message, t, onClose]);

    return source ? <Image.PreviewGroup items={[{ src: source, decoding: "async" }]} preview={{ open: true, countRender: () => null, onOpenChange: (open) => !open && onClose() }} /> : null;
}
