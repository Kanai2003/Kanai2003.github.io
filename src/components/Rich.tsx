import { Fragment } from "react";

/**
 * Renders a data string where **double asterisks** mark the key point to scan for.
 * Keeps content files plain text while letting recruiters skim the bold parts.
 */
export default function Rich({ text }: { text: string }) {
  const parts = text.split(/\*\*(.+?)\*\*/g);
  return (
    <>
      {parts.map((part, i) => (i % 2 === 1 ? <strong key={i}>{part}</strong> : <Fragment key={i}>{part}</Fragment>))}
    </>
  );
}

/** Same text with the markers removed, for meta tags and other plain-text places. */
export const plain = (text: string) => text.replace(/\*\*(.+?)\*\*/g, "$1");
