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
  const [animationState, setAnimationState] = useState<"active" | "exiting" | "entering">("active");

  useEffect(() => {
    if (words.length <= 1) return;

    const timer = setInterval(() => {
      // Step 1: Slide up & fade out the current word
      setAnimationState("exiting");

      // Step 2: Swap the word and position the new word below (hidden)
      setTimeout(() => {
        setIndex((prev) => (prev + 1) % words.length);
        setAnimationState("entering");

        // Step 3: Animate the new word sliding up into position
        setTimeout(() => {
          setAnimationState("active");
        }, 20);
      }, 300);
    }, interval);

    return () => clearInterval(timer);
  }, [words.length, interval]);

  const getAnimationClasses = () => {
    switch (animationState) {
      case "exiting":
        return "opacity-0 -translate-y-5 transition-all duration-300 ease-in";
      case "entering":
        return "opacity-0 translate-y-5 transition-none";
      case "active":
      default:
        return "opacity-100 translate-y-0 transition-all duration-300 ease-out";
    }
  };

  return (
    <span className={`relative inline-block ${className}`}>
      <span
        className={`inline-block ${getAnimationClasses()}`}
        style={{ textShadow: "0 0 25px rgba(192, 70, 47, 0.45)" }}
      >
        {words[index]}
      </span>
    </span>
  );
}
