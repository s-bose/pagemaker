"use client";

import React from "react";
import EmbedPreview from "./embedder";
export interface Page {
  title: string;
  backgroundColor: string;
  headerSize: "sm" | "md" | "lg" | "xl" | "2xl" | "3xl" | "4xl" | "5xl";
  fontFamily: string;
  fontColor: string;
  content: string;
  link?: string;
  imageUrl?: string;
  embedCode?: string;
}

const PageViewer: React.FC<{ page: Page }> = ({ page }) => {
  const styles: React.CSSProperties = {};
  if (page.backgroundColor) {
    styles.backgroundColor = page.backgroundColor;
  }
  if (page.imageUrl) {
    styles.backgroundImage = `url(${page.imageUrl})`;
    styles.backgroundSize = "cover";
  }
  if (page.fontFamily) {
    styles.fontFamily = page.fontFamily;
  }
  if (page.fontColor) {
    styles.color = page.fontColor;
  }

  console.log(styles, page.fontFamily);
  return (
    <div
      className="min-h-screen flex flex-col items-center justify-center p-4"
      style={styles}
    >
      <div
        className={`max-w-3xl w-full text-center space-y-5 overflow-x break-all ${page.fontFamily}`}
      >
        {page.headerSize == "sm" ? (
          <h1 className="text-sm">{page.content}</h1>
        ) : page.headerSize == "md" ? (
          <h1 className="text-md">{page.content}</h1>
        ) : page.headerSize == "lg" ? (
          <h1 className="text-lg">{page.content}</h1>
        ) : page.headerSize == "xl" ? (
          <h1 className="text-xl">{page.content}</h1>
        ) : page.headerSize == "2xl" ? (
          <h1 className="text-2xl">{page.content}</h1>
        ) : page.headerSize == "3xl" ? (
          <h1 className="text-3xl">{page.content}</h1>
        ) : page.headerSize == "4xl" ? (
          <h1 className="text-4xl">{page.content}</h1>
        ) : page.headerSize == "5xl" ? (
          <h1 className="text-5xl">{page.content}</h1>
        ) : null}

        {page.link && (
          <a
            href={page.link}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block  hover:underline mb-6"
          >
            {page.link}
          </a>
        )}

        {page.embedCode && <EmbedPreview embedCode={page.embedCode} />}
      </div>
    </div>
  );
};

export default PageViewer;
