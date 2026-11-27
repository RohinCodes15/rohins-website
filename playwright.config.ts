import { defineConfig, devices } from "@playwright/test";

const port = 3100;
export const devPort = 3000;

export default defineConfig({
  testDir: "./tests",
  forbidOnly: !!process.env.CI,
  reporter: process.env.CI ? [["list"], ["html", { open: "never" }]] : "list",
  use: { baseURL: `http://127.0.0.1:${port}`, trace: "retain-on-failure" },
  projects: [
    { name: "desktop", use: { ...devices["Desktop Chrome"] } },
    { name: "mobile", use: { ...devices["Pixel 7"], defaultBrowserType: "chromium" } },
  ],
  webServer: [
    {
      command: `npm run start -- --hostname 127.0.0.1 --port ${port}`,
      url: `http://127.0.0.1:${port}`,
      // Blank, so a token in .env.local never reaches GitHub from the suite: activity is always the unavailable state.
      env: { GITHUB_CONTRIBUTIONS_TOKEN: "" },
    },
    {
      // The development showcase renders the activity view from labelled synthetic responses (tests/activity-states.spec.ts).
      command: `npx next dev --hostname 127.0.0.1 --port ${devPort}`,
      url: `http://127.0.0.1:${devPort}/showcase`,
      env: { GITHUB_CONTRIBUTIONS_TOKEN: "" },
      timeout: 120_000,
      // Next.js allows one dev server per project, so a developer's running one on this port is reused outside CI.
      reuseExistingServer: !process.env.CI,
    },
  ],
});
