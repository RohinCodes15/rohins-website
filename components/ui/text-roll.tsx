import type { CSSProperties } from "react";

const STAGGER_MS = 35;
/** Longest delay between the first and last letter to move, so long labels still feel fast. */
const MAX_SPREAD_MS = 210;

type TextRollProps = {
  text: string;
  /** Stagger outward from the middle letter instead of left to right. */
  center?: boolean;
};

/**
 * Letters roll up and out while a copy of each rolls in from below, staggered, when the enclosing link or button
 * is hovered (fine pointers) or focused from the keyboard (`.text-roll` in globals.css). Server-rendered CSS: no
 * JavaScript, no hydration. Screen readers get the plain text; the letters are hidden from them. Words stay separate
 * boxes so labels still wrap. Motion after Skiper UI's Skiper 58 TextRoll (skiper-ui.com); no Skiper code is used.
 */
export function TextRoll({ text, center = true }: TextRollProps) {
  const letters = [...text];
  const middle = (letters.length - 1) / 2;
  const farthest = Math.max(1, center ? middle : letters.length - 1);
  const step = Math.min(STAGGER_MS, MAX_SPREAD_MS / farthest);
  const delay = (index: number) => Math.round(step * (center ? Math.abs(index - middle) : index));

  const words = text.split(" ").reduce<{ word: string; start: number }[]>((list, word) => {
    const previous = list.at(-1);
    const start = previous ? previous.start + [...previous.word].length + 1 : 0;
    return [...list, { word, start }];
  }, []);

  return (
    <span className="text-roll">
      <span className="sr-only">{text}</span>
      {words.map(({ word, start }, wordIndex) => (
        <span key={wordIndex} aria-hidden="true">
          {wordIndex > 0 && " "}
          <span className="text-roll-word">
            {[...word].map((letter, offset) => (
              <span key={offset} data-letter={letter} className="text-roll-letter" style={{ "--roll-delay": `${delay(start + offset)}ms` } as CSSProperties}>
                {letter}
              </span>
            ))}
          </span>
        </span>
      ))}
    </span>
  );
}
