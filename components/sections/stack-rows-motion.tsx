"use client";

import type { ReactNode } from "react";
import { StaggerItem, StaggerList } from "@/components/motion/primitives";

type StackRowsMotionProps<T extends { id: string }> = {
  items: readonly T[];
  listClassName: string;
  rowClassName: string;
  renderRow: (item: T) => ReactNode;
};

/**
 * Filtered stack rows on Motion (ARCHITECTURE D19): rows that stay slide to their new place, new rows enter
 * with a capped stagger. AnimatePresence initial={false} means swapping in for the static list never animates.
 */
export function StackRowsMotion<T extends { id: string }>({ items, listClassName, rowClassName, renderRow }: StackRowsMotionProps<T>) {
  return (
    <StaggerList className={listClassName}>
      {items.map((item, index) => (
        <StaggerItem key={item.id} index={index} className={rowClassName}>{renderRow(item)}</StaggerItem>
      ))}
    </StaggerList>
  );
}
