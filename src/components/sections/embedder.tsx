import { useEffect, useRef } from "react";
import DOMPurify from "dompurify";

interface EmbedPreviewProps {
  embedCode: string;
}

export default function EmbedPreview({ embedCode }: EmbedPreviewProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current || !embedCode) return;

    // Configure DOMPurify to allow iframes and scripts for embeds
    const purifyConfig = {
      ADD_TAGS: ["iframe"],
      ADD_ATTR: [
        "allow",
        "allowfullscreen",
        "frameborder",
        "scrolling",
        "target",
      ],
    };

    // Sanitize the embed code
    const sanitizedHtml = DOMPurify.sanitize(embedCode, purifyConfig);

    // Set the sanitized HTML
    containerRef.current.innerHTML = sanitizedHtml;
  }, [embedCode]);

  return (
    <div
      ref={containerRef}
      className="embed-container w-full overflow-hidden"
    />
  );
}
