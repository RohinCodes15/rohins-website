import AxeBuilder from "@axe-core/playwright";
import { expect, test, type Page } from "@playwright/test";

const LIGHT_BG = "rgb(250, 250, 250)";
const DARK_BG = "rgb(10, 10, 11)";
const TEXT_LIGHT = "rgb(10, 10, 11)";
const TEXT_DARK = "rgb(237, 237, 240)";

const background = (page: Page) => page.evaluate(() => getComputedStyle(document.documentElement).backgroundColor);
const themeAttribute = (page: Page) => page.evaluate(() => document.documentElement.dataset.theme);
const stored = (page: Page) => page.evaluate(() => localStorage.getItem("theme"));
const option = (page: Page, name: "System" | "Light" | "Dark") =>
  page.getByRole("group", { name: "Theme" }).locator("label", { hasText: name });
const radio = (page: Page, name: "System" | "Light" | "Dark") => page.getByRole("radio", { name });

// Hydration mismatches surface as console errors (React #418) in production builds.
let consoleErrors: string[] = [];

test.beforeEach(({ page }) => {
  consoleErrors = [];
  page.on("console", (message) => {
    if (message.type() === "error") consoleErrors.push(message.text());
  });
  page.on("pageerror", (error) => consoleErrors.push(error.message));
});

test.afterEach(() => {
  expect(consoleErrors).toEqual([]);
});

test("system follows the OS, including a change while the page is open", async ({ page }) => {
  await page.emulateMedia({ colorScheme: "dark" });
  await page.goto("/");
  expect(await themeAttribute(page)).toBe("system");
  await expect(radio(page, "System")).toBeChecked();
  expect(await background(page)).toBe(DARK_BG);

  await page.emulateMedia({ colorScheme: "light" });
  expect(await background(page)).toBe(LIGHT_BG);
});

for (const [choice, os, bg, text] of [
  ["Light", "dark", LIGHT_BG, TEXT_LIGHT],
  ["Dark", "light", DARK_BG, TEXT_DARK],
] as const) {
  test(`${choice} overrides a ${os} OS and persists across reloads`, async ({ page }) => {
    await page.emulateMedia({ colorScheme: os });
    await page.goto("/");
    await option(page, choice).click();

    await expect(radio(page, choice)).toBeChecked();
    expect(await background(page)).toBe(bg);
    expect(await stored(page)).toBe(choice.toLowerCase());
    // Native controls and scrollbars follow the chosen theme, not the OS.
    expect(await page.evaluate(() => getComputedStyle(document.documentElement).colorScheme)).toBe(choice.toLowerCase());

    await page.reload();
    await expect(radio(page, choice)).toBeChecked();
    expect(await background(page)).toBe(bg);
    await expect(page.getByRole("heading", { level: 1 })).toHaveCSS("color", text);
  });
}

test("choosing System clears the stored preference", async ({ page }) => {
  await page.emulateMedia({ colorScheme: "light" });
  await page.goto("/");
  await option(page, "Dark").click();
  await option(page, "System").click();
  expect(await stored(page)).toBeNull();
  expect(await background(page)).toBe(LIGHT_BG);
});

test("the stored theme applies before any JavaScript bundle runs (no flash)", async ({ page }) => {
  await page.emulateMedia({ colorScheme: "light" });
  await page.goto("/");
  await option(page, "Dark").click();

  // Only the inline head script can run now: React never loads or hydrates.
  await page.route("**/_next/static/**/*.js", (route) => route.abort());
  await page.reload();
  expect(await themeAttribute(page)).toBe("dark");
  expect(await background(page)).toBe(DARK_BG);
  // The control already shows the right selection before hydration.
  await expect(option(page, "Dark")).toHaveCSS("color", TEXT_DARK);
  await expect(option(page, "Light")).not.toHaveCSS("color", TEXT_DARK);
  // The aborted bundles are this test's own doing.
  consoleErrors = consoleErrors.filter((text) => !text.includes("net::ERR_FAILED"));
});

test("an unknown stored value falls back to system", async ({ page }) => {
  await page.emulateMedia({ colorScheme: "dark" });
  await page.goto("/");
  await page.evaluate(() => localStorage.setItem("theme", "sepia"));
  await page.reload();
  expect(await themeAttribute(page)).toBe("system");
  await expect(radio(page, "System")).toBeChecked();
});

test("the toggle works from the keyboard with a visible focus ring", async ({ page }) => {
  await page.emulateMedia({ colorScheme: "light" });
  await page.goto("/");
  for (const name of ["Skip to content", "Overview", "Selected work", "Tech Stack", "Research and interests", "Activity", "Contact"]) {
    await page.keyboard.press("Tab");
    await expect(page.getByRole("link", { name, exact: true })).toBeFocused();
  }
  await page.keyboard.press("Tab");
  await expect(page.getByRole("button", { name: /^Search/ })).toBeFocused();
  await page.keyboard.press("Tab");
  await expect(radio(page, "System")).toBeFocused();
  await expect(option(page, "System")).toHaveCSS("outline-style", "solid");

  await page.keyboard.press("ArrowRight");
  await expect(radio(page, "Light")).toBeChecked();
  await page.keyboard.press("ArrowRight");
  await expect(radio(page, "Dark")).toBeChecked();
  expect(await background(page)).toBe(DARK_BG);
});

test("a change in one tab updates the other", async ({ page, context }) => {
  await page.emulateMedia({ colorScheme: "light" });
  await page.goto("/");
  const other = await context.newPage();
  await other.emulateMedia({ colorScheme: "light" });
  await other.goto("/");

  await option(page, "Dark").click();
  await expect(radio(other, "Dark")).toBeChecked();
  expect(await background(other)).toBe(DARK_BG);
});

for (const [choice, os] of [
  ["Light", "dark"],
  ["Dark", "light"],
] as const) {
  test(`axe passes with ${choice} chosen on a ${os} OS`, async ({ page }) => {
    await page.emulateMedia({ colorScheme: os });
    await page.goto("/");
    await option(page, choice).click();
    // Contrast is judged on the settled page, not mid-way through the hero entrance's fades.
    await page.evaluate(() => Promise.all(document.getAnimations().filter((a) => a instanceof CSSAnimation && a.animationName.startsWith("hero-")).map((a) => a.finished)));
    const results = await new AxeBuilder({ page })
      .withTags(["wcag2a", "wcag2aa", "wcag21a", "wcag21aa", "wcag22aa"])
      .analyze();
    expect(results.violations).toEqual([]);
  });
}

test("a saved theme also applies on the not-found page", async ({ page }) => {
  await page.emulateMedia({ colorScheme: "dark" });
  await page.addInitScript(() => localStorage.setItem("theme", "light"));
  await page.goto("/work/not-a-project");
  await expect(page.locator("html")).toHaveAttribute("data-theme", "light");
  // Once cached, the document itself is a 404, which the browser logs. That status is expected here.
  consoleErrors = consoleErrors.filter((message) => !message.includes("status of 404"));
});
