# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: home.spec.ts >> the production homepage exposes the portfolio heading without JavaScript
- Location: tests/home.spec.ts:4:1

# Error details

```
Error: expect(locator).toBeHidden() failed

Locator:  getByRole('button', { name: 'Languages' })
Expected: hidden
Received: visible
Timeout:  5000ms

Call log:
  - Expect "toBeHidden" getByRole('button', { name: 'Languages' }) with timeout 5000ms
  - waiting for getByRole('button', { name: 'Languages' })
    13 × locator resolved to <button type="button" aria-pressed="false" class="inline-flex min-h-6 cursor-pointer items-baseline gap-1.5 text-text-2 underline decoration-transparent underline-offset-4 transition-colors duration-(--duration-micro) ease-out hover:text-text hover:decoration-signal aria-pressed:text-text aria-pressed:decoration-signal">…</button>
       - unexpected value "visible"

```

```yaml
- button "Languages"
```

# Test source

```ts
  1   | import AxeBuilder from "@axe-core/playwright";
  2   | import { expect, test } from "@playwright/test";
  3   | 
  4   | test("the production homepage exposes the portfolio heading without JavaScript", async ({ browser, baseURL }, testInfo) => {
  5   |   const page = await browser.newPage({ ...testInfo.project.use, baseURL, javaScriptEnabled: false });
  6   |   try {
  7   |     const response = await page.goto("/");
  8   |     expect(response?.status()).toBe(200);
  9   |     const headers = response?.headers();
  10  |     expect(headers?.["x-robots-tag"]).toContain("noindex");
  11  |     expect(headers?.["x-content-type-options"]).toBe("nosniff");
  12  |     expect(headers?.["content-security-policy"]).toContain("frame-ancestors 'none'");
  13  |     expect(headers?.["content-security-policy"]).not.toContain("'unsafe-eval'");
  14  |     expect(headers?.["x-powered-by"]).toBeUndefined();
  15  |     await expect(page.getByRole("main").getByRole("heading", { level: 1 })).toHaveText("Rohin Pidathala");
  16  |     await expect(page).toHaveTitle(/Rohin Pidathala/);
  17  |     await expect(page.getByRole("link", { name: /View activity on GitHub/ })).toBeVisible();
> 18  |     await expect(page.getByRole("button", { name: "Languages" })).toBeHidden();
      |                                                                   ^ Error: expect(locator).toBeHidden() failed
  19  |     // The stack inventory rows render without JavaScript (the featured logo row also names TypeScript).
  20  |     await expect(page.getByText("TypeScript", { exact: true }).last()).toBeVisible();
  21  |     // The theme toggle needs JavaScript, so it stays hidden (keeping its space) and the OS theme applies.
  22  |     await expect(page.getByRole("group", { name: "Theme" })).toBeHidden();
  23  |   } finally {
  24  |     await page.close();
  25  |   }
  26  | });
  27  | 
  28  | test("the page grid reflows across the viewport range", async ({ page }, testInfo) => {
  29  |   test.skip(testInfo.project.name !== "desktop", "These widths are exercised in one Chromium project.");
  30  | 
  31  |   for (const [width, columns, margin] of [
  32  |     [320, 4, 20],
  33  |     [639, 4, 20],
  34  |     [640, 8, 32],
  35  |     [768, 8, 32],
  36  |     [1023, 8, 32],
  37  |     [1024, 12, 51.2],
  38  |     [1440, 12, 64],
  39  |     [2560, 12, 64],
  40  |   ]) {
  41  |     await page.setViewportSize({ width, height: 900 });
  42  |     await page.goto("/");
  43  |     const layout = await page.getByRole("heading", { level: 1 }).evaluate((heading) => {
  44  |       const grid = heading.parentElement!;
  45  |       const style = getComputedStyle(grid);
  46  |       const rect = grid.getBoundingClientRect();
  47  |       const { scrollWidth, clientWidth } = document.documentElement;
  48  |       return {
  49  |         columns: style.gridTemplateColumns.split(" ").length,
  50  |         margin: Number.parseFloat(style.paddingInlineStart),
  51  |         start: rect.left,
  52  |         width: rect.width,
  53  |         headingColumn: getComputedStyle(heading).gridColumnStart,
  54  |         overflows: scrollWidth > clientWidth,
  55  |       };
  56  |     });
  57  |     expect(layout.columns, `${width}px columns`).toBe(columns);
  58  |     expect(layout.margin, `${width}px margin`).toBeCloseTo(margin, 0);
  59  |     expect(layout.start, `${width}px left edge`).toBe(0);
  60  |     expect(layout.width, `${width}px content cap`).toBeCloseTo(Math.min(width, 1320 + 2 * margin), 0);
  61  |     expect(layout.headingColumn, `${width}px heading placement`).toBe(columns === 12 ? "4" : "1");
  62  |     expect(layout.overflows, `${width}px horizontal overflow`).toBe(false);
  63  |   }
  64  | });
  65  | 
  66  | for (const colorScheme of ["light", "dark"] as const) {
  67  |   test(`the production homepage passes axe in ${colorScheme} mode`, async ({ page }) => {
  68  |     await page.emulateMedia({ colorScheme });
  69  |     await page.goto("/");
  70  |     const results = await new AxeBuilder({ page })
  71  |       .withTags(["wcag2a", "wcag2aa", "wcag21a", "wcag21aa", "wcag22aa"])
  72  |       .analyze();
  73  |     expect(results.violations).toEqual([]);
  74  |   });
  75  | }
  76  | 
  77  | test("the development showcase is not part of the production build", async ({ page }) => {
  78  |   const response = await page.goto("/showcase");
  79  |   expect(response?.status()).toBe(404);
  80  | });
  81  | 
  82  | test("the homepage gallery links every screen to its case study", async ({ page }) => {
  83  |   await page.goto("/");
  84  |   await expect(page.getByRole("heading", { level: 2, name: "A Closer Look" })).toBeVisible();
  85  |   const links = page.locator(".parallax-gallery a");
  86  |   await expect(links).toHaveCount(14);
  87  |   for (const href of await links.evaluateAll((anchors) => anchors.map((anchor) => anchor.getAttribute("href") ?? ""))) expect(href).toMatch(/^\/work\/(accessforge|risklens|ledger)$/);
  88  |   for (const alt of await links.locator("img").evaluateAll((images) => images.map((image) => image.getAttribute("alt") ?? ""))) expect(alt.length).toBeGreaterThan(20);
  89  |   await links.first().focus();
  90  |   await expect(links.first().locator(".gallery-label")).toHaveCSS("opacity", "1");
  91  | });
  92  | 
  93  | test("the stack logos name themselves on keyboard focus and link to projects", async ({ page }) => {
  94  |   await page.goto("/");
  95  |   const logos = page.getByRole("list", { name: "Featured technologies" }).getByRole("listitem");
  96  |   await expect(logos).toHaveCount(9);
  97  |   const python = logos.first().locator(".logo-assembly-item");
  98  |   await expect(python).toHaveAttribute("href", "/work/accessforge");
  99  |   await python.focus();
  100 |   await expect(python.locator(".logo-assembly-label")).toHaveCSS("opacity", "1");
  101 |   await expect(python).toContainText("Python");
  102 |   await expect(page.getByRole("list", { name: "Featured technologies" })).toContainText("C++");
  103 | });
  104 | 
  105 | test("navigation labels roll on keyboard focus without changing their names or size", async ({ page }, testInfo) => {
  106 |   await page.goto("/");
  107 |   const link = page.getByRole("navigation", { name: "Portfolio sections" }).getByRole("link", { name: "Selected work", exact: true });
  108 |   const before = await link.boundingBox();
  109 |   await link.focus();
  110 |   const letter = link.locator(".text-roll-letter").first();
  111 |   if (testInfo.project.name === "desktop") await expect(letter).not.toHaveCSS("transform", "none");
  112 |   expect(await link.boundingBox()).toEqual(before);
  113 |   await expect(link.locator("[aria-hidden='true']").first()).toBeAttached();
  114 | });
  115 | 
  116 | test("featured projects stack as pinned panels on wide screens and stay a plain list under reduced motion", async ({ page }) => {
  117 |   await page.setViewportSize({ width: 1440, height: 900 });
  118 |   await page.goto("/");
```