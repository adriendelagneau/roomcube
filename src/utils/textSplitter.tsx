import React from "react";

/**
 * Split a string into words and characters for animation/layout purposes
 * @param text - The text to split
 * @returns Array of JSX elements
 */
export function textSplitter(text: string): React.ReactElement[] {
  if (!text) return [];

  // Split text by spaces, but keep spaces for layout
  const words = text.split(" ");

  return words.map((word, wIndex) => (
    <span
      key={`word-${wIndex}`}
      className="word-wrapper mr-[0.25em] inline-block whitespace-nowrap"
    >
      {word.split("").map((char, cIndex) => (
        <span
          key={`char-${wIndex}-${cIndex}`}
          className="outer-span inline-block overflow-hidden align-top"
        >
          <span className="inner-span inline-block">{char}</span>
        </span>
      ))}
      {/* Preserve spacing between words */}
      {wIndex < words.length - 1 && (
        <span className="outer-span inline-block overflow-hidden align-top">
          <span className="inner-span inline-block">&nbsp;</span>
        </span>
      )}
    </span>
  ));
}
