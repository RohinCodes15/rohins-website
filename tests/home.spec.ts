import AxeBuilder from "@axe-core/playwright";
import { expect, test } from "@playwright/test";

test("the production homepage exposes the portfolio heading without JavaScript", async ({ browser, baseURL }, testInfo) => {
  const page = await browser.newPage({ ...testInfo.project.use, baseURL, javaScriptEnabled: false });
  try {
    const response = await page.goto("/");
    expect(response?.status()).toBe(200);
    const headers = response?.headers();
    expect(headers?.["x-robots-tag"]).toContain("noindex");
    expect(headers?.["x-content-type-options"]).toBe("nosniff");
    expect(headers?.["content-security-policy"]).toContain("frame-ancestors 'none'");
    expect(headers?.["content-security-policy"]).not.toContain("'unsafe-eval'");
    expect(headers?.["x-powered-by"]).toBeUndefined();
    await expect(page.getByRole("main").getByRole("heading", { level: 1 })).toHaveText("Rohin Pidathala");
    await expect(page).toHaveTitle(/Rohin Pidathala/);
    await expect(page.getByRole("link", { name: /View activity on GitHub/ })).toBeVisible();
    await expect(page.getByRole("button", { name: "Language" })).toBeHidden();
    await expect(page.getByText("TypeScript", { exact: true })).toBeVisible();
    // The theme toggle needs JavaScript, so it stays hidden (keeping its space) and the OS theme applies.
    await expect(page.getByRole("group", { name: "Theme" })).toBeHidden();
  } finally {
    await page.close();
  }
});

test("the page grid reflows across the viewport range", async ({ page }, testInfo) => {
  test.skip(testInfo.project.name !== "desktop", "These widths are exercised in one Chromium project.");

  for (const [width, columns, margin] of [
    [320, 4, 20],
    [639, 4, 20],
    [640, 8, 32],
    [768, 8, 32],
    [1023, 8, 32],
    [1024, 12, 51.2],
    [1440, 12, 64],
    [2560, 12, 64],
  ]) {
    await page.setViewportSize({ width, height: 900 });
    await page.goto("/");
    const layout = await page.getByRole("heading", { level: 1 }).evaluate((heading) => {
      const grid = heading.parentElement!;
      const style = getComputedStyle(grid);
      const rect = grid.getBoundingClientRect();
      const { scrollWidth, clientWidth } = document.documentElement;
      return {
        columns: style.gridTemplateColumns.split(" ").length,
        margin: Number.parseFloat(style.paddingInlineStart),
        start: rect.left,
        width: rect.width,
        headingColumn: getComputedStyle(heading).gridColumnStart,
        overflows: scrollWidth > clientWidth,
      };
    });
    expect(layout.columns, `${width}px columns`).toBe(columns);
    expect(layout.margin, `${width}px margin`).toBeCloseTo(margin, 0);
    expect(layout.start, `${width}px left edge`).toBe(0);
    expect(layout.width, `${width}px content cap`).toBeCloseTo(Math.min(width, 1320 + 2 * margin), 0);
    expect(layout.headingColumn, `${width}px heading placement`).toBe(columns === 12 ? "4" : "1");
    expect(layout.overflows, `${width}px horizontal overflow`).toBe(false);
  }
});

for (const colorScheme of ["light", "dark"] as const) {
  test(`the production homepage passes axe in ${colorScheme} mode`, async ({ page }) => {
    await page.emulateMedia({ colorScheme });
    await page.goto("/");
    const results = await new AxeBuilder({ page })
      .withTags(["wcag2a", "wcag2aa", "wcag21a", "wcag21aa", "wcag22aa"])
      .analyze();
    expect(results.violations).toEqual([]);
  });
}

test("the development showcase is not part of the production build", async ({ page }) => {
  const response = await page.goto("/showcase");
  expect(response?.status()).toBe(404);
});
