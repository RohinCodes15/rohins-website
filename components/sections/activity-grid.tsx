import { Fragment, type CSSProperties } from "react";
import { activityMonths, activityStats, formatActivityDate, monthColumns } from "@/lib/github/calendar";
import type { ContributionCalendar } from "@/lib/github/validate";
import { TerrainView } from "@/components/terrain/terrain-activation";
import { AnimatedNumber } from "@/components/ui/animated-number";

const levels = ["bg-terrain-0", "bg-terrain-1", "bg-terrain-2", "bg-terrain-3", "bg-terrain-4"];

/** A counted stat: the number counts up in the accent blue, the label sits quietly below. */
function Metric({ label, value }: { label: string; value: number }) {
  return (
    <div className="flex min-w-0 flex-col">
      <dt className="order-2 mt-1 font-mono text-meta text-text-2">{label}</dt>
      <dd className="order-1 text-metric text-[light-dark(#2563eb,#3b82f6)]"><AnimatedNumber value={value} /></dd>
    </div>
  );
}

const plural = (count: number, one: string, many: string) => (count === 1 ? one : many);

export function ActivityGrid({ calendar }: { calendar: ContributionCalendar }) {
  const { days, total, stats } = calendar;
  const { longest, busiest } = activityStats(days);
  const offset = (new Date(days[0].date).getUTCDay() + 6) % 7;
  const weeks = Math.ceil((days.length + offset) / 7);
  const hiddenWeeks = Math.max(weeks - 26, 0);
  return (
    <>
      <div className="px-3 pt-4 pb-3 sm:px-4">
        <dl className="grid grid-cols-2 gap-x-6 gap-y-4 sm:flex sm:flex-wrap sm:items-end sm:gap-x-12">
          <Metric label={plural(total, "contribution", "contributions")} value={total} />
          {busiest.length > 0 && <Metric label={`${plural(longest, "day", "days")}, longest streak`} value={longest} />}
          {stats?.pullRequests !== undefined && <Metric label={`${plural(stats.pullRequests, "pull request", "pull requests")}, past year`} value={stats.pullRequests} />}
          {stats?.publicRepos !== undefined && <Metric label={plural(stats.publicRepos, "public repository", "public repositories")} value={stats.publicRepos} />}
          {stats?.stars !== undefined && <Metric label={plural(stats.stars, "star", "stars")} value={stats.stars} />}
          {busiest.length > 0 && <div className="col-span-full flex min-w-0 flex-col">
            <dt className="order-2 mt-1 font-mono text-meta text-text-2">{busiest.length === 1 ? "busiest day of the week" : "busiest days of the week"}</dt>
            <dd className="order-1 text-h3">{busiest.join(", ")}</dd>
          </div>}
        </dl>
        <p className="mt-4 font-mono text-meta text-text-2 tabular-nums">
          <time dateTime={days[0].date}>{formatActivityDate(days[0].date)}</time>
          {" – "}<time dateTime={days[days.length - 1].date}>{formatActivityDate(days[days.length - 1].date)}</time>
        </p>
        {/* The 3D terrain is the view. The flat calendar shows while it loads, without JavaScript, or if it fails;
            its columns are fluid, and below 640px only the last 26 weeks show. */}
        <TerrainView days={days} fallback={
        <div aria-hidden="true" className="mt-3 max-w-full overflow-hidden" style={{ "--weeks": weeks, "--weeks-sm": Math.min(weeks, 26) } as CSSProperties}>
          <div className="grid grid-cols-[repeat(var(--weeks-sm),minmax(0,1fr))] gap-x-0.5 font-mono text-index text-text-2 sm:grid-cols-[repeat(var(--weeks),minmax(0,1fr))]">
            {monthColumns(days, offset).map(({ label, column }) => {
              const mobile = column - hiddenWeeks;
              return (
                <span
                  key={`${label}-${column}`}
                  style={{ "--col": column, "--col-sm": Math.max(mobile, 1) } as CSSProperties}
                  className={`col-start-(--col-sm) h-4 whitespace-nowrap sm:col-start-(--col) ${mobile < 1 ? "hidden sm:block" : ""}`}
                >
                  {label}
                </span>
              );
            })}
          </div>
          <div className="mt-1 grid grid-flow-col grid-cols-[repeat(var(--weeks-sm),minmax(0,1fr))] grid-rows-[repeat(7,auto)] gap-0.5 sm:grid-cols-[repeat(var(--weeks),minmax(0,1fr))]">
            {Array.from({ length: offset }, (_, index) => <span key={index} className={hiddenWeeks > 0 ? "hidden sm:block" : undefined} />)}
            {days.map(({ date, count, level }, index) => (
              <time key={date} dateTime={date} title={`${date}: ${count}`} className={`block aspect-square rounded-xs ${levels[level]} ${index + offset < hiddenWeeks * 7 ? "hidden sm:block" : ""}`} />
            ))}
          </div>
          <p className="mt-2 flex items-center justify-end gap-1 font-mono text-index text-text-2">
            Less{levels.map((level) => <span key={level} className={`size-2.5 rounded-xs ${level}`} />)}More
          </p>
        </div>
        } />
        <details className="mt-3">
          <summary className="hover-underline min-h-6 w-fit cursor-pointer text-small">Contribution dates and counts</summary>
          <div className="mt-2 grid gap-2">
            {activityMonths(days).map(({ label, total, days: monthDays }) => (
              <details key={label}>
                <summary className="min-h-6 w-fit cursor-pointer font-mono text-meta">{label} · {total.toLocaleString("en-US")}</summary>
                <dl className="grid w-fit grid-cols-[auto_auto] gap-x-6 px-3 py-2 font-mono text-meta text-text-2 tabular-nums">
                  {monthDays.map(({ date, count }) => <Fragment key={date}>
                    <dt><time dateTime={date}>{formatActivityDate(date)}</time></dt>
                    <dd>{count}</dd>
                  </Fragment>)}
                </dl>
              </details>
            ))}
          </div>
        </details>
      </div>
    </>
  );
}
