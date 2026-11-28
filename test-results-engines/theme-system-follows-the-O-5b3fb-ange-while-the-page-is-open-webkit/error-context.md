# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: theme.spec.ts >> system follows the OS, including a change while the page is open
- Location: tests/theme.spec.ts:31:1

# Error details

```
Error: expect(locator).toBeChecked() failed

Locator:  getByRole('radio', { name: 'System' })
Expected: checked
Received: unchecked
Timeout:  5000ms

Call log:
  - Expect "toBeChecked" getByRole('radio', { name: 'System' }) with timeout 5000ms
  - waiting for getByRole('radio', { name: 'System' })
    14 × locator resolved to <input type="radio" name="theme" value="system" class="sr-only"/>
       - unexpected value "unchecked"

```

```yaml
- radio "System"
```

```
Error: expect(received).toEqual(expected) // deep equality

- Expected  -  1
+ Received  + 13

- Array []
+ Array [
+   "Failed to load resource: A TLS error caused the secure connection to fail.",
+   "Failed to load resource: A TLS error caused the secure connection to fail.",
+   "Failed to load resource: A TLS error caused the secure connection to fail.",
+   "Failed to load resource: A TLS error caused the secure connection to fail.",
+   "Failed to load resource: A TLS error caused the secure connection to fail.",
+   "Failed to load resource: A TLS error caused the secure connection to fail.",
+   "Failed to load resource: A TLS error caused the secure connection to fail.",
+   "Failed to load resource: A TLS error caused the secure connection to fail.",
+   "Failed to load resource: A TLS error caused the secure connection to fail.",
+   "Failed to load resource: A TLS error caused the secure connection to fail.",
+   "Failed to load resource: A TLS error caused the secure connection to fail.",
+ ]
```

# Test source

```ts
  1   | import AxeBuilder from "@axe-core/playwright";
  2   | import { expect, test, type Page } from "@playwright/test";
  3   | 
  4   | const LIGHT_BG = "rgb(250, 250, 250)";
  5   | const DARK_BG = "rgb(10, 10, 11)";
  6   | const TEXT_LIGHT = "rgb(10, 10, 11)";
  7   | const TEXT_DARK = "rgb(237, 237, 240)";
  8   | 
  9   | const background = (page: Page) => page.evaluate(() => getComputedStyle(document.documentElement).backgroundColor);
  10  | const themeAttribute = (page: Page) => page.evaluate(() => document.documentElement.dataset.theme);
  11  | const stored = (page: Page) => page.evaluate(() => localStorage.getItem("theme"));
  12  | const option = (page: Page, name: "System" | "Light" | "Dark") =>
  13  |   page.getByRole("group", { name: "Theme" }).locator("label", { hasText: name });
  14  | const radio = (page: Page, name: "System" | "Light" | "Dark") => page.getByRole("radio", { name });
  15  | 
  16  | // Hydration mismatches surface as console errors (React #418) in production builds.
  17  | let consoleErrors: string[] = [];
  18  | 
  19  | test.beforeEach(({ page }) => {
  20  |   consoleErrors = [];
  21  |   page.on("console", (message) => {
  22  |     if (message.type() === "error") consoleErrors.push(message.text());
  23  |   });
  24  |   page.on("pageerror", (error) => consoleErrors.push(error.message));
  25  | });
  26  | 
  27  | test.afterEach(() => {
> 28  |   expect(consoleErrors).toEqual([]);
      |                         ^ Error: expect(received).toEqual(expected) // deep equality
  29  | });
  30  | 
  31  | test("system follows the OS, including a change while the page is open", async ({ page }) => {
  32  |   await page.emulateMedia({ colorScheme: "dark" });
  33  |   await page.goto("/");
  34  |   expect(await themeAttribute(page)).toBe("system");
  35  |   await expect(radio(page, "System")).toBeChecked();
  36  |   expect(await background(page)).toBe(DARK_BG);
  37  | 
  38  |   await page.emulateMedia({ colorScheme: "light" });
  39  |   expect(await background(page)).toBe(LIGHT_BG);
  40  | });
  41  | 
  42  | for (const [choice, os, bg, text] of [
  43  |   ["Light", "dark", LIGHT_BG, TEXT_LIGHT],
  44  |   ["Dark", "light", DARK_BG, TEXT_DARK],
  45  | ] as const) {
  46  |   test(`${choice} overrides a ${os} OS and persists across reloads`, async ({ page }) => {
  47  |     await page.emulateMedia({ colorScheme: os });
  48  |     await page.goto("/");
  49  |     await option(page, choice).click();
  50  | 
  51  |     await expect(radio(page, choice)).toBeChecked();
  52  |     expect(await background(page)).toBe(bg);
  53  |     expect(await stored(page)).toBe(choice.toLowerCase());
  54  |     // Native controls and scrollbars follow the chosen theme, not the OS.
  55  |     expect(await page.evaluate(() => getComputedStyle(document.documentElement).colorScheme)).toBe(choice.toLowerCase());
  56  | 
  57  |     await page.reload();
  58  |     await expect(radio(page, choice)).toBeChecked();
  59  |     expect(await background(page)).toBe(bg);
  60  |     await expect(page.getByRole("heading", { level: 1 })).toHaveCSS("color", text);
  61  |   });
  62  | }
  63  | 
  64  | test("choosing System clears the stored preference", async ({ page }) => {
  65  |   await page.emulateMedia({ colorScheme: "light" });
  66  |   await page.goto("/");
  67  |   await option(page, "Dark").click();
  68  |   await option(page, "System").click();
  69  |   expect(await stored(page)).toBeNull();
  70  |   expect(await background(page)).toBe(LIGHT_BG);
  71  | });
  72  | 
  73  | test("the stored theme applies before any JavaScript bundle runs (no flash)", async ({ page }) => {
  74  |   await page.emulateMedia({ colorScheme: "light" });
  75  |   await page.goto("/");
  76  |   await option(page, "Dark").click();
  77  | 
  78  |   // Only the inline head script can run now: React never loads or hydrates.
  79  |   await page.route("**/_next/static/**/*.js", (route) => route.abort());
  80  |   await page.reload();
  81  |   expect(await themeAttribute(page)).toBe("dark");
  82  |   expect(await background(page)).toBe(DARK_BG);
  83  |   // The control already shows the right selection before hydration.
  84  |   await expect(option(page, "Dark")).toHaveCSS("color", TEXT_DARK);
  85  |   await expect(option(page, "Light")).not.toHaveCSS("color", TEXT_DARK);
  86  |   // The aborted bundles are this test's own doing.
  87  |   consoleErrors = consoleErrors.filter((text) => !text.includes("net::ERR_FAILED"));
  88  | });
  89  | 
  90  | test("an unknown stored value falls back to system", async ({ page }) => {
  91  |   await page.emulateMedia({ colorScheme: "dark" });
  92  |   await page.goto("/");
  93  |   await page.evaluate(() => localStorage.setItem("theme", "sepia"));
  94  |   await page.reload();
  95  |   expect(await themeAttribute(page)).toBe("system");
  96  |   await expect(radio(page, "System")).toBeChecked();
  97  | });
  98  | 
  99  | test("the toggle works from the keyboard with a visible focus ring", async ({ page }) => {
  100 |   await page.emulateMedia({ colorScheme: "light" });
  101 |   await page.goto("/");
  102 |   for (const name of ["Skip to content", "Overview", "Selected work", "A Closer Look", "Tech Stack", "Research and interests", "Activity", "Contact"]) {
  103 |     await page.keyboard.press("Tab");
  104 |     await expect(page.getByRole("link", { name, exact: true })).toBeFocused();
  105 |   }
  106 |   await page.keyboard.press("Tab");
  107 |   await expect(page.getByRole("button", { name: /^Search/ })).toBeFocused();
  108 |   await page.keyboard.press("Tab");
  109 |   await expect(radio(page, "System")).toBeFocused();
  110 |   await expect(option(page, "System")).toHaveCSS("outline-style", "solid");
  111 | 
  112 |   await page.keyboard.press("ArrowRight");
  113 |   await expect(radio(page, "Light")).toBeChecked();
  114 |   await page.keyboard.press("ArrowRight");
  115 |   await expect(radio(page, "Dark")).toBeChecked();
  116 |   expect(await background(page)).toBe(DARK_BG);
  117 | });
  118 | 
  119 | test("a change in one tab updates the other", async ({ page, context }) => {
  120 |   await page.emulateMedia({ colorScheme: "light" });
  121 |   await page.goto("/");
  122 |   const other = await context.newPage();
  123 |   await other.emulateMedia({ colorScheme: "light" });
  124 |   await other.goto("/");
  125 | 
  126 |   await option(page, "Dark").click();
  127 |   await expect(radio(other, "Dark")).toBeChecked();
  128 |   expect(await background(other)).toBe(DARK_BG);
```