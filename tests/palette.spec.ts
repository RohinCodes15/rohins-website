import AxeBuilder from "@axe-core/playwright";
import { expect, test } from "@playwright/test";

test("the command palette searches projects and opens one from the keyboard", async ({ page }) => {
  await page.goto("/");
  await page.getByRole("button", { name: /^Search/ }).click();
  const input = page.getByRole("combobox", { name: "Search pages, projects, and settings" });
  await expect(input).toBeFocused();
  await input.fill("fastapi");
  await expect(page.getByRole("option")).toHaveCount(1);
  await expect(page.getByRole("status").filter({ hasText: "result" })).toHaveText("1 result");
  await page.keyboard.press("Enter");
  await expect(page).toHaveURL(/\/work\/accessforge$/);
  await expect(page.getByRole("dialog")).toHaveCount(0);
});

test("arrow keys move the selection, the theme applies, and Escape closes", async ({ page }) => {
  await page.goto("/lab");
  await page.getByRole("button", { name: /^Search/ }).click();
  const input = page.getByRole("combobox");
  await input.fill("theme");
  const options = page.getByRole("option");
  await expect(options).toHaveCount(3);
  await expect(options.nth(0)).toHaveAttribute("aria-selected", "true");
  await page.keyboard.press("ArrowDown");
  await page.keyboard.press("ArrowDown");
  await expect(options.nth(2)).toHaveAttribute("aria-selected", "true");
  await expect(input).toHaveAttribute("aria-activedescendant", (await options.nth(2).getAttribute("id")) ?? "");
  await page.keyboard.press("Enter");
  await expect(page.locator("html")).toHaveAttribute("data-theme", "dark");

  await page.getByRole("button", { name: /^Search/ }).click();
  await page.getByRole("combobox").fill("nothing matches this");
  await expect(page.getByText(/No matches for/)).toBeVisible();
  await page.keyboard.press("Escape");
  await expect(page.getByRole("dialog")).toHaveCount(0);
});

test("axe passes with the command palette open", async ({ page }) => {
  await page.goto("/");
  await page.getByRole("button", { name: /^Search/ }).click();
  await expect(page.getByRole("combobox")).toBeFocused();
  const results = await new AxeBuilder({ page }).withTags(["wcag2a", "wcag2aa", "wcag21a", "wcag21aa", "wcag22aa"]).analyze();
  expect(results.violations).toEqual([]);
});
