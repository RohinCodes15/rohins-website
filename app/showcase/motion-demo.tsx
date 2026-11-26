"use client";

import { useState } from "react";
import { LayoutBox, Presence, StaggerItem, StaggerList } from "@/components/motion/primitives";
import { Button } from "@/components/ui/button";

const ITEMS = ["Item one", "Item two", "Item three", "Item four", "Item five", "Item six"];

/** Exercises each motion primitive through a real interaction (nothing animates on load). */
export function MotionDemo() {
  const [shown, setShown] = useState(false);
  const [filtered, setFiltered] = useState(false);
  const [long, setLong] = useState(false);
  const items = filtered ? ITEMS.filter((_, index) => index % 2 === 0) : ITEMS;

  return (
    <div className="grid gap-8">
      <div className="grid gap-3">
        <Button aria-expanded={shown} onClick={() => setShown((value) => !value)} className="justify-self-start">
          {shown ? "Hide" : "Show"} detail
        </Button>
        <Presence show={shown} className="border border-rule p-4 text-text-2">
          Presence: rises 8 px and fades in on a 240 ms spring; exits on 140 ms.
        </Presence>
      </div>

      <div className="grid gap-3">
        <Button aria-pressed={filtered} onClick={() => setFiltered((value) => !value)} className="justify-self-start">
          Filter odd items
        </Button>
        <StaggerList className="grid gap-px border border-rule bg-rule">
          {items.map((item, index) => (
            <StaggerItem key={item} index={index} className="bg-bg px-3 py-2 text-small">
              {item}
            </StaggerItem>
          ))}
        </StaggerList>
      </div>

      <div className="grid gap-3">
        <Button aria-pressed={long} onClick={() => setLong((value) => !value)} className="justify-self-start">
          Change label length
        </Button>
        <LayoutBox className="justify-self-start border border-rule px-3 py-2 text-small">
          {long ? "LayoutBox moves to its new position without stretching the text" : "LayoutBox"}
        </LayoutBox>
      </div>
    </div>
  );
}
