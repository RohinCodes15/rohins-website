import AxeBuilder from "@axe-core/playwright";
import { expect, test } from "@playwright/test";

test("the research lab labels its demos and recomputes when a parameter changes", async ({ page }) => {
  const errors: string[] = [];
  page.on("pageerror", (error) => errors.push(error.message));
  page.on("console", (message) => { if (message.type() === "error") errors.push(message.text()); });

  await page.goto("/");
  await page.getByRole("link", { name: "Open the research lab" }).click();
  await expect(page).toHaveURL(/\/lab$/);
  await expect(page.getByRole("heading", { level: 1 })).toHaveText("Research lab");
  await expect(page.getByText(/not research findings or investment advice/)).toHaveCount(3);

  const monteCarlo = page.getByRole("region", { name: "Monte Carlo price paths" });
  // The readout animates; its screen-reader text is the settled value.
  const analytic = monteCarlo.getByText("analytic mean S₀e^(μT)").locator("..").locator("dd").first().locator(".sr-only");
  await expect(analytic).toHaveText("107.25");
  const drift = monteCarlo.getByRole("slider", { name: "Drift μ (annual)" });
  await drift.focus();
  await page.keyboard.press("ArrowRight");
  await expect(drift).toHaveAttribute("aria-valuetext", "8%");
  await expect(analytic).toHaveText("108.33");

  const regression = page.getByRole("region", { name: "Linear regression" });
  const seed = regression.getByText(/^seed \d+$/);
  await expect(seed).toHaveText("seed 1");
  await regression.getByRole("button", { name: "New sample" }).click();
  await expect(seed).toHaveText("seed 2");
  await expect(page.getByRole("img", { name: /Scatter plot with fitted slope/ })).toBeVisible();
  expect(errors).toEqual([]);
});

for (const colorScheme of ["light", "dark"] as const) {
  test(`axe passes on the research lab in ${colorScheme} mode`, async ({ page }) => {
    await page.emulateMedia({ colorScheme });
    await page.goto("/lab");
    await expect(page.getByRole("img", { name: /Risk–return curve/ })).toBeVisible();
    const results = await new AxeBuilder({ page }).withTags(["wcag2a", "wcag2aa", "wcag21a", "wcag21aa", "wcag22aa"]).analyze();
    expect(results.violations).toEqual([]);
  });
}

test("charts never paint wider than the page and keep distinct axis labels at extreme settings", async ({ page }) => {
  // Track the widest the document gets from the first frame, before ResizeObserver could correct a fallback width.
  await page.addInitScript(() => {
    const record = () => {
      const w = window as Window & { widest?: number };
      w.widest = Math.max(w.widest ?? 0, document.documentElement.scrollWidth);
      requestAnimationFrame(record);
    };
    requestAnimationFrame(record);
  });
  await page.goto("/lab");
  const monteCarlo = page.getByRole("region", { name: "Monte Carlo price paths" });
  const volatility = monteCarlo.getByRole("slider", { name: "Volatility σ (annual)" });
  await volatility.fill("0");
  const histogram = monteCarlo.locator("figure svg").nth(1);
  await expect(histogram).toHaveAttribute("aria-label", /5th percentile 107\.25, median 107\.25/);
  const labels = await histogram.locator(":scope > text").allTextContents();
  const ticks = labels.filter((text) => /^[\d.]+$/.test(text));
  expect(ticks.length).toBeGreaterThan(1);
  expect(new Set(ticks).size).toBe(ticks.length);
  const widths = await page.evaluate(() => [(window as Window & { widest?: number }).widest, document.documentElement.clientWidth]);
  expect(widths[0] ?? Infinity).toBeLessThanOrEqual(widths[1] ?? 0);
});
