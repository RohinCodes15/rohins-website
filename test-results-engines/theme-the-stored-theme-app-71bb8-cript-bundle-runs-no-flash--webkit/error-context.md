# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: theme.spec.ts >> the stored theme applies before any JavaScript bundle runs (no flash)
- Location: tests/theme.spec.ts:73:1

# Error details

```
Error: expect(received).toBe(expected) // Object.is equality

Expected: "dark"
Received: "system"
```

```
Error: expect(received).toEqual(expected) // deep equality

- Expected  -  1
+ Received  + 15

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
+   "Failed to load resource: A TLS error caused the secure connection to fail.",
+   "Failed to load resource: A TLS error caused the secure connection to fail.",
+ ]
```

# Page snapshot

```yaml
- generic [active] [ref=f1e1]:
  - link "Skip to content" [ref=f1e2]:
    - /url: "#main"
  - main [ref=f1e3]:
    - region "Rohin Pidathala" [ref=f1e4]:
      - generic [ref=f1e5]:
        - heading "Rohin Pidathala" [level=1] [ref=f1e6]
        - generic [ref=f1e7]:
          - navigation "Portfolio sections" [ref=f1e8]:
            - list [ref=f1e9]:
              - listitem [ref=f1e10]:
                - link [ref=f1e11]:
                  - /url: "#intro"
                  - generic [ref=f1e12]:
                    - text: Overview
                    - generic [ref=f1e14]: Overview
              - listitem [ref=f1e15]:
                - link [ref=f1e16]:
                  - /url: "#work"
                  - generic [ref=f1e17]:
                    - text: Selected work
                    - generic [ref=f1e19]: Selected
                    - generic [ref=f1e21]: work
              - listitem [ref=f1e22]:
                - link [ref=f1e23]:
                  - /url: "#closer-look"
                  - generic [ref=f1e24]:
                    - text: A Closer Look
                    - generic [ref=f1e26]: A
                    - generic [ref=f1e28]: Closer
                    - generic [ref=f1e30]: Look
              - listitem [ref=f1e31]:
                - link [ref=f1e32]:
                  - /url: "#stack"
                  - generic [ref=f1e33]:
                    - text: Tech Stack
                    - generic [ref=f1e35]: Tech
                    - generic [ref=f1e37]: Stack
              - listitem [ref=f1e38]:
                - link [ref=f1e39]:
                  - /url: "#research"
                  - generic [ref=f1e40]:
                    - text: Research and interests
                    - generic [ref=f1e42]: Research
                    - generic [ref=f1e44]: and
                    - generic [ref=f1e46]: interests
              - listitem [ref=f1e47]:
                - link [ref=f1e48]:
                  - /url: "#activity"
                  - generic [ref=f1e49]:
                    - text: Activity
                    - generic [ref=f1e51]: Activity
              - listitem [ref=f1e52]:
                - link [ref=f1e53]:
                  - /url: "#contact"
                  - generic [ref=f1e54]:
                    - text: Contact
                    - generic [ref=f1e56]: Contact
          - generic [ref=f1e57]:
            - button "Search" [ref=f1e58]
            - group "Theme" [ref=f1e59]:
              - generic [ref=f1e61]:
                - generic [ref=f1e62]:
                  - radio "System" [ref=f1e63]
                  - text: System
                - generic [ref=f1e64]:
                  - radio "Light" [ref=f1e65]
                  - text: Light
                - generic [ref=f1e66]:
                  - radio "Dark" [ref=f1e67]
                  - text: Dark
        - paragraph [ref=f1e68]: Software Developer · AI Engineer · Quantitative Researcher
        - paragraph [ref=f1e69]: Programming since age 10
        - generic [ref=f1e70]:
          - paragraph [ref=f1e71]: I build software and explore how AI systems and quantitative methods can answer practical questions.
          - paragraph [ref=f1e72]:
            - link [ref=f1e73]:
              - /url: mailto:rohinpidathala15@gmail.com
              - generic [ref=f1e74]:
                - text: Email
                - generic [ref=f1e76]: Email
            - link [ref=f1e77]:
              - /url: https://github.com/RohinCodes15
              - generic [ref=f1e78]:
                - text: GitHub
                - generic [ref=f1e80]: GitHub
              - text: (opens in new tab)
            - link [ref=f1e83]:
              - /url: https://www.linkedin.com/in/rohin-pidathala-53002842b/
              - generic [ref=f1e84]:
                - text: LinkedIn
                - generic [ref=f1e86]: LinkedIn
              - text: (opens in new tab)
    - paragraph [ref=f1e93]: SOFTWARE DEVELOPERAI ENGINEERQUANTITATIVE RESEARCH
    - region "Selected work" [ref=f1e94]:
      - generic [ref=f1e97]:
        - text: "01"
        - heading "Selected work" [level=2] [ref=f1e98]
      - list [ref=f1e100]:
        - listitem [ref=f1e101]:
          - article [ref=f1e102]:
            - generic [ref=f1e103]:
              - generic [ref=f1e104]:
                - heading [level=3] [ref=f1e105]:
                  - link [ref=f1e106]:
                    - /url: /work/accessforge
                    - generic [ref=f1e107]:
                      - text: AccessForge AI
                      - generic [ref=f1e109]: AccessForge
                      - generic [ref=f1e111]: AI
                - time [ref=f1e112]: "2026"
              - paragraph [ref=f1e113]: Maps pedestrian accessibility barriers and chooses the set of sidewalk repairs that opens the most accessible routes within a budget.
              - paragraph [ref=f1e114]:
                - generic [ref=f1e115]: In development
                - text: · Personal project
                - generic [ref=f1e116]: · Next.js
                - generic [ref=f1e117]: · TypeScript
                - generic [ref=f1e118]: · Python
                - generic [ref=f1e119]: · FastAPI
                - generic [ref=f1e120]: · PostgreSQL
                - generic [ref=f1e121]: · PostGIS
                - generic [ref=f1e122]: · NetworkX
                - generic [ref=f1e123]: · MapLibre GL JS
                - generic [ref=f1e124]: · Playwright
              - paragraph [aria-hidden] [ref=f1e125]: Read case study
            - 'img "AccessForge overview: the headline “Fix the barriers that reconnect the most routes” beside a 3D map of Fremont and counts of places people travel to." [ref=f1e127]'
        - listitem [ref=f1e128]:
          - article [ref=f1e129]:
            - generic [ref=f1e130]:
              - generic [ref=f1e131]:
                - heading [level=3] [ref=f1e132]:
                  - link [ref=f1e133]:
                    - /url: /work/risklens
                    - generic [ref=f1e134]:
                      - text: RiskLens Quant
                      - generic [ref=f1e136]: RiskLens
                      - generic [ref=f1e138]: Quant
                - time [ref=f1e139]: "2026"
              - paragraph [ref=f1e140]: "A portfolio risk analyzer: enter holdings and see historical return, volatility, drawdown, VaR and CVaR, Monte Carlo scenarios, stress tests, and optimized allocations."
              - paragraph [ref=f1e141]:
                - generic [ref=f1e142]: Completed
                - text: · Personal project
                - generic [ref=f1e143]: · Python
                - generic [ref=f1e144]: · Streamlit
                - generic [ref=f1e145]: · pandas
                - generic [ref=f1e146]: · NumPy
                - generic [ref=f1e147]: · SciPy
                - generic [ref=f1e148]: · Plotly
              - paragraph [aria-hidden] [ref=f1e149]: Read case study
            - 'img "RiskLens Monte Carlo chart: a year of hypothetical portfolio wealth paths with the median and 25th–75th and 5th–95th percentile bands." [ref=f1e151]'
        - listitem [ref=f1e152]:
          - article [ref=f1e153]:
            - generic [ref=f1e154]:
              - generic [ref=f1e155]:
                - heading [level=3] [ref=f1e156]:
                  - link [ref=f1e157]:
                    - /url: /work/ledger
                    - generic [ref=f1e158]:
                      - text: Ledger
                      - generic [ref=f1e160]: Ledger
                - time [ref=f1e161]: "2026"
              - paragraph [ref=f1e162]: "A desktop game that teaches kids and teens how the stock market works with $1,000 of pretend cash: a simulated market, 35 lessons, a scam-spotting game, and trading-bot duels."
              - paragraph [ref=f1e163]:
                - generic [ref=f1e164]: Completed
                - text: · Personal project
                - generic [ref=f1e165]: · Python
                - generic [ref=f1e166]: · Pygame
              - paragraph [aria-hidden] [ref=f1e167]: Read case study
            - 'img "Ledger home screen: a $1,017.94 pretend portfolio, today''s mission, and the watchlist." [ref=f1e169]'
        - listitem [ref=f1e170]:
          - article [ref=f1e171]:
            - generic [ref=f1e172]:
              - generic [ref=f1e173]:
                - heading [level=3] [ref=f1e174]:
                  - link [ref=f1e175]:
                    - /url: /work/rotation-index
                    - generic [ref=f1e176]:
                      - text: Rotation Index
                      - generic [ref=f1e178]: Rotation
                      - generic [ref=f1e180]: Index
                - time [ref=f1e181]: "2026"
              - paragraph [ref=f1e182]: Estimates NBA player impact with regularized adjusted plus-minus, fitted on possession-level play-by-play so each player is credited relative to teammates and opponents.
              - paragraph [ref=f1e183]:
                - generic [ref=f1e184]: In development
                - text: · Personal project
                - generic [ref=f1e185]: · Python
                - generic [ref=f1e186]: · Flask
                - generic [ref=f1e187]: · pandas
                - generic [ref=f1e188]: · NumPy
              - paragraph [aria-hidden] [ref=f1e189]: Read case study
            - paragraph [ref=f1e190]: The data pipeline, audit gate, and local dashboard work. Season estimates stay hidden until every one of the 1,230 games in the 2025–26 regular season validates.
        - listitem [ref=f1e191]:
          - article [ref=f1e192]:
            - generic [ref=f1e193]:
              - generic [ref=f1e194]:
                - heading [level=3] [ref=f1e195]:
                  - link [ref=f1e196]:
                    - /url: /work/portfolio
                    - generic [ref=f1e197]:
                      - text: Developer portfolio
                      - generic [ref=f1e199]: Developer
                      - generic [ref=f1e201]: portfolio
                - time [ref=f1e202]: "2026"
              - paragraph [ref=f1e203]: An editorial portfolio with a server-rendered GitHub activity calendar and an optional interactive terrain.
              - paragraph [ref=f1e204]:
                - generic [ref=f1e205]: In development
                - text: · Personal project
                - generic [ref=f1e206]: · Next.js
                - generic [ref=f1e207]: · React
                - generic [ref=f1e208]: · TypeScript
                - generic [ref=f1e209]: · Tailwind CSS
                - generic [ref=f1e210]: · Motion
                - generic [ref=f1e211]: · Playwright
              - paragraph [aria-hidden] [ref=f1e212]: Read case study
            - 'img "Portfolio homepage in the dark theme: the name Rohin Pidathala, the role line, contact links, the section rail, and the three identity lines Software Developer, AI Engineer, and Quantitative Research." [ref=f1e214]'
    - region "A Closer Look" [ref=f1e215]:
      - generic [ref=f1e218]:
        - text: "02"
        - heading "A Closer Look" [level=2] [ref=f1e219]
      - generic [ref=f1e220]:
        - paragraph [ref=f1e221]: Exploring the interfaces, systems, and ideas behind my work.
        - generic [ref=f1e222]:
          - generic [ref=f1e223]:
            - link [ref=f1e224]:
              - /url: /work/accessforge
              - 'img "AccessForge overview: the headline “Fix the barriers that reconnect the most routes” beside a 3D map of Fremont and counts of places people travel to." [ref=f1e225]'
              - text: AccessForge AI
            - link [ref=f1e226]:
              - /url: /work/risklens
              - img "RiskLens histogram of historical daily portfolio returns with the 95% value-at-risk cutoff marked." [ref=f1e227]
              - text: RiskLens Quant
            - link [ref=f1e228]:
              - /url: /work/ledger
              - 'img "Market screen: the market mood, the top gainer and loser, and a stock list with price charts." [ref=f1e229]'
              - text: Ledger
            - link [ref=f1e230]:
              - /url: /work/ledger
              - 'img "Portfolio screen: net worth, cash, invested amount and dividends, a wealth milestone, and a portfolio health grade." [ref=f1e231]'
              - text: Ledger
          - generic [ref=f1e232]:
            - link [ref=f1e233]:
              - /url: /work/ledger
              - 'img "Ledger home screen: a $1,017.94 pretend portfolio, today''s mission, and the watchlist." [ref=f1e234]'
              - text: Ledger
            - link [ref=f1e235]:
              - /url: /work/risklens
              - 'img "RiskLens efficient frontier: expected return against volatility, marking the current, minimum-volatility, and maximum-Sharpe portfolios." [ref=f1e236]'
              - text: RiskLens Quant
            - link [ref=f1e237]:
              - /url: /work/accessforge
              - 'img "AccessForge repair planner story: a wheelchair user’s short trip to Washington Hospital blocked by a raised curb." [ref=f1e238]'
              - text: AccessForge AI
            - link [ref=f1e239]:
              - /url: /work/risklens
              - img "RiskLens chart comparing the portfolio’s cumulative return with the S&P 500 (SPY) over the same dates." [ref=f1e240]
              - text: RiskLens Quant
            - link [ref=f1e241]:
              - /url: /work/ledger
              - 'img "Bot battle setup: how to win, a scouting report on the rival bot, and a choice of 60 or 90 second rounds." [ref=f1e242]'
              - text: Ledger
          - generic [ref=f1e243]:
            - link [ref=f1e244]:
              - /url: /work/risklens
              - 'img "RiskLens Monte Carlo chart: a year of hypothetical portfolio wealth paths with the median and 25th–75th and 5th–95th percentile bands." [ref=f1e245]'
              - text: RiskLens Quant
            - link [ref=f1e246]:
              - /url: /work/accessforge
              - 'img "AccessForge barrier map: Fremont streets and buildings in 3D, destinations shaded by type, with a barrier details panel." [ref=f1e247]'
              - text: AccessForge AI
            - link [ref=f1e248]:
              - /url: /work/ledger
              - 'img "Scam Detective: a giveaway message asking for a home address and card number, with Scam and Legit buttons." [ref=f1e249]'
              - text: Ledger
            - link [ref=f1e250]:
              - /url: /work/risklens
              - 'img "RiskLens drawdown chart: how far the portfolio sat below its previous peak on each day, reaching about −20%." [ref=f1e251]'
              - text: RiskLens Quant
            - link [ref=f1e252]:
              - /url: /work/ledger
              - 'img "A lesson card from Making a budget: a budget is a plan for your money before you spend it." [ref=f1e253]'
              - text: Ledger
    - region "Tech Stack" [ref=f1e254]:
      - generic [ref=f1e257]:
        - text: "03"
        - heading "Tech Stack" [level=2] [ref=f1e258]
      - generic [ref=f1e260]:
        - paragraph [ref=f1e261]: The technologies behind my ideas.
        - list "Featured technologies" [ref=f1e263]:
          - listitem [ref=f1e264]:
            - link "Python Used in AccessForge AI, RiskLens Quant, Ledger, Rotation Index" [ref=f1e265]:
              - /url: /work/accessforge
          - listitem [ref=f1e267]:
            - link "TypeScript Used in AccessForge AI, Developer portfolio" [ref=f1e268]:
              - /url: /work/accessforge
          - listitem [ref=f1e270]:
            - link "React Used in Developer portfolio" [ref=f1e271]:
              - /url: /work/portfolio
          - listitem [ref=f1e273]:
            - link "Next.js Used in AccessForge AI, Developer portfolio" [ref=f1e274]:
              - /url: /work/accessforge
          - listitem [ref=f1e276]:
            - generic [ref=f1e277]: C++
          - listitem [ref=f1e279]:
            - generic [ref=f1e280]: PyTorch
          - listitem [ref=f1e282]:
            - link "PostgreSQL Used in AccessForge AI" [ref=f1e283]:
              - /url: /work/accessforge
          - listitem [ref=f1e285]:
            - link "GitHub" [ref=f1e286]:
              - /url: https://github.com/RohinCodes15
          - listitem [ref=f1e288]:
            - link "FastAPI Used in AccessForge AI" [ref=f1e289]:
              - /url: /work/accessforge
        - generic [ref=f1e291]:
          - group "Filter technologies" [ref=f1e292]:
            - button "All" [pressed] [ref=f1e293]: All44
            - button "Languages" [ref=f1e294]: Languages7
            - button "Frameworks" [ref=f1e295]: Frameworks13
            - button "Data" [ref=f1e296]: Data4
            - button "AI and quant" [ref=f1e297]: AI and quant11
            - button "Tools" [ref=f1e298]: Tools9
          - generic [ref=f1e299]:
            - status [ref=f1e300]: 44 technologies shown
            - list [ref=f1e301]:
              - listitem [ref=f1e302]:
                - text: Python
                - generic [ref=f1e303]:
                  - text: Used in
                  - link "AccessForge AI" [ref=f1e305]:
                    - /url: /work/accessforge
                  - generic [ref=f1e306]:
                    - text: ","
                    - link "RiskLens Quant" [ref=f1e307]:
                      - /url: /work/risklens
                  - generic [ref=f1e308]:
                    - text: ","
                    - link "Ledger" [ref=f1e309]:
                      - /url: /work/ledger
                  - generic [ref=f1e310]:
                    - text: ","
                    - link "Rotation Index" [ref=f1e311]:
                      - /url: /work/rotation-index
                - text: Languages
              - listitem [ref=f1e312]: JavaScriptLanguages
              - listitem [ref=f1e313]: C++Languages
              - listitem [ref=f1e314]: CSSLanguages
              - listitem [ref=f1e315]: HTMLLanguages
              - listitem [ref=f1e316]:
                - text: TypeScript
                - generic [ref=f1e317]:
                  - text: Used in
                  - link "AccessForge AI" [ref=f1e319]:
                    - /url: /work/accessforge
                  - generic [ref=f1e320]:
                    - text: ","
                    - link "Developer portfolio" [ref=f1e321]:
                      - /url: /work/portfolio
                - text: Languages
              - listitem [ref=f1e322]: JavaLanguages
              - listitem [ref=f1e323]: ExpoFrameworks
              - listitem [ref=f1e324]:
                - text: Motion
                - generic [ref=f1e325]:
                  - text: Used in
                  - link "Developer portfolio" [ref=f1e327]:
                    - /url: /work/portfolio
                - text: Frameworks
              - listitem [ref=f1e328]:
                - text: Next.js
                - generic [ref=f1e329]:
                  - text: Used in
                  - link "AccessForge AI" [ref=f1e331]:
                    - /url: /work/accessforge
                  - generic [ref=f1e332]:
                    - text: ","
                    - link "Developer portfolio" [ref=f1e333]:
                      - /url: /work/portfolio
                - text: Frameworks
              - listitem [ref=f1e334]: React NativeFrameworks
              - listitem [ref=f1e335]:
                - text: React
                - generic [ref=f1e336]:
                  - text: Used in
                  - link "Developer portfolio" [ref=f1e338]:
                    - /url: /work/portfolio
                - text: Frameworks
              - listitem [ref=f1e339]:
                - text: FastAPI
                - generic [ref=f1e340]:
                  - text: Used in
                  - link "AccessForge AI" [ref=f1e342]:
                    - /url: /work/accessforge
                - text: Frameworks
              - listitem [ref=f1e343]: Node.jsFrameworks
              - listitem [ref=f1e344]:
                - text: Tailwind CSS
                - generic [ref=f1e345]:
                  - text: Used in
                  - link "Developer portfolio" [ref=f1e347]:
                    - /url: /work/portfolio
                - text: Frameworks
              - listitem [ref=f1e348]:
                - text: Flask
                - generic [ref=f1e349]:
                  - text: Used in
                  - link "Rotation Index" [ref=f1e351]:
                    - /url: /work/rotation-index
                - text: Frameworks
              - listitem [ref=f1e352]:
                - text: Streamlit
                - generic [ref=f1e353]:
                  - text: Used in
                  - link "RiskLens Quant" [ref=f1e355]:
                    - /url: /work/risklens
                - text: Frameworks
              - listitem [ref=f1e356]:
                - text: MapLibre GL JS
                - generic [ref=f1e357]:
                  - text: Used in
                  - link "AccessForge AI" [ref=f1e359]:
                    - /url: /work/accessforge
                - text: Frameworks
              - listitem [ref=f1e360]:
                - text: Plotly
                - generic [ref=f1e361]:
                  - text: Used in
                  - link "RiskLens Quant" [ref=f1e363]:
                    - /url: /work/risklens
                - text: Frameworks
              - listitem [ref=f1e364]:
                - text: Pygame
                - generic [ref=f1e365]:
                  - text: Used in
                  - link "Ledger" [ref=f1e367]:
                    - /url: /work/ledger
                - text: Frameworks
              - listitem [ref=f1e368]: MongoDBData
              - listitem [ref=f1e369]: SupabaseData
              - listitem [ref=f1e370]:
                - text: PostgreSQL
                - generic [ref=f1e371]:
                  - text: Used in
                  - link "AccessForge AI" [ref=f1e373]:
                    - /url: /work/accessforge
                - text: Data
              - listitem [ref=f1e374]:
                - text: PostGIS
                - generic [ref=f1e375]:
                  - text: Used in
                  - link "AccessForge AI" [ref=f1e377]:
                    - /url: /work/accessforge
                - text: Data
              - listitem [ref=f1e378]:
                - text: pandas
                - generic [ref=f1e379]:
                  - text: Used in
                  - link "RiskLens Quant" [ref=f1e381]:
                    - /url: /work/risklens
                  - generic [ref=f1e382]:
                    - text: ","
                    - link "Rotation Index" [ref=f1e383]:
                      - /url: /work/rotation-index
                - text: AI and quant
              - listitem [ref=f1e384]: PyTorchAI and quant
              - listitem [ref=f1e385]: Claude APIAI and quant
              - listitem [ref=f1e386]: Hugging FaceAI and quant
              - listitem [ref=f1e387]: Monte Carlo simulationAI and quant
              - listitem [ref=f1e388]: Statistical modelingAI and quant
              - listitem [ref=f1e389]: OpenAI APIAI and quant
              - listitem [ref=f1e390]: scikit-learnAI and quant
              - listitem [ref=f1e391]:
                - text: NumPy
                - generic [ref=f1e392]:
                  - text: Used in
                  - link "RiskLens Quant" [ref=f1e394]:
                    - /url: /work/risklens
                  - generic [ref=f1e395]:
                    - text: ","
                    - link "Rotation Index" [ref=f1e396]:
                      - /url: /work/rotation-index
                - text: AI and quant
              - listitem [ref=f1e397]:
                - text: SciPy
                - generic [ref=f1e398]:
                  - text: Used in
                  - link "RiskLens Quant" [ref=f1e400]:
                    - /url: /work/risklens
                - text: AI and quant
              - listitem [ref=f1e401]:
                - text: NetworkX
                - generic [ref=f1e402]:
                  - text: Used in
                  - link "AccessForge AI" [ref=f1e404]:
                    - /url: /work/accessforge
                - text: AI and quant
              - listitem [ref=f1e405]: GitTools
              - listitem [ref=f1e406]: GitHub ActionsTools
              - listitem [ref=f1e407]: VercelTools
              - listitem [ref=f1e408]: Google CloudTools
              - listitem [ref=f1e409]: FigmaTools
              - listitem [ref=f1e410]: VS CodeTools
              - listitem [ref=f1e411]: GitHubTools
              - listitem [ref=f1e412]: ArduinoTools
              - listitem [ref=f1e413]:
                - text: Playwright
                - generic [ref=f1e414]:
                  - text: Used in
                  - link "AccessForge AI" [ref=f1e416]:
                    - /url: /work/accessforge
                  - generic [ref=f1e417]:
                    - text: ","
                    - link "Developer portfolio" [ref=f1e418]:
                      - /url: /work/portfolio
                - text: Tools
    - region "Research and interests" [ref=f1e419]:
      - generic [ref=f1e422]:
        - text: "04"
        - heading "Research and interests" [level=2] [ref=f1e423]
      - generic [ref=f1e424]:
        - generic [ref=f1e425]:
          - generic [ref=f1e426]:
            - term [ref=f1e427]: Software development
            - definition [ref=f1e428]: Accessible interfaces and reliable software systems.
          - generic [ref=f1e429]:
            - term [ref=f1e430]: AI engineering
            - definition [ref=f1e431]: Building with models and evaluating how they behave.
          - generic [ref=f1e432]:
            - term [ref=f1e433]: Quantitative research
            - definition [ref=f1e434]: Using data and reproducible experiments to investigate questions.
        - paragraph [ref=f1e435]:
          - link "Open the research lab" [ref=f1e436]:
            - /url: /lab
          - text: · interactive educational demonstrations on synthetic data
    - region "Activity" [ref=f1e437]:
      - generic [ref=f1e440]:
        - text: "05"
        - heading "Activity" [level=2] [ref=f1e441]
      - figure "Fig. 1 · GitHub contributions" [ref=f1e443]:
        - generic [ref=f1e445]:
          - paragraph [ref=f1e446]: GitHub activity unavailable
          - paragraph [ref=f1e447]:
            - link "View profile on GitHub (opens in new tab)" [ref=f1e448]:
              - /url: https://github.com/RohinCodes15
    - region "Contact" [ref=f1e452]:
      - generic [ref=f1e455]:
        - text: "06"
        - heading "Contact" [level=2] [ref=f1e456]
      - generic [ref=f1e458]:
        - generic [ref=f1e459]:
          - link "rohinpidathala15@gmail.com" [ref=f1e460]:
            - /url: mailto:rohinpidathala15@gmail.com
          - button "Copy email" [ref=f1e461]
        - list [ref=f1e462]:
          - listitem [ref=f1e463]:
            - link [ref=f1e464]:
              - /url: https://github.com/RohinCodes15
              - generic [ref=f1e465]:
                - text: GitHub
                - generic [ref=f1e467]: GitHub
              - text: (opens in new tab)
          - listitem [ref=f1e470]:
            - link [ref=f1e471]:
              - /url: https://www.linkedin.com/in/rohin-pidathala-53002842b/
              - generic [ref=f1e472]:
                - text: LinkedIn
                - generic [ref=f1e474]: LinkedIn
              - text: (opens in new tab)
  - contentinfo [ref=f1e477]:
    - generic [ref=f1e478]:
      - paragraph [ref=f1e479]:
        - link [ref=f1e480]:
          - /url: mailto:rohinpidathala15@gmail.com
          - generic [ref=f1e481]:
            - text: rohinpidathala15@gmail.com
            - generic [ref=f1e483]: rohinpidathala15@gmail.com
      - navigation "Footer" [ref=f1e484]:
        - list [ref=f1e485]:
          - listitem [ref=f1e486]:
            - link [ref=f1e487]:
              - /url: /#work
              - generic [ref=f1e488]:
                - text: Work
                - generic [ref=f1e490]: Work
          - listitem [ref=f1e491]:
            - link [ref=f1e492]:
              - /url: /lab
              - generic [ref=f1e493]:
                - text: Research lab
                - generic [ref=f1e495]: Research
                - generic [ref=f1e497]: lab
          - listitem [ref=f1e498]:
            - link [ref=f1e499]:
              - /url: https://github.com/RohinCodes15
              - generic [ref=f1e500]:
                - text: GitHub
                - generic [ref=f1e502]: GitHub
              - text: (opens in new tab)
          - listitem [ref=f1e505]:
            - link [ref=f1e506]:
              - /url: https://www.linkedin.com/in/rohin-pidathala-53002842b/
              - generic [ref=f1e507]:
                - text: LinkedIn
                - generic [ref=f1e509]: LinkedIn
              - text: (opens in new tab)
          - listitem [ref=f1e512]:
            - link [ref=f1e513]:
              - /url: "#main"
              - generic [ref=f1e514]:
                - text: Back to top
                - generic [ref=f1e516]: Back
                - generic [ref=f1e518]: to
                - generic [ref=f1e520]: top
      - paragraph [ref=f1e521]: Rohin Pidathala
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