import type { ContributionDay } from "./validate.ts";

const dayFormat = new Intl.DateTimeFormat("en-US", { dateStyle: "medium", timeZone: "UTC" });
const monthFormat = new Intl.DateTimeFormat("en-US", { month: "short", year: "numeric", timeZone: "UTC" });

export function formatActivityDate(value: string) {
  return dayFormat.format(new Date(value));
}

export function activityMonths(days: readonly ContributionDay[]) {
  const months = new Map<string, { label: string; total: number; days: ContributionDay[] }>();
  for (const day of days) {
    const key = day.date.slice(0, 7);
    const month = months.get(key) ?? { label: monthFormat.format(new Date(day.date)), total: 0, days: [] };
    month.total += day.count;
    month.days.push(day);
    months.set(key, month);
  }
  return [...months.values()];
}

const weekdays = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

export function activityStats(days: readonly ContributionDay[]) {
  let streak = 0;
  let longest = 0;
  const totals = weekdays.map(() => 0);
  for (const { date, count } of days) {
    streak = count > 0 ? streak + 1 : 0;
    longest = Math.max(longest, streak);
    totals[new Date(date).getUTCDay()] += count;
  }
  const highest = Math.max(...totals);
  return { longest, busiest: highest > 0 ? weekdays.filter((_, i) => totals[i] === highest) : [] };
}

const shortMonth = new Intl.DateTimeFormat("en-US", { month: "short", timeZone: "UTC" });

/** Week columns (1-based, Monday-first grid) where a month begins, for the heatmap's month labels. */
export function monthColumns(days: readonly ContributionDay[], offset: number) {
  return days.flatMap(({ date }, index) =>
    index === 0 || date.endsWith("-01")
      ? [{ label: shortMonth.format(new Date(date)), column: Math.floor((index + offset) / 7) + 1 }]
      : [],
  );
}
