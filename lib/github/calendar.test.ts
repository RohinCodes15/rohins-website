import assert from "node:assert/strict";
import { test } from "node:test";
import { activityMonths, activityStats, formatActivityDate, monthColumns } from "./calendar.ts";
import type { ContributionDay } from "./validate.ts";

const days: ContributionDay[] = [
  { date: "2026-01-30", count: 2, level: 1 },
  { date: "2026-01-31", count: 2, level: 1 },
  { date: "2026-02-01", count: 0, level: 0 },
  { date: "2026-02-02", count: 1, level: 1 },
];

test("groups days and counts by UTC calendar month", () => {
  assert.equal(formatActivityDate(days[0].date), "Jan 30, 2026");
  assert.deepEqual(activityMonths(days), [
    { label: "Jan 2026", total: 4, days: days.slice(0, 2) },
    { label: "Feb 2026", total: 1, days: days.slice(2) },
  ]);
});

test("calculates a streak and keeps ties, without assigning a busiest day to zero activity", () => {
  assert.deepEqual(activityStats(days), { longest: 2, busiest: ["Friday", "Saturday"] });
  assert.deepEqual(activityStats(days.slice(2, 3)), { longest: 0, busiest: [] });
});

test("monthColumns marks the first day and each month start by week column", () => {
  const days = ["2026-01-30", "2026-01-31", "2026-02-01", "2026-02-02"].map((date) => ({ date, count: 0, level: 0 as const }));
  assert.deepEqual(monthColumns(days, 5), [
    { label: "Jan", column: 1 },
    { label: "Feb", column: 2 },
  ]);
});
