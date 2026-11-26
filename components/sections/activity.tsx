import type { ReactNode } from "react";
import { connection } from "next/server";
import { Link } from "@/components/ui/link";
import { ActivityGrid } from "./activity-grid";
import { getActivity } from "@/lib/github/activity";
import { githubProfile } from "@/content/site";
import { formatActivityDate } from "@/lib/github/calendar";

export function ActivityFrame({ children, caption }: { children: ReactNode; caption?: ReactNode }) {
  return (
    <figure className="grid-figure min-w-0">
      <div className="flex min-h-44 flex-col justify-center rounded-sm border border-rule-strong bg-surface">
        {children}
      </div>
      <figcaption className="mt-3 text-small text-text-2">
        <span className="font-mono text-meta">Fig. 1</span> · GitHub contributions{caption}
      </figcaption>
    </figure>
  );
}

export async function Activity() {
  await connection();
  const result = await getActivity();

  if (!result) {
    return (
      <ActivityFrame>
        <div className="grid items-start gap-1 px-4 py-4 sm:px-6">
          <p className="text-text-2">GitHub activity unavailable</p>
          <p><Link href={githubProfile.href} external>View profile on GitHub</Link></p>
        </div>
      </ActivityFrame>
    );
  }

  return (
    <ActivityFrame caption={<> · Last updated <time dateTime={result.retrievedAt}>{formatActivityDate(result.retrievedAt)} UTC</time></>}>
      <ActivityGrid calendar={result.calendar} />
    </ActivityFrame>
  );
}
