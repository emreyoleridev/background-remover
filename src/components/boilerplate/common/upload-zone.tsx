"use client";

import { useCallback, useState } from "react";
import { useDropzone } from "react-dropzone";
import { ImageIcon, UploadCloud, AlertCircle, X } from "lucide-react";
import { z } from "zod";
import { cn } from "@/lib/boilerplate/utils";

// ---------------------------------------------------------------------------
// Zod validation schema
// ---------------------------------------------------------------------------
const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5 MB
const ACCEPTED_TYPES = ["image/jpeg", "image/png", "image/webp"] as const;

const imageFileSchema = z.object({
    name: z.string(),
    size: z.number().max(MAX_FILE_SIZE, "File must be under 5 MB"),
    type: z.enum(ACCEPTED_TYPES, {
        errorMap: () => ({ message: "Only JPG, PNG, and WEBP files are accepted" }),
    }),
});

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------
interface UploadZoneProps {
    onFileAccepted: (file: File) => void;
    disabled?: boolean;
}

// ---------------------------------------------------------------------------
// Component
// ---------------------------------------------------------------------------
export function UploadZone({ onFileAccepted, disabled = false }: UploadZoneProps) {
    const [error, setError] = useState<string | null>(null);

    const onDrop = useCallback(
        (acceptedFiles: File[]) => {
            setError(null);
            const file = acceptedFiles[0];
            if (!file) return;

            const result = imageFileSchema.safeParse({
                name: file.name,
                size: file.size,
                type: file.type,
            });

            if (!result.success) {
                setError(result.error.errors[0]?.message ?? "Invalid file");
                return;
            }

            onFileAccepted(file);
        },
        [onFileAccepted]
    );

    const { getRootProps, getInputProps, isDragActive, isDragReject } = useDropzone({
        onDrop,
        accept: {
            "image/jpeg": [".jpg", ".jpeg"],
            "image/png": [".png"],
            "image/webp": [".webp"],
        },
        maxSize: MAX_FILE_SIZE,
        multiple: false,
        disabled,
        onDropRejected: (fileRejections) => {
            const msg = fileRejections[0]?.errors[0]?.message;
            setError(msg ?? "File rejected. Please check size and format.");
        },
    });

    return (
        <div className="w-full space-y-3">
            <div
                {...getRootProps()}
                className={cn(
                    "relative flex flex-col items-center justify-center gap-4",
                    "min-h-[260px] w-full rounded-2xl border-2 border-dashed",
                    "cursor-pointer transition-all duration-300 select-none",
                    "px-6 py-10 text-center",
                    // idle state
                    !isDragActive && !isDragReject && !disabled &&
                    "border-border bg-muted/30 hover:border-violet-500/60 hover:bg-violet-500/5",
                    // drag over
                    isDragActive && !isDragReject &&
                    "border-violet-500 bg-violet-500/10 scale-[1.01]",
                    // drag reject
                    isDragReject &&
                    "border-destructive bg-destructive/5",
                    // disabled
                    disabled && "opacity-50 cursor-not-allowed border-border bg-muted/20"
                )}
            >
                <input {...getInputProps()} />

                {/* Glow ring on hover */}
                <div className={cn(
                    "pointer-events-none absolute inset-0 rounded-2xl opacity-0 transition-opacity duration-300",
                    "bg-[radial-gradient(ellipse_at_center,rgba(139,92,246,0.12),transparent_70%)]",
                    isDragActive && "opacity-100"
                )} />

                {/* Icon */}
                <div className={cn(
                    "flex items-center justify-center w-16 h-16 rounded-2xl transition-all duration-300",
                    isDragReject
                        ? "bg-destructive/10 text-destructive"
                        : "bg-violet-500/10 text-violet-400"
                )}>
                    {isDragReject ? (
                        <AlertCircle className="w-8 h-8" />
                    ) : isDragActive ? (
                        <UploadCloud className="w-8 h-8 animate-bounce" />
                    ) : (
                        <ImageIcon className="w-8 h-8" />
                    )}
                </div>

                {/* Text */}
                <div className="space-y-1.5">
                    <p className="text-base font-semibold text-foreground">
                        {isDragActive && !isDragReject
                            ? "Drop your image here"
                            : isDragReject
                                ? "File not supported"
                                : "Drop your image here"}
                    </p>
                    <p className="text-sm text-muted-foreground">
                        or{" "}
                        <span className="text-violet-400 font-medium underline underline-offset-2 cursor-pointer">
                            browse to upload
                        </span>
                    </p>
                    <p className="text-xs text-muted-foreground/60 pt-1">
                        JPG, PNG, WEBP · Max 5 MB
                    </p>
                </div>
            </div>

            {/* Error message */}
            {error && (
                <div className="flex items-center gap-2.5 rounded-xl border border-destructive/30 bg-destructive/5 px-4 py-3">
                    <AlertCircle className="w-4 h-4 text-destructive flex-shrink-0" />
                    <p className="text-sm text-destructive flex-1">{error}</p>
                    <button
                        onClick={() => setError(null)}
                        className="text-destructive/70 hover:text-destructive transition-colors"
                    >
                        <X className="w-4 h-4" />
                    </button>
                </div>
            )}
        </div>
    );
}
