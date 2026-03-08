"use client";

import { useRef, useEffect, useCallback, useState } from "react";
import dynamic from "next/dynamic";
import "@uiw/react-md-editor/markdown-editor.css";
import "@uiw/react-markdown-preview/markdown.css";

const MDEditor = dynamic(
  () => import("@uiw/react-md-editor").then((mod) => mod.default),
  { ssr: false }
);

type RichMarkdownEditorProps = {
  name?: string;
  id?: string;
  defaultValue?: string;
  required?: boolean;
  className?: string;
};

export function RichMarkdownEditor({
  name = "content",
  id = "content",
  defaultValue = "",
  required = false,
  className,
}: RichMarkdownEditorProps) {
  const hiddenRef = useRef<HTMLInputElement>(null);
  const [value, setValue] = useState(defaultValue);

  const handleChange = useCallback(
    (val?: string) => {
      const next = val ?? "";
      setValue(next);
      if (hiddenRef.current) {
        hiddenRef.current.value = next;
      }
    },
    []
  );

  useEffect(() => {
    if (hiddenRef.current) {
      hiddenRef.current.value = value;
    }
  }, [value]);

  return (
    <div className={className}>
      <input
        ref={hiddenRef}
        type="hidden"
        name={name}
        id={id}
        required={required}
        tabIndex={-1}
        aria-hidden
      />
      <div className="rich-editor-wrapper">
        <MDEditor
          value={value}
          onChange={handleChange}
          height={360}
          preview="edit"
          visibleDragbar={false}
          data-color-mode="light"
        />
      </div>
    </div>
  );
}
