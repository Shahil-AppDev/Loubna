"use client";

import { useRef } from "react";
import {
  CONTACT_ACCEPT_ATTRIBUTE,
  CONTACT_MAX_ATTACHMENTS_BYTES,
  CONTACT_MAX_FILES,
  formatBytes,
  validateContactFiles,
} from "@/lib/contact/attachments";
import { cn } from "@/lib/utils";

type AttachmentFieldProps = {
  id?: string;
  files: File[];
  onChange: (files: File[]) => void;
  onValidationError?: (message: string) => void;
  error?: string;
  helpId?: string;
};

export default function AttachmentField({
  id = "piecesJointes",
  files,
  onChange,
  onValidationError,
  error,
  helpId = "pieces-jointes-help",
}: AttachmentFieldProps) {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const total = files.reduce((sum, f) => sum + f.size, 0);

  const handleFilesChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const picked = Array.from(e.target.files ?? []);
    const merged = [...files, ...picked];
    const attachErr = validateContactFiles(merged);
    if (attachErr) {
      onValidationError?.(attachErr);
    } else {
      onValidationError?.("");
      onChange(merged);
    }
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  const removeFile = (index: number) => {
    onChange(files.filter((_, i) => i !== index));
  };

  return (
    <div
      className={cn(
        "rounded-sm border border-dashed border-encre-200 bg-white px-4 py-5 transition-colors",
        error && "border-red-300 bg-red-50/40"
      )}
    >
      <input
        ref={fileInputRef}
        type="file"
        id={id}
        multiple
        accept={CONTACT_ACCEPT_ATTRIBUTE}
        onChange={handleFilesChange}
        className="sr-only"
        aria-describedby={helpId}
      />
      <label
        htmlFor={id}
        className="flex cursor-pointer flex-col items-center gap-2 text-center"
      >
        <span className="text-2xl" aria-hidden>
          📎
        </span>
        <span className="text-[0.88rem] font-medium text-encre-800">
          Ajouter des fichiers
        </span>
        <span id={helpId} className="text-[0.75rem] leading-relaxed text-encre-600 max-w-md">
          PDF, Word, Excel, images ou texte — max. {CONTACT_MAX_FILES} fichiers,{" "}
          {formatBytes(CONTACT_MAX_ATTACHMENTS_BYTES)} au total
        </span>
      </label>

      {files.length > 0 && (
        <ul className="mt-4 space-y-2 border-t border-encre-100 pt-4">
          {files.map((file, index) => (
            <li
              key={`${file.name}-${file.size}-${index}`}
              className="flex items-center justify-between gap-3 text-[0.82rem] text-encre-800"
            >
              <span className="truncate">
                {file.name}{" "}
                <span className="text-encre-500">({formatBytes(file.size)})</span>
              </span>
              <button
                type="button"
                onClick={() => removeFile(index)}
                className="shrink-0 text-rouge-800 hover:text-rouge-900 text-xs font-semibold uppercase tracking-wide"
              >
                Retirer
              </button>
            </li>
          ))}
          <li className="text-[0.72rem] text-encre-500 pt-1">
            Total : {formatBytes(total)} / {formatBytes(CONTACT_MAX_ATTACHMENTS_BYTES)}
          </li>
        </ul>
      )}
    </div>
  );
}
