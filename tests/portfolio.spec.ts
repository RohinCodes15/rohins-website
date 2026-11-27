import { expect, test } from "@playwright/test";

test("activity reports unavailable without a credential and never loads the terrain", async ({ page }) => {
  const terrainRequests: string[] = [];
  page.on("request", (request) => {
    if (/activity-terrain|kokonutui/.test(request.url())) terrainRequests.push(request.url());
  });
  await page.goto("/");
  await expect(page.getByText("GitHub activity unavailable")).toBeVisible();
  await expect(page.getByRole("link", { name: /View profile on GitHub/ })).toHaveAttribute("href", "https://github.com/RohinCodes15");
  await expect(page.getByRole("button", { name: "View as terrain" })).toHaveCount(0);
  await expect(page.getByText("Synthetic test fixture")).toHaveCount(0);
  expect(terrainRequests).toEqual([]);
});

test("navigation, keyboard filters, and the featured project work", async ({ page }) => {
  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.goto("/");
  const nav = page.getByRole("navigation", { name: "Portfolio sections" });
  const stackLink = nav.getByRole("link", { name: "My Technical Arsenal" });
  await stackLink.click();
  await expect(page).toHaveURL(/#stack$/);
  await expect(stackLink).toHaveAttribute("aria-current", "location");

  const language = page.getByRole("button", { name: "Language" });
  await language.focus();
  await page.keyboard.press("Space");
  await expect(language).toHaveAttribute("aria-pressed", "true");
  const stack = page.getByRole("region", { name: "My Technical Arsenal" });
  // The inventory is the region's last list; the first is the featured logo row.
  const rows = stack.getByRole("list").last().getByRole("listitem");
  await expect(rows).toHaveCount(2);
  await expect(rows.filter({ hasText: "TypeScript" })).toHaveCount(1);
  await expect(rows.filter({ hasText: "Python" })).toHaveCount(1);
  await expect(stack.getByRole("status")).toHaveText("2 technologies shown");

  // Stack rows also link to projects, so check that link and then follow the Selected work row.
  await expect(stack.getByRole("link", { name: "AccessForge AI" }).first()).toHaveAttribute("href", "/work/accessforge");
  await page.getByRole("region", { name: "Selected work" }).getByRole("link", { name: "Developer portfolio" }).click();
  await expect(page).toHaveURL(/\/work\/portfolio$/);
  await expect(page.getByRole("heading", { level: 1 })).toHaveText("Developer portfolio");
  await page.getByRole("link", { name: "Back to selected work" }).click();
  await expect(page).toHaveURL(/#work$/);
});

test("a case study shows its status, sections, and captioned figure", async ({ page }) => {
  await page.goto("/");
  const work = page.getByRole("region", { name: "Selected work" });
  await expect(work.getByText("In development")).toHaveCount(3);
  await work.getByRole("link", { name: "AccessForge AI" }).click();
  await expect(page).toHaveURL(/\/work\/accessforge$/);
  await expect(page.getByRole("heading", { level: 1 })).toHaveText("AccessForge AI");
  for (const name of ["Problem", "Solution", "Architecture", "Technical complexity", "Engineering decisions", "Verified outcomes"]) {
    await expect(page.getByRole("heading", { level: 2, name })).toBeVisible();
  }
  await expect(page.getByRole("img", { name: /AccessForge overview page/ })).toBeVisible();
  await expect(page.getByText(/API was not running/)).toBeVisible();
  await expect(page.getByRole("navigation", { name: "Case study sections" })).toBeVisible();
});

test("an unknown case study renders the not-found page", async ({ page }) => {
  // With Cache Components the first request for an unlisted slug streams a 200 shell before notFound()
  // resolves; later requests get 404. Assert the rendered content, which is the same either way.
  await page.goto("/work/not-a-project");
  await expect(page.getByRole("heading", { level: 1, name: "Page not found" })).toBeVisible();
  await expect(page.getByRole("link", { name: "Go to the homepage" })).toHaveAttribute("href", "/");
});

test("contact offers email with a working copy button and profile links", async ({ page, context }) => {
  await context.grantPermissions(["clipboard-read", "clipboard-write"]);
  await page.goto("/");
  const contact = page.getByRole("region", { name: "Contact" });
  await expect(contact.getByRole("link", { name: "rohinpidathala15@gmail.com" })).toHaveAttribute("href", "mailto:rohinpidathala15@gmail.com");
  await contact.getByRole("button", { name: "Copy email" }).click();
  await expect(contact.getByRole("button", { name: "Copied" })).toBeVisible();
  expect(await page.evaluate(() => navigator.clipboard.readText())).toBe("rohinpidathala15@gmail.com");
  await expect(contact.getByRole("button", { name: "Copy email" })).toBeVisible({ timeout: 3000 });
  await expect(contact.getByRole("link", { name: /LinkedIn/ })).toHaveAttribute("href", "https://www.linkedin.com/in/rohin-pidathala-53002842b/");
});

test("case studies show the architecture flows and dated repository facts", async ({ page }) => {
  await page.goto("/work/accessforge");
  const architecture = page.getByRole("region", { name: "Architecture" });
  await expect(architecture.getByRole("listitem").filter({ hasText: "services/api" }).first()).toBeAttached();
  await expect(architecture.getByText("worker imports")).toBeVisible();
  await expect(page.getByText("Checked 2026-11-25")).toBeVisible();
  await expect(page.getByText("No license file")).toBeVisible();
});

test("the journal stays unpublished while it has no entries", async ({ page }) => {
  await page.goto("/journal");
  await expect(page.getByRole("heading", { level: 1, name: "Page not found" })).toBeVisible();
  await page.goto("/");
  await expect(page.getByRole("link", { name: /journal/i })).toHaveCount(0);
});

test("a project gallery shows every screen with alt text", async ({ page }) => {
  await page.goto("/work/ledger");
  await expect(page.getByRole("heading", { level: 2, name: "Screens" })).toBeVisible();
  const screens = page.locator(".parallax-gallery img");
  await expect(screens).toHaveCount(9);
  for (const alt of await screens.evaluateAll((images) => images.map((image) => image.getAttribute("alt") ?? ""))) expect(alt.length).toBeGreaterThan(20);
  await expect(page.getByText(/Nine screens from the game/)).toBeVisible();
});
