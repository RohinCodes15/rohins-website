# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: portfolio.spec.ts >> contact offers email with a working copy button and profile links
- Location: tests/portfolio.spec.ts:69:1

# Error details

```
Error: browserContext.grantPermissions: Unknown permission: clipboard-write
```

# Test source

```ts
  1   | import { expect, test } from "@playwright/test";
  2   | 
  3   | test("activity reports unavailable without a credential and never loads the terrain", async ({ page }) => {
  4   |   const terrainRequests: string[] = [];
  5   |   page.on("request", (request) => {
  6   |     if (/activity-terrain|kokonutui/.test(request.url())) terrainRequests.push(request.url());
  7   |   });
  8   |   await page.goto("/");
  9   |   await expect(page.getByText("GitHub activity unavailable")).toBeVisible();
  10  |   await expect(page.getByRole("link", { name: /View profile on GitHub/ })).toHaveAttribute("href", "https://github.com/RohinCodes15");
  11  |   await expect(page.getByRole("button", { name: "View as terrain" })).toHaveCount(0);
  12  |   await expect(page.getByText("Synthetic test fixture")).toHaveCount(0);
  13  |   expect(terrainRequests).toEqual([]);
  14  | });
  15  | 
  16  | test("navigation, keyboard filters, and the featured project work", async ({ page }) => {
  17  |   await page.emulateMedia({ reducedMotion: "reduce" });
  18  |   await page.goto("/");
  19  |   const nav = page.getByRole("navigation", { name: "Portfolio sections" });
  20  |   const stackLink = nav.getByRole("link", { name: "Tech Stack" });
  21  |   await stackLink.click();
  22  |   await expect(page).toHaveURL(/#stack$/);
  23  |   await expect(stackLink).toHaveAttribute("aria-current", "location");
  24  | 
  25  |   const language = page.getByRole("button", { name: "Languages" });
  26  |   await language.focus();
  27  |   await page.keyboard.press("Space");
  28  |   await expect(language).toHaveAttribute("aria-pressed", "true");
  29  |   const stack = page.getByRole("region", { name: "Tech Stack" });
  30  |   // The inventory is the region's last list; the first is the featured logo row.
  31  |   const rows = stack.getByRole("list").last().getByRole("listitem");
  32  |   await expect(rows).toHaveCount(7);
  33  |   await expect(rows.filter({ hasText: "TypeScript" })).toHaveCount(1);
  34  |   await expect(rows.filter({ hasText: "Python" })).toHaveCount(1);
  35  |   await expect(stack.getByRole("status")).toHaveText("7 technologies shown");
  36  | 
  37  |   // Stack rows also link to projects, so check that link and then follow the Selected work row.
  38  |   await expect(stack.getByRole("link", { name: "AccessForge AI" }).first()).toHaveAttribute("href", "/work/accessforge");
  39  |   await page.getByRole("region", { name: "Selected work" }).getByRole("link", { name: "Developer portfolio" }).click();
  40  |   await expect(page).toHaveURL(/\/work\/portfolio$/);
  41  |   await expect(page.getByRole("heading", { level: 1 })).toHaveText("Developer portfolio");
  42  |   await page.getByRole("link", { name: "Back to selected work" }).click();
  43  |   await expect(page).toHaveURL(/#work$/);
  44  | });
  45  | 
  46  | test("a case study shows its status, sections, and captioned figure", async ({ page }) => {
  47  |   await page.goto("/");
  48  |   const work = page.getByRole("region", { name: "Selected work" });
  49  |   await expect(work.getByText("In development")).toHaveCount(3);
  50  |   await work.getByRole("link", { name: "AccessForge AI" }).click();
  51  |   await expect(page).toHaveURL(/\/work\/accessforge$/);
  52  |   await expect(page.getByRole("heading", { level: 1 })).toHaveText("AccessForge AI");
  53  |   for (const name of ["Problem", "Solution", "Architecture", "Technical complexity", "Engineering decisions", "Verified outcomes"]) {
  54  |     await expect(page.getByRole("heading", { level: 2, name })).toBeVisible();
  55  |   }
  56  |   await expect(page.getByRole("img", { name: /AccessForge overview page/ })).toBeVisible();
  57  |   await expect(page.getByText(/API was not running/)).toBeVisible();
  58  |   await expect(page.getByRole("navigation", { name: "Case study sections" })).toBeVisible();
  59  | });
  60  | 
  61  | test("an unknown case study renders the not-found page", async ({ page }) => {
  62  |   // With Cache Components the first request for an unlisted slug streams a 200 shell before notFound()
  63  |   // resolves; later requests get 404. Assert the rendered content, which is the same either way.
  64  |   await page.goto("/work/not-a-project");
  65  |   await expect(page.getByRole("heading", { level: 1, name: "Page not found" })).toBeVisible();
  66  |   await expect(page.getByRole("link", { name: "Go to the homepage" })).toHaveAttribute("href", "/");
  67  | });
  68  | 
  69  | test("contact offers email with a working copy button and profile links", async ({ page, context }) => {
> 70  |   await context.grantPermissions(["clipboard-read", "clipboard-write"]);
      |                 ^ Error: browserContext.grantPermissions: Unknown permission: clipboard-write
  71  |   await page.goto("/");
  72  |   const contact = page.getByRole("region", { name: "Contact" });
  73  |   await expect(contact.getByRole("link", { name: "rohinpidathala15@gmail.com" })).toHaveAttribute("href", "mailto:rohinpidathala15@gmail.com");
  74  |   await contact.getByRole("button", { name: "Copy email" }).click();
  75  |   await expect(contact.getByRole("button", { name: "Copied" })).toBeVisible();
  76  |   expect(await page.evaluate(() => navigator.clipboard.readText())).toBe("rohinpidathala15@gmail.com");
  77  |   await expect(contact.getByRole("button", { name: "Copy email" })).toBeVisible({ timeout: 3000 });
  78  |   await expect(contact.getByRole("link", { name: /LinkedIn/ })).toHaveAttribute("href", "https://www.linkedin.com/in/rohin-pidathala-53002842b/");
  79  | });
  80  | 
  81  | test("case studies show the architecture flows and dated repository facts", async ({ page }) => {
  82  |   await page.goto("/work/accessforge");
  83  |   const architecture = page.getByRole("region", { name: "Architecture" });
  84  |   await expect(architecture.getByRole("listitem").filter({ hasText: "services/api" }).first()).toBeAttached();
  85  |   await expect(architecture.getByText("worker imports")).toBeVisible();
  86  |   await expect(page.getByText("Checked 2026-11-25")).toBeVisible();
  87  |   await expect(page.getByText("No license file")).toBeVisible();
  88  | });
  89  | 
  90  | test("the journal stays unpublished while it has no entries", async ({ page }) => {
  91  |   await page.goto("/journal");
  92  |   await expect(page.getByRole("heading", { level: 1, name: "Page not found" })).toBeVisible();
  93  |   await page.goto("/");
  94  |   await expect(page.getByRole("link", { name: /journal/i })).toHaveCount(0);
  95  | });
  96  | 
  97  | test("a project gallery shows every screen with alt text", async ({ page }) => {
  98  |   await page.goto("/work/ledger");
  99  |   await expect(page.getByRole("heading", { level: 2, name: "Screens" })).toBeVisible();
  100 |   const screens = page.locator(".parallax-gallery img");
  101 |   await expect(screens).toHaveCount(9);
  102 |   for (const alt of await screens.evaluateAll((images) => images.map((image) => image.getAttribute("alt") ?? ""))) expect(alt.length).toBeGreaterThan(20);
  103 |   await expect(page.getByText(/Nine screens from the game/)).toBeVisible();
  104 | });
  105 | 
  106 | test("case studies show reading progress once reading starts; the homepage has none", async ({ page }) => {
  107 |   await page.goto("/");
  108 |   await expect(page.locator(".reading-progress")).toHaveCount(0);
  109 |   await page.goto("/work/accessforge");
  110 |   const progress = page.locator(".reading-progress");
  111 |   await expect(progress).toHaveAttribute("data-shown", "false");
  112 |   await page.evaluate(() => scrollTo(0, document.documentElement.scrollHeight));
  113 |   await expect(progress).toHaveAttribute("aria-valuenow", "100");
  114 |   await expect(progress).toHaveAttribute("data-shown", "true");
  115 |   const corner = await progress.boundingBox();
  116 |   await progress.focus();
  117 |   await page.keyboard.press("ArrowLeft");
  118 |   expect((await progress.boundingBox())?.x).toBeLessThan(corner?.x ?? 0);
  119 |   await page.keyboard.press("Home");
  120 |   await expect.poll(async () => (await progress.boundingBox())?.x).toBe(corner?.x);
  121 | });
  122 | 
```