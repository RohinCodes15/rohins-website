"use client";

import { Tooltip as Primitive } from "@base-ui/react/tooltip";
import type { ReactElement } from "react";

type TooltipProps = {
  trigger: ReactElement;
  children: string;
};

/** The trigger needs an accessible name and must work without the supplementary hint. */
export function Tooltip({ trigger, children }: TooltipProps) {
  return (
    <Primitive.Root>
      <Primitive.Trigger render={trigger} />
      <Primitive.Portal>
        <Primitive.Positioner sideOffset={8} className="z-10">
          <Primitive.Popup className="max-w-[min(16rem,var(--available-width))] rounded-sm border border-rule-strong bg-surface px-2 py-1 text-small wrap-anywhere text-text">
            {children}
          </Primitive.Popup>
        </Primitive.Positioner>
      </Primitive.Portal>
    </Primitive.Root>
  );
}
