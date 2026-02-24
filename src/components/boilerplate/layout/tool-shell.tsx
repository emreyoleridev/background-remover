"use client";

import { useState, useCallback, useRef } from "react";
import { Download, RefreshCw, Wand2, Share2, CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Container } from "@/components/boilerplate/common/container";
import { Section } from "@/components/boilerplate/common/section";
import { UploadZone } from "@/components/boilerplate/common/upload-zone";
import { getThemeClasses } from "@/lib/boilerplate/theme";
import { triggerShareModal } from "@/components/boilerplate/common/share-modal";
import { cn } from "@/lib/boilerplate/utils";
import { contentConfig } from "@/config";

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------
type Stage = "idle" | "preview" | "processing" | "done";

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------
function CheckerboardImage({ src, alt }: { src: string; alt: string }) {
    return (
        <div
            className="relative w-full rounded-xl overflow-hidden"
            style={{
                backgroundImage: `
                    linear-gradient(45deg, #ccc 25%, transparent 25%),
                    linear-gradient(-45deg, #ccc 25%, transparent 25%),
                    linear-gradient(45deg, transparent 75%, #ccc 75%),
                    linear-gradient(-45deg, transparent 75%, #ccc 75%)
                `,
                backgroundSize: "20px 20px",
                backgroundPosition: "0 0, 0 10px, 10px -10px, -10px 0px",
                backgroundColor: "#f0f0f0",
            }}
        >
            {/* Dark mode overlay */}
            <div className="absolute inset-0 dark:opacity-30 dark:[background-image:linear-gradient(45deg,#444_25%,transparent_25%),linear-gradient(-45deg,#444_25%,transparent_25%),linear-gradient(45deg,transparent_75%,#444_75%),linear-gradient(-45deg,transparent_75%,#444_75%)] dark:bg-transparent opacity-0" />
            <img
                src={src}
                alt={alt}
                className="relative w-full h-auto object-contain max-h-[480px]"
            />
        </div>
    );
}

// ---------------------------------------------------------------------------
// Main Component
// ---------------------------------------------------------------------------
export function ToolShell() {
    const theme = getThemeClasses();

    const [stage, setStage] = useState<Stage>("idle");
    const [originalUrl, setOriginalUrl] = useState<string | null>(null);
    const [resultUrl, setResultUrl] = useState<string | null>(null);
    const [progress, setProgress] = useState(0);
    const [error, setError] = useState<string | null>(null);
    const originalFileRef = useRef<File | null>(null);

    // -----------------------------------------------------------------------
    // Handle file upload
    // -----------------------------------------------------------------------
    const handleFileAccepted = useCallback((file: File) => {
        // Revoke any previous URLs
        if (originalUrl) URL.revokeObjectURL(originalUrl);
        if (resultUrl) URL.revokeObjectURL(resultUrl);

        originalFileRef.current = file;
        setOriginalUrl(URL.createObjectURL(file));
        setResultUrl(null);
        setError(null);
        setProgress(0);
        setStage("preview");
    }, [originalUrl, resultUrl]);

    // -----------------------------------------------------------------------
    // Remove background
    // -----------------------------------------------------------------------
    const handleRemoveBackground = useCallback(async () => {
        const file = originalFileRef.current;
        if (!file) return;

        setStage("processing");
        setProgress(0);
        setError(null);

        try {
            // Dynamic import to avoid SSR issues with WASM
            const { removeBackground } = await import("@imgly/background-removal");

            const blob = await removeBackground(file, {
                progress: (key: string, current: number, total: number) => {
                    if (total > 0) {
                        setProgress(Math.round((current / total) * 100));
                    }
                },
                output: {
                    format: "image/png" as const,
                    quality: 1,
                },
            });

            const url = URL.createObjectURL(blob);
            setResultUrl(url);
            setStage("done");
        } catch (err) {
            console.error("Background removal failed:", err);
            setError("Processing failed. Please try a different image.");
            setStage("preview");
        }
    }, []);

    // -----------------------------------------------------------------------
    // Download
    // -----------------------------------------------------------------------
    const handleDownload = useCallback(() => {
        if (!resultUrl) return;
        const originalName = originalFileRef.current?.name ?? "image";
        const baseName = originalName.replace(/\.[^.]+$/, "");
        const a = document.createElement("a");
        a.href = resultUrl;
        a.download = `${baseName}-no-bg.png`;
        a.click();
    }, [resultUrl]);

    // -----------------------------------------------------------------------
    // Reset
    // -----------------------------------------------------------------------
    const handleReset = useCallback(() => {
        if (originalUrl) URL.revokeObjectURL(originalUrl);
        if (resultUrl) URL.revokeObjectURL(resultUrl);
        setOriginalUrl(null);
        setResultUrl(null);
        setProgress(0);
        setError(null);
        originalFileRef.current = null;
        setStage("idle");
    }, [originalUrl, resultUrl]);

    // -----------------------------------------------------------------------
    // Render
    // -----------------------------------------------------------------------
    return (
        <Section className="pt-0 md:pt-0 lg:pt-0 pb-20">
            <Container className="max-w-3xl">

                {/* ── STAGE: IDLE ─────────────────────────────────────────── */}
                {stage === "idle" && (
                    <div className="w-full space-y-4">
                        <UploadZone onFileAccepted={handleFileAccepted} />
                        <p className="text-center text-xs text-muted-foreground">
                            Your image is processed entirely in your browser. Nothing is uploaded.
                        </p>
                    </div>
                )}

                {/* ── STAGE: PREVIEW ──────────────────────────────────────── */}
                {stage === "preview" && originalUrl && (
                    <div className="w-full space-y-5">
                        {/* Image preview */}
                        <div className="rounded-2xl border border-border bg-card overflow-hidden shadow-lg">
                            <div className="px-4 py-3 border-b border-border flex items-center justify-between">
                                <span className="text-sm font-medium text-muted-foreground">Preview</span>
                                <span className="text-xs text-muted-foreground truncate max-w-[240px]">
                                    {originalFileRef.current?.name}
                                </span>
                            </div>
                            <div className="p-4">
                                <img
                                    src={originalUrl}
                                    alt="Original"
                                    className="w-full h-auto max-h-[480px] object-contain rounded-xl bg-muted"
                                />
                            </div>
                        </div>

                        {/* Error */}
                        {error && (
                            <p className="text-sm text-destructive text-center">{error}</p>
                        )}

                        {/* Actions */}
                        <div className="flex flex-col sm:flex-row gap-3">
                            <Button
                                id="remove-background-btn"
                                onClick={handleRemoveBackground}
                                className={`flex-1 gap-2 ${theme.bg} hover:opacity-90 text-white border-0 font-semibold shadow-lg`}
                                size="lg"
                            >
                                <Wand2 className="w-4 h-4" />
                                Remove Background
                            </Button>
                            <Button
                                variant="outline"
                                onClick={handleReset}
                                className="gap-2 border-border"
                                size="lg"
                            >
                                <RefreshCw className="w-4 h-4" />
                                Choose Another
                            </Button>
                        </div>
                    </div>
                )}

                {/* ── STAGE: PROCESSING ───────────────────────────────────── */}
                {stage === "processing" && originalUrl && (
                    <div className="w-full space-y-5">
                        {/* Image with scan overlay */}
                        <div className="relative rounded-2xl border border-border bg-card overflow-hidden shadow-lg">
                            <div className="px-4 py-3 border-b border-border">
                                <span className="text-sm font-medium text-muted-foreground">Processing…</span>
                            </div>
                            <div className="relative p-4">
                                <img
                                    src={originalUrl}
                                    alt="Processing"
                                    className="w-full h-auto max-h-[480px] object-contain rounded-xl opacity-50"
                                />

                                {/* Scanning animation */}
                                <div className="absolute inset-4 rounded-xl overflow-hidden pointer-events-none">
                                    <div
                                        className={cn(
                                            "absolute left-0 right-0 h-0.5 opacity-90",
                                            theme.bg,
                                            "shadow-[0_0_12px_4px_rgba(139,92,246,0.5)]",
                                            "animate-[scanline_2s_ease-in-out_infinite]"
                                        )}
                                        style={{
                                            animation: "scanline 2s ease-in-out infinite",
                                        }}
                                    />
                                </div>

                                {/* Center status */}
                                <div className="absolute inset-0 flex flex-col items-center justify-center gap-3 pointer-events-none">
                                    <div className={cn(
                                        "flex items-center justify-center w-14 h-14 rounded-2xl",
                                        "bg-black/70 backdrop-blur-md"
                                    )}>
                                        <Wand2 className={cn("w-7 h-7 animate-pulse", theme.text)} />
                                    </div>
                                    <div className="bg-black/70 backdrop-blur-md rounded-xl px-4 py-2 text-center">
                                        <p className="text-white text-sm font-semibold">
                                            {progress < 5 ? "Loading AI model…" : `Removing background… ${progress}%`}
                                        </p>
                                    </div>
                                </div>
                            </div>

                            {/* Progress bar */}
                            <div className="px-4 pb-4">
                                <div className="h-1.5 rounded-full bg-muted overflow-hidden">
                                    <div
                                        className={cn("h-full rounded-full transition-all duration-300", theme.bg)}
                                        style={{ width: `${Math.max(progress, 3)}%` }}
                                    />
                                </div>
                            </div>
                        </div>

                        <p className="text-center text-xs text-muted-foreground">
                            Processing locally in your browser — this may take a few seconds.
                        </p>
                    </div>
                )}

                {/* ── STAGE: DONE ─────────────────────────────────────────── */}
                {stage === "done" && resultUrl && (
                    <div className="w-full space-y-5">
                        {/* Success badge */}
                        <div className="flex items-center justify-center gap-2 text-emerald-500">
                            <CheckCircle2 className="w-5 h-5" />
                            <span className="text-sm font-semibold">Background removed successfully!</span>
                        </div>

                        {/* Before / After comparison */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            {/* Original */}
                            <div className="rounded-2xl border border-border bg-card overflow-hidden shadow-sm">
                                <div className="px-3 py-2 border-b border-border">
                                    <span className="text-xs font-medium text-muted-foreground">Original</span>
                                </div>
                                <div className="p-3">
                                    <img
                                        src={originalUrl!}
                                        alt="Original"
                                        className="w-full h-auto max-h-[240px] object-contain rounded-lg bg-muted"
                                    />
                                </div>
                            </div>

                            {/* Result */}
                            <div className="rounded-2xl border border-violet-500/40 bg-card overflow-hidden shadow-sm ring-1 ring-violet-500/20">
                                <div className="px-3 py-2 border-b border-border flex items-center gap-1.5">
                                    <span className="text-xs font-medium text-muted-foreground">Result</span>
                                    <span className="text-[10px] font-medium px-1.5 py-0.5 rounded-full bg-emerald-500/10 text-emerald-500">
                                        Transparent PNG
                                    </span>
                                </div>
                                <div className="p-3">
                                    <CheckerboardImage src={resultUrl} alt="Result" />
                                </div>
                            </div>
                        </div>

                        {/* Action buttons */}
                        <div className="flex flex-col sm:flex-row gap-3">
                            <Button
                                id="download-result-btn"
                                onClick={handleDownload}
                                className={`flex-1 gap-2 ${theme.bg} hover:opacity-90 text-white border-0 font-semibold shadow-lg`}
                                size="lg"
                            >
                                <Download className="w-4 h-4" />
                                Download PNG
                            </Button>
                            <Button
                                variant="outline"
                                onClick={handleReset}
                                className="gap-2 border-border"
                                size="lg"
                            >
                                <RefreshCw className="w-4 h-4" />
                                Remove Another
                            </Button>
                        </div>
                    </div>
                )}

                {/* ── SHARE PROMPT ────────────────────────────────────────── */}
                {(stage === "idle" || stage === "done") && (
                    <div className="mt-8 flex w-full justify-center">
                        <button
                            onClick={() => triggerShareModal()}
                            className={cn(
                                "group relative flex flex-col gap-4 p-4 rounded-2xl select-none overflow-hidden",
                                "bg-white dark:bg-zinc-900 backdrop-blur-md",
                                "border border-zinc-200 dark:border-white/10 shadow-xl",
                                "w-full max-w-[320px] sm:max-w-[380px]",
                                "transition-all duration-500 ease-out",
                                "hover:-translate-y-1 hover:border-zinc-300 dark:hover:border-white/20 hover:shadow-2xl",
                                "cursor-pointer text-left"
                            )}
                        >
                            <div className={cn(
                                "absolute -inset-px rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500",
                                "bg-gradient-to-br from-black/5 via-transparent to-black/5 dark:from-white/5 dark:to-white/5"
                            )} />
                            <div className="flex items-center gap-4">
                                <div className={cn(
                                    "relative z-10 flex-shrink-0 flex items-center justify-center w-12 h-12 rounded-xl transition-all duration-300",
                                    theme.iconBg,
                                    "shadow-sm",
                                    theme.text
                                )}>
                                    <Share2 className="w-6 h-6" />
                                </div>
                                <div className="relative z-10 flex-1 min-w-0 flex flex-col">
                                    <h3 className="text-lg font-bold text-zinc-900 dark:text-white tracking-tight">
                                        {contentConfig.tool.sharePrompt.title}
                                    </h3>
                                    <p className="text-sm text-zinc-500 dark:text-zinc-400">
                                        {contentConfig.tool.sharePrompt.description}
                                    </p>
                                </div>
                            </div>
                        </button>
                    </div>
                )}
            </Container>

            {/* Scanline keyframe */}
            <style>{`
                @keyframes scanline {
                    0%   { top: 0%; }
                    50%  { top: 100%; }
                    100% { top: 0%; }
                }
            `}</style>
        </Section>
    );
}
