# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: lab.spec.ts >> charts never paint wider than the page and keep distinct axis labels at extreme settings
- Location: tests/lab.spec.ts:44:1

# Error details

```
Test timeout of 30000ms exceeded.
```

```
Error: locator.fill: Test timeout of 30000ms exceeded.
Call log:
  - waiting for getByRole('region', { name: 'Monte Carlo price paths' }).getByRole('slider', { name: 'Volatility σ (annual)' })

```

# Page snapshot

```yaml
- generic [active] [ref=e1]:
  - link "Skip to content" [ref=e2]:
    - /url: "#main"
  - main [ref=e3]:
    - region "Research lab" [ref=e4]:
      - generic [ref=e5]:
        - heading "Research lab" [level=1] [ref=e6]
        - generic [ref=e7]:
          - link "Back to home" [ref=e8]:
            - /url: /
          - navigation "Lab sections" [ref=e9]:
            - list [ref=e10]:
              - listitem [ref=e11]:
                - link [ref=e12]:
                  - /url: "#overview"
                  - generic [ref=e13]:
                    - text: Overview
                    - generic [ref=e15]: Overview
              - listitem [ref=e16]:
                - link [ref=e17]:
                  - /url: "#monte-carlo"
                  - generic [ref=e18]:
                    - text: Monte Carlo price paths
                    - generic [ref=e20]: Monte
                    - generic [ref=e22]: Carlo
                    - generic [ref=e24]: price
                    - generic [ref=e26]: paths
              - listitem [ref=e27]:
                - link [ref=e28]:
                  - /url: "#portfolio-risk"
                  - generic [ref=e29]:
                    - text: Two-asset portfolio risk
                    - generic [ref=e31]: Two-asset
                    - generic [ref=e33]: portfolio
                    - generic [ref=e35]: risk
              - listitem [ref=e36]:
                - link [ref=e37]:
                  - /url: "#regression"
                  - generic [ref=e38]:
                    - text: Linear regression
                    - generic [ref=e40]: Linear
                    - generic [ref=e42]: regression
              - listitem [ref=e43]:
                - link [ref=e44]:
                  - /url: "#limits"
                  - generic [ref=e45]:
                    - text: Method and limits
                    - generic [ref=e47]: Method
                    - generic [ref=e49]: and
                    - generic [ref=e51]: limits
          - generic [ref=e52]:
            - button "Search" [ref=e53]
            - group "Theme" [ref=e54]:
              - generic [ref=e56]:
                - generic [ref=e57]:
                  - radio "System" [ref=e58]
                  - text: System
                - generic [ref=e59]:
                  - radio "Light" [ref=e60]
                  - text: Light
                - generic [ref=e61]:
                  - radio "Dark" [ref=e62]
                  - text: Dark
        - generic [ref=e63]:
          - paragraph [ref=e64]: "Interactive demonstrations of methods used in quantitative research: simulation, portfolio risk, and statistical inference. Change a parameter and the result recomputes in your browser."
          - paragraph [ref=e65]: These are educational demonstrations on synthetic data. They show how the methods behave. They are not research findings and not investment advice.
    - region "Monte Carlo price paths" [ref=e66]:
      - generic [ref=e69]:
        - text: "01"
        - heading "Monte Carlo price paths" [level=2] [ref=e70]
      - generic [ref=e71]:
        - generic [ref=e72]:
          - paragraph [ref=e73]: "A Monte Carlo method estimates a quantity by simulating many random outcomes and averaging them. Here each path follows geometric Brownian motion, the textbook model behind Black–Scholes, stepped once per trading day:"
          - paragraph [ref=e74]: S(t+Δt) = S(t) · exp((μ − σ²/2)Δt + σ√Δt · Z), Z ~ N(0, 1)
          - paragraph [ref=e75]:
            - text: The model has a closed-form mean, E[S
            - subscript [ref=e76]: T
            - text: "] = S"
            - subscript [ref=e77]: "0"
            - text: e
            - superscript [ref=e78]: μT
            - text: ", so the simulation can be checked. The estimate should land within about two standard errors of it, and the error shrinks with the square root of the number of paths."
        - generic [ref=e80]:
          - paragraph [ref=e81]: Educational demonstration · synthetic data · not research findings or investment advice
          - paragraph [ref=e82]: Loading the interactive demonstration…
    - region "Two-asset portfolio risk" [ref=e83]:
      - generic [ref=e86]:
        - text: "02"
        - heading "Two-asset portfolio risk" [level=2] [ref=e87]
      - generic [ref=e88]:
        - generic [ref=e89]:
          - paragraph [ref=e90]: "Mixing two assets changes risk by less than the weighted average whenever they are not perfectly correlated. That gap is diversification:"
          - paragraph [ref=e91]: σₚ² = w²σ_A² + (1 − w)²σ_B² + 2w(1 − w)ρσ_Aσ_B
          - paragraph [ref=e92]:
            - text: Value at risk (VaR) is the loss exceeded in the worst 5% of years; expected shortfall is the average loss within that 5%. Under normal returns both have formulas, VaR = 1.645σ − μ. The simulation draws correlated normal returns with a Cholesky step, r
            - subscript [ref=e93]: B
            - text: = ρz
            - subscript [ref=e94]: "1"
            - text: + √(1 − ρ²)z
            - subscript [ref=e95]: "2"
            - text: ", and should agree with the formulas. Real returns have fatter tails than this model."
        - generic [ref=e97]:
          - paragraph [ref=e98]: Educational demonstration · synthetic data · not research findings or investment advice
          - paragraph [ref=e99]: Loading the interactive demonstration…
    - region "Linear regression" [ref=e100]:
      - generic [ref=e103]:
        - text: "03"
        - heading "Linear regression" [level=2] [ref=e104]
      - generic [ref=e105]:
        - generic [ref=e106]:
          - paragraph [ref=e107]: "Ordinary least squares picks the line that minimises the sum of squared vertical distances. Because the data come from a known line, you can see how close the estimate gets:"
          - paragraph [ref=e108]: β̂ = Σ(x − x̄)(y − ȳ) / Σ(x − x̄)², SE(β̂) = √(σ̂² / Σ(x − x̄)²)
          - paragraph [ref=e109]: A 95% confidence interval, β̂ ± 1.96·SE, does not mean a 95% chance that this interval is right. It means the procedure captures the true slope in about 95% of repeated samples. The coverage figure below checks that on 200 fresh samples.
        - generic [ref=e111]:
          - paragraph [ref=e112]: Educational demonstration · synthetic data · not research findings or investment advice
          - paragraph [ref=e113]: Loading the interactive demonstration…
    - region "Method and limits" [ref=e114]:
      - generic [ref=e117]:
        - text: "04"
        - heading "Method and limits" [level=2] [ref=e118]
      - list [ref=e120]:
        - listitem [ref=e121]: Every number on this page comes from generated data with a visible seed. None of it describes a real asset, market, or study, and none of it is investment advice.
        - listitem [ref=e122]: Randomness comes from a seeded mulberry32 generator with Box–Muller normals. The same seed and settings always give the same result.
        - listitem [ref=e123]: Returns are modelled as normal. Real returns are skewed and fat-tailed, so these VaR figures understate real tail risk.
        - listitem [ref=e124]: Regression intervals use the normal critical value 1.96, a close approximation to the t distribution for n ≥ 30, which is why the slider starts at 30.
        - listitem [ref=e125]:
          - text: The calculations run in your browser and are covered by unit tests in
          - code [ref=e126]: lib/lab/
          - text: ", including the closed-form checks and the 95% coverage property."
    - progressbar [aria-hidden] [ref=e127]:
      - tooltip [ref=e131]: 0% read
      - text: Drag to move it, or use the arrow keys. Home puts it back in the corner.
  - contentinfo [ref=e132]:
    - generic [ref=e133]:
      - paragraph [ref=e134]:
        - link [ref=e135]:
          - /url: mailto:rohinpidathala15@gmail.com
          - generic [ref=e136]:
            - text: rohinpidathala15@gmail.com
            - generic [ref=e138]: rohinpidathala15@gmail.com
      - navigation "Footer" [ref=e139]:
        - list [ref=e140]:
          - listitem [ref=e141]:
            - link [ref=e142]:
              - /url: /#work
              - generic [ref=e143]:
                - text: Work
                - generic [ref=e145]: Work
          - listitem [ref=e146]:
            - link [ref=e147]:
              - /url: /lab
              - generic [ref=e148]:
                - text: Research lab
                - generic [ref=e150]: Research
                - generic [ref=e152]: lab
          - listitem [ref=e153]:
            - link [ref=e154]:
              - /url: https://github.com/RohinCodes15
              - generic [ref=e155]:
                - text: GitHub
                - generic [ref=e157]: GitHub
              - text: (opens in new tab)
          - listitem [ref=e160]:
            - link [ref=e161]:
              - /url: https://www.linkedin.com/in/rohin-pidathala-53002842b/
              - generic [ref=e162]:
                - text: LinkedIn
                - generic [ref=e164]: LinkedIn
              - text: (opens in new tab)
          - listitem [ref=e167]:
            - link [ref=e168]:
              - /url: "#main"
              - generic [ref=e169]:
                - text: Back to top
                - generic [ref=e171]: Back
                - generic [ref=e173]: to
                - generic [ref=e175]: top
      - paragraph [ref=e176]: Rohin Pidathala
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
  38 |     await expect(page.getByRole("img", { name: /Risk–return curve/ })).toBeVisible();
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
> 57 |   await volatility.fill("0");
     |                    ^ Error: locator.fill: Test timeout of 30000ms exceeded.
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