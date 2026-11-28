# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: lab.spec.ts >> axe passes on the research lab in light mode
- Location: tests/lab.spec.ts:35:3

# Error details

```
Error: expect(locator).toBeVisible() failed

Locator: getByRole('img', { name: /Risk–return curve/ })
Expected: visible
Timeout: 5000ms
Error: element(s) not found

Call log:
  - Expect "toBeVisible" getByRole('img', { name: /Risk–return curve/ }) with timeout 5000ms
  - waiting for getByRole('img', { name: /Risk–return curve/ })

```

```yaml
- link "Skip to content":
  - /url: "#main"
- main:
  - region "Research lab":
    - heading "Research lab" [level=1]
    - link "Back to home":
      - /url: /
    - navigation "Lab sections":
      - list:
        - listitem:
          - link "Overview":
            - /url: "#overview"
        - listitem:
          - link "Monte Carlo price paths":
            - /url: "#monte-carlo"
        - listitem:
          - link "Two-asset portfolio risk":
            - /url: "#portfolio-risk"
        - listitem:
          - link "Linear regression":
            - /url: "#regression"
        - listitem:
          - link "Method and limits":
            - /url: "#limits"
    - button "Search"
    - group "Theme":
      - text: Theme
      - radio "System"
      - text: System
      - radio "Light"
      - text: Light
      - radio "Dark"
      - text: Dark
    - paragraph: "Interactive demonstrations of methods used in quantitative research: simulation, portfolio risk, and statistical inference. Change a parameter and the result recomputes in your browser."
    - paragraph: These are educational demonstrations on synthetic data. They show how the methods behave. They are not research findings and not investment advice.
  - region "Monte Carlo price paths":
    - heading "Monte Carlo price paths" [level=2]
    - paragraph: "A Monte Carlo method estimates a quantity by simulating many random outcomes and averaging them. Here each path follows geometric Brownian motion, the textbook model behind Black–Scholes, stepped once per trading day:"
    - paragraph: S(t+Δt) = S(t) · exp((μ − σ²/2)Δt + σ√Δt · Z), Z ~ N(0, 1)
    - paragraph:
      - text: The model has a closed-form mean, E[S
      - subscript: T
      - text: "] = S"
      - subscript: "0"
      - text: e
      - superscript: μT
      - text: ", so the simulation can be checked. The estimate should land within about two standard errors of it, and the error shrinks with the square root of the number of paths."
    - paragraph: Educational demonstration · synthetic data · not research findings or investment advice
    - paragraph: Loading the interactive demonstration…
  - region "Two-asset portfolio risk":
    - heading "Two-asset portfolio risk" [level=2]
    - paragraph: "Mixing two assets changes risk by less than the weighted average whenever they are not perfectly correlated. That gap is diversification:"
    - paragraph: σₚ² = w²σ_A² + (1 − w)²σ_B² + 2w(1 − w)ρσ_Aσ_B
    - paragraph:
      - text: Value at risk (VaR) is the loss exceeded in the worst 5% of years; expected shortfall is the average loss within that 5%. Under normal returns both have formulas, VaR = 1.645σ − μ. The simulation draws correlated normal returns with a Cholesky step, r
      - subscript: B
      - text: = ρz
      - subscript: "1"
      - text: + √(1 − ρ²)z
      - subscript: "2"
      - text: ", and should agree with the formulas. Real returns have fatter tails than this model."
    - paragraph: Educational demonstration · synthetic data · not research findings or investment advice
    - paragraph: Loading the interactive demonstration…
  - region "Linear regression":
    - heading "Linear regression" [level=2]
    - paragraph: "Ordinary least squares picks the line that minimises the sum of squared vertical distances. Because the data come from a known line, you can see how close the estimate gets:"
    - paragraph: β̂ = Σ(x − x̄)(y − ȳ) / Σ(x − x̄)², SE(β̂) = √(σ̂² / Σ(x − x̄)²)
    - paragraph: A 95% confidence interval, β̂ ± 1.96·SE, does not mean a 95% chance that this interval is right. It means the procedure captures the true slope in about 95% of repeated samples. The coverage figure below checks that on 200 fresh samples.
    - paragraph: Educational demonstration · synthetic data · not research findings or investment advice
    - paragraph: Loading the interactive demonstration…
  - region "Method and limits":
    - heading "Method and limits" [level=2]
    - list:
      - listitem: Every number on this page comes from generated data with a visible seed. None of it describes a real asset, market, or study, and none of it is investment advice.
      - listitem: Randomness comes from a seeded mulberry32 generator with Box–Muller normals. The same seed and settings always give the same result.
      - listitem: Returns are modelled as normal. Real returns are skewed and fat-tailed, so these VaR figures understate real tail risk.
      - listitem: Regression intervals use the normal critical value 1.96, a close approximation to the t distribution for n ≥ 30, which is why the slider starts at 30.
      - listitem:
        - text: The calculations run in your browser and are covered by unit tests in
        - code: lib/lab/
        - text: ", including the closed-form checks and the 95% coverage property."
- contentinfo:
  - paragraph:
    - link "rohinpidathala15@gmail.com":
      - /url: mailto:rohinpidathala15@gmail.com
  - navigation "Footer":
    - list:
      - listitem:
        - link "Work":
          - /url: /#work
      - listitem:
        - link "Research lab":
          - /url: /lab
      - listitem:
        - link "GitHub (opens in new tab)":
          - /url: https://github.com/RohinCodes15
      - listitem:
        - link "LinkedIn (opens in new tab)":
          - /url: https://www.linkedin.com/in/rohin-pidathala-53002842b/
      - listitem:
        - link "Back to top":
          - /url: "#main"
  - paragraph: Rohin Pidathala
```

# Test source

```ts
  1  | import AxeBuilder from "@axe-core/playwright";
  2  | import { expect, test } from "@playwright/test";
  3  | 
  4  | test("the research lab labels its demos and recomputes when a parameter changes", async ({ page }) => {
  5  |   const errors: string[] = [];
  6  |   page.on("pageerror", (error) => errors.push(error.message));
  7  |   page.on("console", (message) => { if (message.type() === "error") errors.push(message.text()); });
  8  | 
  9  |   await page.goto("/");
  10 |   await page.getByRole("link", { name: "Open the research lab" }).click();
  11 |   await expect(page).toHaveURL(/\/lab$/);
  12 |   await expect(page.getByRole("heading", { level: 1 })).toHaveText("Research lab");
  13 |   await expect(page.getByText(/not research findings or investment advice/)).toHaveCount(3);
  14 | 
  15 |   const monteCarlo = page.getByRole("region", { name: "Monte Carlo price paths" });
  16 |   // The readout animates; its screen-reader text is the settled value.
  17 |   const analytic = monteCarlo.getByText("analytic mean S₀e^(μT)").locator("..").locator("dd").first().locator(".sr-only");
  18 |   await expect(analytic).toHaveText("107.25");
  19 |   const drift = monteCarlo.getByRole("slider", { name: "Drift μ (annual)" });
  20 |   await drift.focus();
  21 |   await page.keyboard.press("ArrowRight");
  22 |   await expect(drift).toHaveAttribute("aria-valuetext", "8%");
  23 |   await expect(analytic).toHaveText("108.33");
  24 | 
  25 |   const regression = page.getByRole("region", { name: "Linear regression" });
  26 |   const seed = regression.getByText(/^seed \d+$/);
  27 |   await expect(seed).toHaveText("seed 1");
  28 |   await regression.getByRole("button", { name: "New sample" }).click();
  29 |   await expect(seed).toHaveText("seed 2");
  30 |   await expect(page.getByRole("img", { name: /Scatter plot with fitted slope/ })).toBeVisible();
  31 |   expect(errors).toEqual([]);
  32 | });
  33 | 
  34 | for (const colorScheme of ["light", "dark"] as const) {
  35 |   test(`axe passes on the research lab in ${colorScheme} mode`, async ({ page }) => {
  36 |     await page.emulateMedia({ colorScheme });
  37 |     await page.goto("/lab");
> 38 |     await expect(page.getByRole("img", { name: /Risk–return curve/ })).toBeVisible();
     |                                                                        ^ Error: expect(locator).toBeVisible() failed
  39 |     const results = await new AxeBuilder({ page }).withTags(["wcag2a", "wcag2aa", "wcag21a", "wcag21aa", "wcag22aa"]).analyze();
  40 |     expect(results.violations).toEqual([]);
  41 |   });
  42 | }
  43 | 
  44 | test("charts never paint wider than the page and keep distinct axis labels at extreme settings", async ({ page }) => {
  45 |   // Track the widest the document gets from the first frame, before ResizeObserver could correct a fallback width.
  46 |   await page.addInitScript(() => {
  47 |     const record = () => {
  48 |       const w = window as Window & { widest?: number };
  49 |       w.widest = Math.max(w.widest ?? 0, document.documentElement.scrollWidth);
  50 |       requestAnimationFrame(record);
  51 |     };
  52 |     requestAnimationFrame(record);
  53 |   });
  54 |   await page.goto("/lab");
  55 |   const monteCarlo = page.getByRole("region", { name: "Monte Carlo price paths" });
  56 |   const volatility = monteCarlo.getByRole("slider", { name: "Volatility σ (annual)" });
  57 |   await volatility.fill("0");
  58 |   const histogram = monteCarlo.locator("figure svg").nth(1);
  59 |   await expect(histogram).toHaveAttribute("aria-label", /5th percentile 107\.25, median 107\.25/);
  60 |   const labels = await histogram.locator(":scope > text").allTextContents();
  61 |   const ticks = labels.filter((text) => /^[\d.]+$/.test(text));
  62 |   expect(ticks.length).toBeGreaterThan(1);
  63 |   expect(new Set(ticks).size).toBe(ticks.length);
  64 |   const widths = await page.evaluate(() => [(window as Window & { widest?: number }).widest, document.documentElement.clientWidth]);
  65 |   expect(widths[0] ?? Infinity).toBeLessThanOrEqual(widths[1] ?? 0);
  66 | });
  67 | 
```