import { ActivityGrid } from "@/components/sections/activity-grid";
import { ActivityFrame } from "@/components/sections/activity";
import { validateContributionResponse } from "@/lib/github/validate";

// Imported only by page.dev.tsx. These synthetic responses exercise the API contract, never the public homepage.
const levels = ["NONE", "FIRST_QUARTILE", "SECOND_QUARTILE", "THIRD_QUARTILE", "FOURTH_QUARTILE"];

export function ActivityFixture({ zero = false }: { zero?: boolean }) {
  const days = Array.from({ length: 364 }, (_, i) => {
    const count = zero ? 0 : (i * 13) % 5;
    return {
      date: new Date(Date.UTC(2026, 0, i + 1)).toISOString().slice(0, 10),
      contributionCount: count,
      contributionLevel: levels[count],
    };
  });
  const result = validateContributionResponse({ data: { user: {
    login: "fixture",
    contributionsCollection: {
      startedAt: "2026-01-01T00:00:00Z",
      endedAt: `${days.at(-1)?.date}T23:59:59Z`,
      contributionCalendar: {
        totalContributions: days.reduce((total, day) => total + day.contributionCount, 0),
        weeks: Array.from({ length: 52 }, (_, i) => ({ contributionDays: days.slice(i * 7, (i + 1) * 7) })),
      },
    },
  } } }, "fixture");
  if (!result.ok) throw new Error("Invalid activity test fixture");

  return <ActivityFrame caption={zero ? " · Synthetic test fixture (zero activity)" : " · Synthetic test fixture"}><ActivityGrid calendar={result.calendar} /></ActivityFrame>;
}
