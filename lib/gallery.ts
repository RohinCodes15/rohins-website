/**
 * Splits images into `count` columns, each image going to the column that is currently shortest (heights measured
 * relative to column width). Drifting gallery columns then end at similar depths, so none runs out early.
 * Order is kept within each column; equal shapes are dealt round-robin.
 */
export function balanceColumns<T extends { readonly width: number; readonly height: number }>(images: readonly T[], count: number): T[][] {
  const empty = Array.from({ length: count }, () => ({ items: [] as T[], depth: 0 }));
  const columns = images.reduce((current, image) => {
    const shortest = current.reduce((best, column, index) => (column.depth < current[best].depth ? index : best), 0);
    return current.map((column, index) => index === shortest
      ? { items: [...column.items, image], depth: column.depth + image.height / image.width }
      : column);
  }, empty);
  return columns.map(({ items }) => items);
}
