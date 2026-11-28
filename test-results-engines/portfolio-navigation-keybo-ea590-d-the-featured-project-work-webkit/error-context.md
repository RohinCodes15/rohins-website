# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: portfolio.spec.ts >> navigation, keyboard filters, and the featured project work
- Location: tests/portfolio.spec.ts:16:1

# Error details

```
Error: expect(page).toHaveURL(expected) failed

Expected pattern: /#stack$/
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
> 22  |   await expect(page).toHaveURL(/#stack$/);
      |                      ^ Error: expect(page).toHaveURL(expected) failed
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
  70  |   await context.grantPermissions(["clipboard-read", "clipboard-write"]);
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