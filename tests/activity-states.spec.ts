import { expect, test } from "@playwright/test";
import { devPort } from "../playwright.config";

// Activity has three rendered states. Unavailable (no credential, and every upstream failure, which the data layer
// collapses to unavailable; see lib/github/*.test.ts) is covered in portfolio.spec.ts against the production build.
// Loading is the Suspense shell, covered by the no-JavaScript test in home.spec.ts. This file covers success.

test.skip(({ isMobile }) => isMobile, "The development showcase is checked in the desktop project only.");

test("a verified calendar renders totals, dates, and the date list", async ({ page }) => {
  await page.goto(`http://127.0.0.1:${devPort}/showcase`);
  const fixture = page.getByRole("figure").filter({ hasText: "Synthetic test fixture" }).filter({ hasNotText: "zero activity" });
  // 0, 3, 1, 4, 2 repeating over 364 days: 72 × 10 + 0 + 3 + 1 + 4.
  // AnimatedNumber gives screen readers the final value at once and counts the visible digits up in view.
  await expect(fixture.locator(".sr-only").getByText("728", { exact: true })).toHaveCount(1);
  await fixture.scrollIntoViewIfNeeded();
  await expect(fixture.locator("[aria-hidden='true']").getByText("728", { exact: true }).last()).toBeVisible();
  await expect(fixture.getByText("contributions", { exact: true })).toBeVisible();
  await expect(fixture.locator("time[datetime='2026-01-01']").first()).toBeVisible();
  await fixture.getByText("Contribution dates and counts").click();
  // January: 31 days of 0, 3, 1, 4, 2 = 6 × 10 + 0.
  await expect(fixture.getByText("Jan 2026 · 60", { exact: true })).toBeVisible();
});

test("a verified all-zero calendar is shown as data, not as unavailable", async ({ page }) => {
  await page.goto(`http://127.0.0.1:${devPort}/showcase`);
  const zero = page.getByRole("figure").filter({ hasText: "zero activity" });
  await expect(zero.locator(".sr-only").getByText("0", { exact: true }).first()).toHaveCount(1);
  await expect(zero.getByText("contributions", { exact: true })).toBeVisible();
  await expect(zero.getByText("GitHub activity unavailable")).toHaveCount(0);
});
