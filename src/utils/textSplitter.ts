// utils/textSplitter.js
import React from "react";

export function textSplitter(text) {
  if (!text) return [];

  // Split text by spaces, but keep spaces for layout
  const words = text.split(" ");

  return words.map((word, wIndex) => (
    <span
      key={`word-${wIndex}`}
      className="word-wrapper inline-block whitespace-nowrap mr-[0.25em]"
    >
      {word.split("").map((char, cIndex) => (
        <span
          key={`char-${wIndex}-${cIndex}`}
          className="outer-span inline-block overflow-hidden align-top"
        >
          <span className="inner-span inline-block">
            {char}
          </span>
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
