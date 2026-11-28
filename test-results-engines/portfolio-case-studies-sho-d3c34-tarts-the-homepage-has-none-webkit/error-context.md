# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: portfolio.spec.ts >> case studies show reading progress once reading starts; the homepage has none
- Location: tests/portfolio.spec.ts:106:1

# Error details

```
Error: expect(locator).toHaveAttribute(expected) failed

Locator:  locator('.reading-progress')
Expected: "100"
Received: "0"
Timeout:  5000ms

Call log:
  - Expect "toHaveAttribute" locator('.reading-progress') with timeout 5000ms
  - waiting for locator('.reading-progress')
    14 × locator resolved to <div tabindex="-1" aria-valuemin="0" aria-valuenow="0" role="progressbar" aria-hidden="true" data-shown="false" aria-valuemax="100" data-dragging="false" aria-valuetext="0% read" class="reading-progress" aria-label="Reading progress" aria-describedby="_R_1pbsnpfdb_">…</div>
       - unexpected value "0"

```

# Page snapshot

```yaml
- generic [active] [ref=f1e1]:
  - link "Skip to content" [ref=f1e2]:
    - /url: "#main"
  - main [ref=f1e3]:
    - region "AccessForge AI" [ref=f1e4]:
      - generic [ref=f1e5]:
        - heading "AccessForge AI" [level=1] [ref=f1e6]
        - generic [ref=f1e7]:
          - link [ref=f1e8]:
            - /url: /#work
            - generic [ref=f1e9]:
              - text: Back to selected work
              - generic [ref=f1e11]: Back
              - generic [ref=f1e13]: to
              - generic [ref=f1e15]: selected
              - generic [ref=f1e17]: work
          - navigation "Case study sections" [ref=f1e18]:
            - list [ref=f1e19]:
              - listitem [ref=f1e20]:
                - link [ref=f1e21]:
                  - /url: "#overview"
                  - generic [ref=f1e22]:
                    - text: Overview
                    - generic [ref=f1e24]: Overview
              - listitem [ref=f1e25]:
                - link [ref=f1e26]:
                  - /url: "#problem"
                  - generic [ref=f1e27]:
                    - text: Problem
                    - generic [ref=f1e29]: Problem
              - listitem [ref=f1e30]:
                - link [ref=f1e31]:
                  - /url: "#solution"
                  - generic [ref=f1e32]:
                    - text: Solution
                    - generic [ref=f1e34]: Solution
              - listitem [ref=f1e35]:
                - link [ref=f1e36]:
                  - /url: "#architecture"
                  - generic [ref=f1e37]:
                    - text: Architecture
                    - generic [ref=f1e39]: Architecture
              - listitem [ref=f1e40]:
                - link [ref=f1e41]:
                  - /url: "#complexity"
                  - generic [ref=f1e42]:
                    - text: Technical complexity
                    - generic [ref=f1e44]: Technical
                    - generic [ref=f1e46]: complexity
              - listitem [ref=f1e47]:
                - link [ref=f1e48]:
                  - /url: "#decisions"
                  - generic [ref=f1e49]:
                    - text: Engineering decisions
                    - generic [ref=f1e51]: Engineering
                    - generic [ref=f1e53]: decisions
              - listitem [ref=f1e54]:
                - link [ref=f1e55]:
                  - /url: "#outcomes"
                  - generic [ref=f1e56]:
                    - text: Verified outcomes
                    - generic [ref=f1e58]: Verified
                    - generic [ref=f1e60]: outcomes
          - generic [ref=f1e61]:
            - button "Search" [ref=f1e62]
            - group "Theme" [ref=f1e63]:
              - generic [ref=f1e65]:
                - generic [ref=f1e66]:
                  - radio "System" [ref=f1e67]
                  - text: System
                - generic [ref=f1e68]:
                  - radio "Light" [ref=f1e69]
                  - text: Light
                - generic [ref=f1e70]:
                  - radio "Dark" [ref=f1e71]
                  - text: Dark
        - generic [ref=f1e72]:
          - paragraph [ref=f1e73]: Maps pedestrian accessibility barriers and chooses the set of sidewalk repairs that opens the most accessible routes within a budget.
          - paragraph [ref=f1e74]: Reporting, review, and the repair planner work locally. There is no community pilot or real-world outcome yet, and real repair costs, photos, and equity-targeted planning are not built.
        - generic [ref=f1e75]:
          - generic [ref=f1e76]:
            - term [ref=f1e77]: Status
            - definition [ref=f1e78]:
              - generic [ref=f1e79]: In development
          - generic [ref=f1e80]:
            - term [ref=f1e81]: Role
            - definition [ref=f1e82]: Personal project
          - generic [ref=f1e83]:
            - term [ref=f1e84]: Year
            - definition [ref=f1e85]:
              - time [ref=f1e86]: "2026"
          - generic [ref=f1e87]:
            - term [ref=f1e88]: Stack
            - definition [ref=f1e89]:
              - list [ref=f1e90]:
                - listitem [ref=f1e91]: Next.js
                - listitem [ref=f1e92]: TypeScript
                - listitem [ref=f1e93]: Python
                - listitem [ref=f1e94]: FastAPI
                - listitem [ref=f1e95]: PostgreSQL
                - listitem [ref=f1e96]: PostGIS
                - listitem [ref=f1e97]: NetworkX
                - listitem [ref=f1e98]: MapLibre GL JS
                - listitem [ref=f1e99]: Playwright
          - generic [ref=f1e100]:
            - term [ref=f1e101]: Links
            - definition [ref=f1e102]:
              - list [ref=f1e103]:
                - listitem [ref=f1e104]:
                  - link [ref=f1e105]:
                    - /url: https://github.com/RohinCodes15/AccessForge
                    - generic [ref=f1e106]:
                      - text: Source on GitHub
                      - generic [ref=f1e108]: Source
                      - generic [ref=f1e110]: "on"
                      - generic [ref=f1e112]: GitHub
                    - text: (opens in new tab)
          - generic [ref=f1e115]:
            - term [ref=f1e116]: Repository
            - definition [ref=f1e117]:
              - list [ref=f1e118]:
                - listitem [ref=f1e119]: Public · TypeScript
                - listitem [ref=f1e120]: No license file
                - listitem [ref=f1e121]:
                  - text: First commit
                  - time [ref=f1e122]: 2026-11-11
                - listitem [ref=f1e123]:
                  - text: Last push
                  - time [ref=f1e124]: 2026-11-25
                - listitem [ref=f1e125]:
                  - text: Checked
                  - time [ref=f1e126]: 2026-11-25
    - region "Problem" [ref=f1e127]:
      - generic [ref=f1e130]:
        - text: "01"
        - heading "Problem" [level=2] [ref=f1e131]
      - paragraph [ref=f1e133]: A route is usable only if every piece of it is. Repair lists that rank barriers one at a time cannot see that two repairs may only be worth funding together, so a limited budget can be spent on fixes that open no complete route.
    - region "Solution" [ref=f1e134]:
      - generic [ref=f1e137]:
        - text: "02"
        - heading "Solution" [level=2] [ref=f1e138]
      - generic [ref=f1e139]:
        - paragraph [ref=f1e140]: Residents report barriers on a map that always has an equivalent list. Reviewers verify or reject each report, and every step is written to an append-only audit log. The planner scores candidate repairs as a group on the street network, compares four methods within a budget, and explains each choice. Every result is labeled as a modeled estimate, not an inspection or a compliance finding.
        - figure "Fig. 1 — Overview page, captured from a local development build. The API was not running, so the place counts read 0." [ref=f1e141]:
          - 'img "AccessForge overview page: the headline “Fix the barriers that reconnect the most routes”, a map of Fremont, and filters for places people travel to." [ref=f1e142]'
          - generic [ref=f1e143]:
            - generic [ref=f1e144]: Fig. 1
            - text: — Overview page, captured from a local development build. The API was not running, so the place counts read 0.
    - region "Architecture" [ref=f1e145]:
      - generic [ref=f1e148]:
        - text: "03"
        - heading "Architecture" [level=2] [ref=f1e149]
      - generic [ref=f1e150]:
        - figure "Data flow between components. Solid boxes are part of the project; dashed boxes are outside it. Numbers match the list above." [ref=f1e152]:
          - img [aria-hidden] [ref=f1e154]:
            - generic [ref=f1e155]: "1"
            - generic [ref=f1e158]: "2"
            - generic [ref=f1e163]: "3"
            - generic [ref=f1e168]: "4"
            - generic [ref=f1e173]: "5"
            - generic [ref=f1e178]: Browser
            - generic [ref=f1e181]: apps/web
            - generic [ref=f1e184]: services/api
            - generic [ref=f1e187]: pipelines/ingest
            - generic [ref=f1e190]: services/engine
            - generic [ref=f1e193]: PostgreSQL + PostGIS
          - list [ref=f1e196]:
            - listitem [ref=f1e197]:
              - text: "1"
              - generic [ref=f1e198]: Browser →to apps/webpages and maps
            - listitem [ref=f1e199]:
              - text: "2"
              - generic [ref=f1e200]: apps/web →to services/apityped JSON over HTTPS
            - listitem [ref=f1e201]:
              - text: "3"
              - generic [ref=f1e202]: services/api →to PostgreSQL + PostGISSQL
            - listitem [ref=f1e203]:
              - text: "4"
              - generic [ref=f1e204]: services/api →to services/engineworker imports
            - listitem [ref=f1e205]:
              - text: "5"
              - generic [ref=f1e206]: pipelines/ingest →to PostgreSQL + PostGISloads pilot data
        - generic [ref=f1e208]:
          - generic [ref=f1e209]:
            - term [ref=f1e210]: apps/web
            - definition [ref=f1e211]: Next.js and TypeScript. MapLibre maps, each paired with a list that shares the same query.
          - generic [ref=f1e212]:
            - term [ref=f1e213]: services/api
            - definition [ref=f1e214]: FastAPI with Pydantic validation at the boundary, SQLAlchemy and GeoAlchemy2 repositories, and a worker that claims jobs from a Postgres table.
          - generic [ref=f1e215]:
            - term [ref=f1e216]: PostgreSQL + PostGIS
            - definition [ref=f1e217]: Street network, barriers, repairs, scenarios, jobs, and the audit log.
          - generic [ref=f1e218]:
            - term [ref=f1e219]: services/engine
            - definition [ref=f1e220]: "A pure Python package with no web, database, or network I/O: graph model, access metric, and optimizers on NetworkX."
          - generic [ref=f1e221]:
            - term [ref=f1e222]: pipelines/ingest
            - definition [ref=f1e223]: Loads OpenStreetMap, Census, and CDC PLACES data for the Fremont pilot area.
    - region "Technical complexity" [ref=f1e224]:
      - generic [ref=f1e227]:
        - text: "04"
        - heading "Technical complexity" [level=2] [ref=f1e228]
      - list [ref=f1e230]:
        - listitem [ref=f1e231]: "01Access is scored as cumulative opportunities: Dijkstra runs per origin and mobility profile over a generalized-distance graph and counts destinations within a threshold."
        - listitem [ref=f1e232]: 02Uncertain barriers are sampled as independent Bernoulli scenarios from an explicit seed, so the same input always produces the same selection.
        - listitem [ref=f1e233]: 03Exhaustive search over up to 20 repair candidates is the correctness reference. Larger inputs are refused rather than silently handed to a heuristic.
        - listitem [ref=f1e234]: 04On a constructed two-repair corridor, the greedy gain-per-cost baseline gains 0 while exhaustive search funds the pair and adds 10 modeled opportunities. This is a planted example, not a population result.
    - region "Engineering decisions" [ref=f1e235]:
      - generic [ref=f1e238]:
        - text: "05"
        - heading "Engineering decisions" [level=2] [ref=f1e239]
      - generic [ref=f1e241]:
        - generic [ref=f1e242]:
          - term [ref=f1e243]: Keep the engine a pure library
          - definition [ref=f1e244]: Plain data in and out makes the optimizers testable on their own and lets storage change without touching algorithms.
        - generic [ref=f1e245]:
          - term [ref=f1e246]: Queue jobs in Postgres
          - definition [ref=f1e247]: SELECT … FOR UPDATE SKIP LOCKED avoids running Redis or Celery until measured load needs them.
        - generic [ref=f1e248]:
          - term [ref=f1e249]: Use MapLibre GL JS
          - definition [ref=f1e250]: It is open source under BSD-3, which avoids proprietary map SDK terms.
        - generic [ref=f1e251]:
          - term [ref=f1e252]: Pair every map with a list
          - definition [ref=f1e253]: The app targets WCAG 2.2 AA, so nothing is available only on the map.
        - generic [ref=f1e254]:
          - term [ref=f1e255]: Publish null results
          - definition [ref=f1e256]: The benchmark reports the 52 of 60 low-budget cases where no baseline gained anything, instead of only the favorable ones.
    - region "Verified outcomes" [ref=f1e257]:
      - generic [ref=f1e260]:
        - text: "06"
        - heading "Verified outcomes" [level=2] [ref=f1e261]
      - generic [ref=f1e263]:
        - generic [ref=f1e264]:
          - term [ref=f1e265]: synthetic benchmark evaluations completed, no errors or timeouts
          - definition [ref=f1e266]: 410/410
          - definition [ref=f1e267]: "Source: docs/engine/BENCHMARK_RESULTS.md, 2026-11-12. Synthetic grids, not real-world validation"
        - generic [ref=f1e268]:
          - term [ref=f1e269]: engine tests passing
          - definition [ref=f1e270]: "155"
          - definition [ref=f1e271]: "Source: docs/engine/BENCHMARK_RESULTS.md, 2026-11-12, at 98.87% statement coverage"
    - progressbar [aria-hidden] [ref=f1e272]:
      - tooltip [ref=f1e276]: 0% read
      - text: Drag to move it, or use the arrow keys. Home puts it back in the corner.
  - contentinfo [ref=f1e277]:
    - generic [ref=f1e278]:
      - paragraph [ref=f1e279]:
        - link [ref=f1e280]:
          - /url: mailto:rohinpidathala15@gmail.com
          - generic [ref=f1e281]:
            - text: rohinpidathala15@gmail.com
            - generic [ref=f1e283]: rohinpidathala15@gmail.com
      - navigation "Footer" [ref=f1e284]:
        - list [ref=f1e285]:
          - listitem [ref=f1e286]:
            - link [ref=f1e287]:
              - /url: /#work
              - generic [ref=f1e288]:
                - text: Work
                - generic [ref=f1e290]: Work
          - listitem [ref=f1e291]:
            - link [ref=f1e292]:
              - /url: /lab
              - generic [ref=f1e293]:
                - text: Research lab
                - generic [ref=f1e295]: Research
                - generic [ref=f1e297]: lab
          - listitem [ref=f1e298]:
            - link [ref=f1e299]:
              - /url: https://github.com/RohinCodes15
              - generic [ref=f1e300]:
                - text: GitHub
                - generic [ref=f1e302]: GitHub
              - text: (opens in new tab)
          - listitem [ref=f1e305]:
            - link [ref=f1e306]:
              - /url: https://www.linkedin.com/in/rohin-pidathala-53002842b/
              - generic [ref=f1e307]:
                - text: LinkedIn
                - generic [ref=f1e309]: LinkedIn
              - text: (opens in new tab)
          - listitem [ref=f1e312]:
            - link [ref=f1e313]:
              - /url: "#main"
              - generic [ref=f1e314]:
                - text: Back to top
                - generic [ref=f1e316]: Back
                - generic [ref=f1e318]: to
                - generic [ref=f1e320]: top
      - paragraph [ref=f1e321]: Rohin Pidathala
```

# Test source

```ts
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
> 113 |   await expect(progress).toHaveAttribute("aria-valuenow", "100");
      |                          ^ Error: expect(locator).toHaveAttribute(expected) failed
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