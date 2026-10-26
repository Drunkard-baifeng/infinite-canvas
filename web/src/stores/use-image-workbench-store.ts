import { create } from "zustand";
import type { AiConfig } from "@/stores/use-config-store";
import type { ReferenceImage } from "@/types/image";

export type GeneratedImage = {
    id: string;
    dataUrl: string;
    storageKey?: string;
    durationMs: number;
    width: number;
    height: number;
    bytes: number;
    mimeType?: string;
};

export type GenerationResult = {
    id: string;
    status: "pending" | "success" | "failed";
    image?: GeneratedImage;
    error?: string;
};

export type GenerationLog = {
    id: string;
    createdAt: number;
    title: string;
    prompt: string;
    time: string;
    model: string;
    config: GenerationLogConfig;
    references: ReferenceImage[];
    durationMs: number;
    successCount: number;
    failCount: number;
    imageCount: number;
    size: string;
    quality: string;
    status: "success" | "failed";
    images: GeneratedImage[];
};

export type GenerationLogConfig = Pick<AiConfig, "model" | "imageModel" | "quality" | "size" | "count">;

type StateUpdate<T> = T | ((value: T) => T);

type ImageWorkbenchStore = {
    prompt: string;
    references: ReferenceImage[];
    results: GenerationResult[];
    logs: GenerationLog[];
    running: boolean;
    startedAt: number;
    elapsedMs: number;
    previewLog: GenerationLog | null;
    setPrompt: (prompt: string) => void;
    setReferences: (value: StateUpdate<ReferenceImage[]>) => void;
    setResults: (value: StateUpdate<GenerationResult[]>) => void;
    setLogs: (logs: GenerationLog[]) => void;
    setRunning: (running: boolean) => void;
    setStartedAt: (startedAt: number) => void;
    setElapsedMs: (elapsedMs: number) => void;
    setPreviewLog: (previewLog: GenerationLog | null) => void;
};

// Keep in-flight generation state across route changes without retaining the page DOM.
// Completed generation logs remain persisted separately in IndexedDB.
export const useImageWorkbenchStore = create<ImageWorkbenchStore>((set) => ({
    prompt: "",
    references: [],
    results: [],
    logs: [],
    running: false,
    startedAt: 0,
    elapsedMs: 0,
    previewLog: null,
    setPrompt: (prompt) => set({ prompt }),
    setReferences: (value) => set((state) => ({ references: typeof value === "function" ? value(state.references) : value })),
    setResults: (value) => set((state) => ({ results: typeof value === "function" ? value(state.results) : value })),
    setLogs: (logs) => set({ logs }),
    setRunning: (running) => set({ running }),
    setStartedAt: (startedAt) => set({ startedAt }),
    setElapsedMs: (elapsedMs) => set({ elapsedMs }),
    setPreviewLog: (previewLog) => set({ previewLog }),
}));
