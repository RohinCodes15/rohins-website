# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: lab.spec.ts >> the research lab labels its demos and recomputes when a parameter changes
- Location: tests/lab.spec.ts:4:1

# Error details

```
Error: expect(page).toHaveURL(expected) failed

Expected pattern: /\/lab$/
Received string:  "http://127.0.0.1:3100/"
Timeout: 5000ms

Call log:
  - Expect "toHaveURL" with timeout 5000ms
    13 × locator resolved to <html lang="en" data-theme="system" class="OYML8q_variable UE9Gwa_variable">…</html>
       - unexpected value "http://127.0.0.1:3100/"

```

```yaml
- link "Skip to content":
  - /url: "#main"
- main:
  - region "Rohin Pidathala":
    - heading "Rohin Pidathala" [level=1]
    - navigation "Portfolio sections":
      - list:
        - listitem:
          - link "Overview":
            - /url: "#intro"
        - listitem:
          - link "Selected work":
            - /url: "#work"
        - listitem:
          - link "A Closer Look":
            - /url: "#closer-look"
        - listitem:
          - link "Tech Stack":
            - /url: "#stack"
        - listitem:
          - link "Research and interests":
            - /url: "#research"
        - listitem:
          - link "Activity":
            - /url: "#activity"
        - listitem:
          - link "Contact":
            - /url: "#contact"
    - button "Search"
    - group "Theme":
      - text: Theme
      - radio "System"
      - text: System
      - radio "Light"
      - text: Light
      - radio "Dark"
      - text: Dark
    - paragraph: Software Developer · AI Engineer · Quantitative Researcher
    - paragraph: Programming since age 10
    - paragraph: I build software and explore how AI systems and quantitative methods can answer practical questions.
    - paragraph:
      - link "Email":
        - /url: mailto:rohinpidathala15@gmail.com
      - link "GitHub (opens in new tab)":
        - /url: https://github.com/RohinCodes15
      - link "LinkedIn (opens in new tab)":
        - /url: https://www.linkedin.com/in/rohin-pidathala-53002842b/
  - region "Selected work":
    - heading "Selected work" [level=2]
    - list:
      - listitem:
        - article:
          - heading "AccessForge AI" [level=3]:
            - link "AccessForge AI":
              - /url: /work/accessforge
          - time: "2026"
          - paragraph: Maps pedestrian accessibility barriers and chooses the set of sidewalk repairs that opens the most accessible routes within a budget.
          - paragraph: In development · Personal project · Next.js · TypeScript · Python · FastAPI · PostgreSQL · PostGIS · NetworkX · MapLibre GL JS · Playwright
          - 'img "AccessForge overview: the headline “Fix the barriers that reconnect the most routes” beside a 3D map of Fremont and counts of places people travel to."'
      - listitem:
        - article:
          - heading "RiskLens Quant" [level=3]:
            - link "RiskLens Quant":
              - /url: /work/risklens
          - time: "2026"
          - paragraph: "A portfolio risk analyzer: enter holdings and see historical return, volatility, drawdown, VaR and CVaR, Monte Carlo scenarios, stress tests, and optimized allocations."
          - paragraph: Completed · Personal project · Python · Streamlit · pandas · NumPy · SciPy · Plotly
          - 'img "RiskLens Monte Carlo chart: a year of hypothetical portfolio wealth paths with the median and 25th–75th and 5th–95th percentile bands."'
      - listitem:
        - article:
          - heading "Ledger" [level=3]:
            - link "Ledger":
              - /url: /work/ledger
          - time: "2026"
          - paragraph: "A desktop game that teaches kids and teens how the stock market works with $1,000 of pretend cash: a simulated market, 35 lessons, a scam-spotting game, and trading-bot duels."
          - paragraph: Completed · Personal project · Python · Pygame
          - 'img "Ledger home screen: a $1,017.94 pretend portfolio, today''s mission, and the watchlist."'
      - listitem:
        - article:
          - heading "Rotation Index" [level=3]:
            - link "Rotation Index":
              - /url: /work/rotation-index
          - time: "2026"
          - paragraph: Estimates NBA player impact with regularized adjusted plus-minus, fitted on possession-level play-by-play so each player is credited relative to teammates and opponents.
          - paragraph: In development · Personal project · Python · Flask · pandas · NumPy
          - paragraph: The data pipeline, audit gate, and local dashboard work. Season estimates stay hidden until every one of the 1,230 games in the 2025–26 regular season validates.
      - listitem:
        - article:
          - heading "Developer portfolio" [level=3]:
            - link "Developer portfolio":
              - /url: /work/portfolio
          - time: "2026"
          - paragraph: An editorial portfolio with a server-rendered GitHub activity calendar and an optional interactive terrain.
          - paragraph: In development · Personal project · Next.js · React · TypeScript · Tailwind CSS · Motion · Playwright
          - 'img "Portfolio homepage in the dark theme: the name Rohin Pidathala, the role line, contact links, the section rail, and the three identity lines Software Developer, AI Engineer, and Quantitative Research."'
  - region "A Closer Look":
    - heading "A Closer Look" [level=2]
    - paragraph: Exploring the interfaces, systems, and ideas behind my work.
    - 'link "AccessForge overview: the headline “Fix the barriers that reconnect the most routes” beside a 3D map of Fremont and counts of places people travel to.AccessForge AI"':
      - /url: /work/accessforge
      - 'img "AccessForge overview: the headline “Fix the barriers that reconnect the most routes” beside a 3D map of Fremont and counts of places people travel to."'
      - text: AccessForge AI
    - link "RiskLens histogram of historical daily portfolio returns with the 95% value-at-risk cutoff marked.RiskLens Quant":
      - /url: /work/risklens
      - img "RiskLens histogram of historical daily portfolio returns with the 95% value-at-risk cutoff marked."
      - text: RiskLens Quant
    - 'link "Market screen: the market mood, the top gainer and loser, and a stock list with price charts.Ledger"':
      - /url: /work/ledger
      - 'img "Market screen: the market mood, the top gainer and loser, and a stock list with price charts."'
      - text: Ledger
    - 'link "Portfolio screen: net worth, cash, invested amount and dividends, a wealth milestone, and a portfolio health grade.Ledger"':
      - /url: /work/ledger
      - 'img "Portfolio screen: net worth, cash, invested amount and dividends, a wealth milestone, and a portfolio health grade."'
      - text: Ledger
    - 'link "Ledger home screen: a $1,017.94 pretend portfolio, today''s mission, and the watchlist.Ledger"':
      - /url: /work/ledger
      - 'img "Ledger home screen: a $1,017.94 pretend portfolio, today''s mission, and the watchlist."'
      - text: Ledger
    - 'link "RiskLens efficient frontier: expected return against volatility, marking the current, minimum-volatility, and maximum-Sharpe portfolios.RiskLens Quant"':
      - /url: /work/risklens
      - 'img "RiskLens efficient frontier: expected return against volatility, marking the current, minimum-volatility, and maximum-Sharpe portfolios."'
      - text: RiskLens Quant
    - 'link "AccessForge repair planner story: a wheelchair user’s short trip to Washington Hospital blocked by a raised curb.AccessForge AI"':
      - /url: /work/accessforge
      - 'img "AccessForge repair planner story: a wheelchair user’s short trip to Washington Hospital blocked by a raised curb."'
      - text: AccessForge AI
    - link "RiskLens chart comparing the portfolio’s cumulative return with the S&P 500 (SPY) over the same dates.RiskLens Quant":
      - /url: /work/risklens
      - img "RiskLens chart comparing the portfolio’s cumulative return with the S&P 500 (SPY) over the same dates."
      - text: RiskLens Quant
    - 'link "Bot battle setup: how to win, a scouting report on the rival bot, and a choice of 60 or 90 second rounds.Ledger"':
      - /url: /work/ledger
      - 'img "Bot battle setup: how to win, a scouting report on the rival bot, and a choice of 60 or 90 second rounds."'
      - text: Ledger
    - 'link "RiskLens Monte Carlo chart: a year of hypothetical portfolio wealth paths with the median and 25th–75th and 5th–95th percentile bands.RiskLens Quant"':
      - /url: /work/risklens
      - 'img "RiskLens Monte Carlo chart: a year of hypothetical portfolio wealth paths with the median and 25th–75th and 5th–95th percentile bands."'
      - text: RiskLens Quant
    - 'link "AccessForge barrier map: Fremont streets and buildings in 3D, destinations shaded by type, with a barrier details panel.AccessForge AI"':
      - /url: /work/accessforge
      - 'img "AccessForge barrier map: Fremont streets and buildings in 3D, destinations shaded by type, with a barrier details panel."'
      - text: AccessForge AI
    - 'link "Scam Detective: a giveaway message asking for a home address and card number, with Scam and Legit buttons.Ledger"':
      - /url: /work/ledger
      - 'img "Scam Detective: a giveaway message asking for a home address and card number, with Scam and Legit buttons."'
      - text: Ledger
    - 'link "RiskLens drawdown chart: how far the portfolio sat below its previous peak on each day, reaching about −20%.RiskLens Quant"':
      - /url: /work/risklens
      - 'img "RiskLens drawdown chart: how far the portfolio sat below its previous peak on each day, reaching about −20%."'
      - text: RiskLens Quant
    - 'link "A lesson card from Making a budget: a budget is a plan for your money before you spend it.Ledger"':
      - /url: /work/ledger
      - 'img "A lesson card from Making a budget: a budget is a plan for your money before you spend it."'
      - text: Ledger
  - region "Tech Stack":
    - heading "Tech Stack" [level=2]
    - paragraph: The technologies behind my ideas.
    - list "Featured technologies":
      - listitem:
        - link "Python Used in AccessForge AI, RiskLens Quant, Ledger, Rotation Index":
          - /url: /work/accessforge
      - listitem:
        - link "TypeScript Used in AccessForge AI, Developer portfolio":
          - /url: /work/accessforge
      - listitem:
        - link "React Used in Developer portfolio":
          - /url: /work/portfolio
      - listitem:
        - link "Next.js Used in AccessForge AI, Developer portfolio":
          - /url: /work/accessforge
      - listitem: C++
      - listitem: PyTorch
      - listitem:
        - link "PostgreSQL Used in AccessForge AI":
          - /url: /work/accessforge
      - listitem:
        - link "GitHub":
          - /url: https://github.com/RohinCodes15
      - listitem:
        - link "FastAPI Used in AccessForge AI":
          - /url: /work/accessforge
    - group "Filter technologies":
      - button "All" [pressed]
      - button "Languages"
      - button "Frameworks"
      - button "Data"
      - button "AI and quant"
      - button "Tools"
    - status: 44 technologies shown
    - list:
      - listitem:
        - text: PythonUsed in
        - link "AccessForge AI":
          - /url: /work/accessforge
        - text: ","
        - link "RiskLens Quant":
          - /url: /work/risklens
        - text: ","
        - link "Ledger":
          - /url: /work/ledger
        - text: ","
        - link "Rotation Index":
          - /url: /work/rotation-index
        - text: Languages
      - listitem: JavaScriptLanguages
      - listitem: C++Languages
      - listitem: CSSLanguages
      - listitem: HTMLLanguages
      - listitem:
        - text: TypeScriptUsed in
        - link "AccessForge AI":
          - /url: /work/accessforge
        - text: ","
        - link "Developer portfolio":
          - /url: /work/portfolio
        - text: Languages
      - listitem: JavaLanguages
      - listitem: ExpoFrameworks
      - listitem:
        - text: MotionUsed in
        - link "Developer portfolio":
          - /url: /work/portfolio
        - text: Frameworks
      - listitem:
        - text: Next.jsUsed in
        - link "AccessForge AI":
          - /url: /work/accessforge
        - text: ","
        - link "Developer portfolio":
          - /url: /work/portfolio
        - text: Frameworks
      - listitem: React NativeFrameworks
      - listitem:
        - text: ReactUsed in
        - link "Developer portfolio":
          - /url: /work/portfolio
        - text: Frameworks
      - listitem:
        - text: FastAPIUsed in
        - link "AccessForge AI":
          - /url: /work/accessforge
        - text: Frameworks
      - listitem: Node.jsFrameworks
      - listitem:
        - text: Tailwind CSSUsed in
        - link "Developer portfolio":
          - /url: /work/portfolio
        - text: Frameworks
      - listitem:
        - text: FlaskUsed in
        - link "Rotation Index":
          - /url: /work/rotation-index
        - text: Frameworks
      - listitem:
        - text: StreamlitUsed in
        - link "RiskLens Quant":
          - /url: /work/risklens
        - text: Frameworks
      - listitem:
        - text: MapLibre GL JSUsed in
        - link "AccessForge AI":
          - /url: /work/accessforge
        - text: Frameworks
      - listitem:
        - text: PlotlyUsed in
        - link "RiskLens Quant":
          - /url: /work/risklens
        - text: Frameworks
      - listitem:
        - text: PygameUsed in
        - link "Ledger":
          - /url: /work/ledger
        - text: Frameworks
      - listitem: MongoDBData
      - listitem: SupabaseData
      - listitem:
        - text: PostgreSQLUsed in
        - link "AccessForge AI":
          - /url: /work/accessforge
        - text: Data
      - listitem:
        - text: PostGISUsed in
        - link "AccessForge AI":
          - /url: /work/accessforge
        - text: Data
      - listitem:
        - text: pandasUsed in
        - link "RiskLens Quant":
          - /url: /work/risklens
        - text: ","
        - link "Rotation Index":
          - /url: /work/rotation-index
        - text: AI and quant
      - listitem: PyTorchAI and quant
      - listitem: Claude APIAI and quant
      - listitem: Hugging FaceAI and quant
      - listitem: Monte Carlo simulationAI and quant
      - listitem: Statistical modelingAI and quant
      - listitem: OpenAI APIAI and quant
      - listitem: scikit-learnAI and quant
      - listitem:
        - text: NumPyUsed in
        - link "RiskLens Quant":
          - /url: /work/risklens
        - text: ","
        - link "Rotation Index":
          - /url: /work/rotation-index
        - text: AI and quant
      - listitem:
        - text: SciPyUsed in
        - link "RiskLens Quant":
          - /url: /work/risklens
        - text: AI and quant
      - listitem:
        - text: NetworkXUsed in
        - link "AccessForge AI":
          - /url: /work/accessforge
        - text: AI and quant
      - listitem: GitTools
      - listitem: GitHub ActionsTools
      - listitem: VercelTools
      - listitem: Google CloudTools
      - listitem: FigmaTools
      - listitem: VS CodeTools
      - listitem: GitHubTools
      - listitem: ArduinoTools
      - listitem:
        - text: PlaywrightUsed in
        - link "AccessForge AI":
          - /url: /work/accessforge
        - text: ","
        - link "Developer portfolio":
          - /url: /work/portfolio
        - text: Tools
  - region "Research and interests":
    - heading "Research and interests" [level=2]
    - term: Software development
    - definition: Accessible interfaces and reliable software systems.
    - term: AI engineering
    - definition: Building with models and evaluating how they behave.
    - term: Quantitative research
    - definition: Using data and reproducible experiments to investigate questions.
    - paragraph:
      - link "Open the research lab":
        - /url: /lab
      - text: · interactive educational demonstrations on synthetic data
  - region "Activity":
    - heading "Activity" [level=2]
    - figure "Fig. 1 · GitHub contributions":
      - paragraph: GitHub activity unavailable
      - paragraph:
        - link "View profile on GitHub (opens in new tab)":
          - /url: https://github.com/RohinCodes15
      - text: Fig. 1 · GitHub contributions
  - region "Contact":
    - heading "Contact" [level=2]
    - link "rohinpidathala15@gmail.com":
      - /url: mailto:rohinpidathala15@gmail.com
    - button "Copy email"
    - list:
      - listitem:
        - link "GitHub (opens in new tab)":
          - /url: https://github.com/RohinCodes15
      - listitem:
        - link "LinkedIn (opens in new tab)":
          - /url: https://www.linkedin.com/in/rohin-pidathala-53002842b/
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
> 11 |   await expect(page).toHaveURL(/\/lab$/);
     |                      ^ Error: expect(page).toHaveURL(expected) failed
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