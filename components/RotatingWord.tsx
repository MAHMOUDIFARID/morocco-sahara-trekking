"use client";

import { useEffect, useState } from "react";

interface RotatingWordProps {
  words: string[];
  interval?: number;
  className?: string;
}

export default function RotatingWord({
  words,
  interval = 2500,
  className = "",
}: RotatingWordProps) {
  const [index, setIndex] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(true);

  // Append first word for a seamless, continuous upward slot-machine loop
  const extendedWords = words.length > 1 ? [...words, words[0]] : words;

  useEffect(() => {
    if (words.length <= 1) return;

    const timer = setInterval(() => {
      setIsTransitioning(true);
      setIndex((prev) => prev + 1);
    }, interval);

    return () => clearInterval(timer);
  }, [words.length, interval]);

  // When we finish transitioning to the duplicated first word, jump to 0 instantly without transition
  useEffect(() => {
    if (words.length > 1 && index === words.length) {
      const resetTimer = setTimeout(() => {
        setIsTransitioning(false);
        setIndex(0);
      }, 700);

      return () => clearTimeout(resetTimer);
    }
  }, [index, words.length]);

  return (
    <span
      className={`relative inline-flex overflow-hidden align-baseline ${className}`}
      style={{
        height: "1.15em",
        lineHeight: "1.15em",
        verticalAlign: "baseline",
      }}
    >
      <span
        className={`flex flex-col ${
          isTransitioning
            ? "transition-transform duration-700 ease-[cubic-bezier(0.76,0,0.24,1)]"
            : ""
        }`}
        style={{
          transform: `translateY(-${index * 1.15}em)`,
          textShadow: "0 0 25px rgba(192, 70, 47, 0.45)",
        }}
      >
        {extendedWords.map((word, i) => (
          <span
            key={i}
            className="block whitespace-nowrap"
            style={{ height: "1.15em", lineHeight: "1.15em" }}
          >
            {word}
          </span>
        ))}
      </span>
    </span>
  );
}
