"use client";

import dynamic from "next/dynamic";
import { useEffect, useRef, useState, useSyncExternalStore } from "react";

// Loaded on first open, so pages that never use the palette pay only for this button.
const CommandPalette = dynamic(() => import("./command-palette"), { ssr: false });

const subscribe = () => () => {};
const shortcut = () => (/Mac|iPhone|iPad/.test(navigator.platform) ? "Cmd K" : "Ctrl K");

export function CommandPaletteTrigger() {
  // Each opening is a numbered session. A late close event from an earlier session cannot close a newer one.
  const [session, setSession] = useState<number | null>(null);
  const openNew = () => setSession((current) => (current ?? 0) + 1);
  const button = useRef<HTMLButtonElement>(null);
  const label = useSyncExternalStore(subscribe, shortcut, () => "");

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      // Next.js keeps the previous page mounted but hidden; only the visible page's trigger responds.
      if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === "k" && button.current?.checkVisibility()) {
        event.preventDefault();
        // Read the dialog itself: its close event arrives a task after close(), so React state can lag.
        const shown = document.querySelector<HTMLDialogElement>("dialog.palette-dialog[open]");
        if (shown) shown.close();
        else openNew();
      }
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, []);

  return (
    <>
      <button
        ref={button}
        type="button"
        aria-haspopup="dialog"
        aria-keyshortcuts="Meta+K Control+K"
        onClick={openNew}
        className="inline-flex min-h-6 cursor-pointer items-center gap-2 font-mono text-meta text-text-2 transition-colors duration-(--duration-micro) ease-out hover:text-text"
      >
        Search
        {label && <kbd className="rounded-xs border border-rule-strong px-1 text-index">{label}</kbd>}
      </button>
      {session !== null && <CommandPalette key={session} onClose={() => setSession((current) => (current === session ? null : current))} />}
    </>
  );
}
