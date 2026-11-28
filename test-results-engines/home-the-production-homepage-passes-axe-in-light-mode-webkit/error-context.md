# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: home.spec.ts >> the production homepage passes axe in light mode
- Location: tests/home.spec.ts:67:3

# Error details

```
Error: expect(received).toEqual(expected) // deep equality

- Expected  -   1
+ Received  + 462

- Array []
+ Array [
+   Object {
+     "description": "Ensure touch targets have sufficient size and space",
+     "help": "All touch targets must be 24px large, or leave sufficient space",
+     "helpUrl": "https://dequeuniversity.com/rules/axe/4.14/target-size?application=playwright",
+     "id": "target-size",
+     "impact": "serious",
+     "nodes": Array [
+       Object {
+         "all": Array [],
+         "any": Array [
+           Object {
+             "data": Object {
+               "height": 18,
+               "minSize": 24,
+               "width": 126.2,
+             },
+             "id": "target-size",
+             "impact": "serious",
+             "message": "Target has insufficient size (126.2px by 18px, should be at least 24px by 24px)",
+             "relatedNodes": Array [],
+           },
+           Object {
+             "data": Object {
+               "closestOffset": 18,
+               "minOffset": 24,
+             },
+             "id": "target-offset",
+             "impact": "serious",
+             "message": "Target has insufficient space to its closest neighbors. Safe clickable space has a diameter of 18px instead of at least 24px.",
+             "relatedNodes": Array [
+               Object {
+                 "html": "<a href=\"#work\" class=\"group/nav inline-flex min-h-6 items-center gap-2 text-text-2 transition-colors duration-(--duration-micro) ease-out hover:text-text aria-[current=location]:text-text\">",
+                 "target": Array [
+                   "li:nth-child(2) > a[href$=\"#work\"]",
+                 ],
+               },
+             ],
+           },
+         ],
+         "failureSummary": "Fix any of the following:
+   Target has insufficient size (126.2px by 18px, should be at least 24px by 24px)
+   Target has insufficient space to its closest neighbors. Safe clickable space has a diameter of 18px instead of at least 24px.",
+         "html": "<a href=\"#intro\" aria-current=\"location\" class=\"group/nav inline-flex min-h-6 items-center gap-2 text-text-2 transition-colors duration-(--duration-micro) ease-out hover:text-text aria-[current=location]:text-text\">",
+         "impact": "serious",
+         "none": Array [],
+         "target": Array [
+           "a[href$=\"#intro\"]",
+         ],
+       },
+       Object {
+         "all": Array [],
+         "any": Array [
+           Object {
+             "data": Object {
+               "height": 18,
+               "minSize": 24,
+               "width": 182.2,
+             },
+             "id": "target-size",
+             "impact": "serious",
+             "message": "Target has insufficient size (182.2px by 18px, should be at least 24px by 24px)",
+             "relatedNodes": Array [],
+           },
+           Object {
+             "data": Object {
+               "closestOffset": 12.8,
+               "minOffset": 24,
+             },
+             "id": "target-offset",
+             "impact": "serious",
+             "message": "Target has insufficient space to its closest neighbors. Safe clickable space has a diameter of 12.8px instead of at least 24px.",
+             "relatedNodes": Array [
+               Object {
+                 "html": "<a href=\"#intro\" aria-current=\"location\" class=\"group/nav inline-flex min-h-6 items-center gap-2 text-text-2 transition-colors duration-(--duration-micro) ease-out hover:text-text aria-[current=location]:text-text\">",
+                 "target": Array [
+                   "a[href$=\"#intro\"]",
+                 ],
+               },
+               Object {
+                 "html": "<a href=\"#closer-look\" class=\"group/nav inline-flex min-h-6 items-center gap-2 text-text-2 transition-colors duration-(--duration-micro) ease-out hover:text-text aria-[current=location]:text-text\">",
+                 "target": Array [
+                   "a[href$=\"#closer-look\"]",
+                 ],
+               },
+             ],
+           },
+         ],
+         "failureSummary": "Fix any of the following:
+   Target has insufficient size (182.2px by 18px, should be at least 24px by 24px)
+   Target has insufficient space to its closest neighbors. Safe clickable space has a diameter of 12.8px instead of at least 24px.",
+         "html": "<a href=\"#work\" class=\"group/nav inline-flex min-h-6 items-center gap-2 text-text-2 transition-colors duration-(--duration-micro) ease-out hover:text-text aria-[current=location]:text-text\">",
+         "impact": "serious",
+         "none": Array [],
+         "target": Array [
+           "li:nth-child(2) > a[href$=\"#work\"]",
+         ],
+       },
+       Object {
+         "all": Array [],
+         "any": Array [
+           Object {
+             "data": Object {
+               "height": 18,
+               "minSize": 24,
+               "width": 189.3,
+             },
+             "id": "target-size",
+             "impact": "serious",
+             "message": "Target has insufficient size (189.3px by 18px, should be at least 24px by 24px)",
+             "relatedNodes": Array [],
+           },
+           Object {
+             "data": Object {
+               "closestOffset": 12.8,
+               "minOffset": 24,
+             },
+             "id": "target-offset",
+             "impact": "serious",
+             "message": "Target has insufficient space to its closest neighbors. Safe clickable space has a diameter of 12.8px instead of at least 24px.",
+             "relatedNodes": Array [
+               Object {
+                 "html": "<a href=\"#work\" class=\"group/nav inline-flex min-h-6 items-center gap-2 text-text-2 transition-colors duration-(--duration-micro) ease-out hover:text-text aria-[current=location]:text-text\">",
+                 "target": Array [
+                   "li:nth-child(2) > a[href$=\"#work\"]",
+                 ],
+               },
+               Object {
+                 "html": "<a href=\"#stack\" class=\"group/nav inline-flex min-h-6 items-center gap-2 text-text-2 transition-colors duration-(--duration-micro) ease-out hover:text-text aria-[current=location]:text-text\">",
+                 "target": Array [
+                   "a[href$=\"#stack\"]",
+                 ],
+               },
+             ],
+           },
+         ],
+         "failureSummary": "Fix any of the following:
+   Target has insufficient size (189.3px by 18px, should be at least 24px by 24px)
+   Target has insufficient space to its closest neighbors. Safe clickable space has a diameter of 12.8px instead of at least 24px.",
+         "html": "<a href=\"#closer-look\" class=\"group/nav inline-flex min-h-6 items-center gap-2 text-text-2 transition-colors duration-(--duration-micro) ease-out hover:text-text aria-[current=location]:text-text\">",
+         "impact": "serious",
+         "none": Array [],
+         "target": Array [
+           "a[href$=\"#closer-look\"]",
+         ],
+       },
+       Object {
+         "all": Array [],
+         "any": Array [
+           Object {
+             "data": Object {
+               "height": 18,
+               "minSize": 24,
+               "width": 141.9,
+             },
+             "id": "target-size",
+             "impact": "serious",
+             "message": "Target has insufficient size (141.9px by 18px, should be at least 24px by 24px)",
+             "relatedNodes": Array [],
+           },
+           Object {
+             "data": Object {
+               "closestOffset": 18,
+               "minOffset": 24,
+             },
+             "id": "target-offset",
+             "impact": "serious",
+             "message": "Target has insufficient space to its closest neighbors. Safe clickable space has a diameter of 18px instead of at least 24px.",
+             "relatedNodes": Array [
+               Object {
+                 "html": "<a href=\"#closer-look\" class=\"group/nav inline-flex min-h-6 items-center gap-2 text-text-2 transition-colors duration-(--duration-micro) ease-out hover:text-text aria-[current=location]:text-text\">",
+                 "target": Array [
+                   "a[href$=\"#closer-look\"]",
+                 ],
+               },
+               Object {
+                 "html": "<a href=\"#research\" class=\"group/nav inline-flex min-h-6 items-center gap-2 text-text-2 transition-colors duration-(--duration-micro) ease-out hover:text-text aria-[current=location]:text-text\">",
+                 "target": Array [
+                   "a[href$=\"#research\"]",
+                 ],
+               },
+             ],
+           },
+         ],
+         "failureSummary": "Fix any of the following:
+   Target has insufficient size (141.9px by 18px, should be at least 24px by 24px)
+   Target has insufficient space to its closest neighbors. Safe clickable space has a diameter of 18px instead of at least 24px.",
+         "html": "<a href=\"#stack\" class=\"group/nav inline-flex min-h-6 items-center gap-2 text-text-2 transition-colors duration-(--duration-micro) ease-out hover:text-text aria-[current=location]:text-text\">",
+         "impact": "serious",
+         "none": Array [],
+         "target": Array [
+           "a[href$=\"#stack\"]",
+         ],
+       },
+       Object {
+         "all": Array [],
+         "any": Array [
+           Object {
+             "data": Object {
+               "height": 18,
+               "minSize": 24,
+               "width": 286.1,
+             },
+             "id": "target-size",
+             "impact": "serious",
+             "message": "Target has insufficient size (286.1px by 18px, should be at least 24px by 24px)",
+             "relatedNodes": Array [],
+           },
+           Object {
+             "data": Object {
+               "closestOffset": 18.2,
+               "minOffset": 24,
+             },
+             "id": "target-offset",
+             "impact": "serious",
+             "message": "Target has insufficient space to its closest neighbors. Safe clickable space has a diameter of 18.2px instead of at least 24px.",
+             "relatedNodes": Array [
+               Object {
+                 "html": "<a href=\"#stack\" class=\"group/nav inline-flex min-h-6 items-center gap-2 text-text-2 transition-colors duration-(--duration-micro) ease-out hover:text-text aria-[current=location]:text-text\">",
+                 "target": Array [
+                   "a[href$=\"#stack\"]",
+                 ],
+               },
+             ],
+           },
+         ],
+         "failureSummary": "Fix any of the following:
+   Target has insufficient size (286.1px by 18px, should be at least 24px by 24px)
+   Target has insufficient space to its closest neighbors. Safe clickable space has a diameter of 18.2px instead of at least 24px.",
+         "html": "<a href=\"#research\" class=\"group/nav inline-flex min-h-6 items-center gap-2 text-text-2 transition-colors duration-(--duration-micro) ease-out hover:text-text aria-[current=location]:text-text\">",
+         "impact": "serious",
+         "none": Array [],
+         "target": Array [
+           "a[href$=\"#research\"]",
+         ],
+       },
+       Object {
+         "all": Array [],
+         "any": Array [
+           Object {
+             "data": Object {
+               "height": 18,
+               "minSize": 24,
+               "width": 104.9,
+             },
+             "id": "target-size",
+             "impact": "serious",
+             "message": "Target has insufficient size (104.9px by 18px, should be at least 24px by 24px)",
+             "relatedNodes": Array [],
+           },
+           Object {
+             "data": Object {
+               "closestOffset": 12.4,
+               "minOffset": 24,
+             },
+             "id": "target-offset",
+             "impact": "serious",
+             "message": "Target has insufficient space to its closest neighbors. Safe clickable space has a diameter of 12.4px instead of at least 24px.",
+             "relatedNodes": Array [
+               Object {
+                 "html": "<a href=\"#research\" class=\"group/nav inline-flex min-h-6 items-center gap-2 text-text-2 transition-colors duration-(--duration-micro) ease-out hover:text-text aria-[current=location]:text-text\">",
+                 "target": Array [
+                   "a[href$=\"#research\"]",
+                 ],
+               },
+               Object {
+                 "html": "<a href=\"#contact\" class=\"group/nav inline-flex min-h-6 items-center gap-2 text-text-2 transition-colors duration-(--duration-micro) ease-out hover:text-text aria-[current=location]:text-text\">",
+                 "target": Array [
+                   "a[href$=\"#contact\"]",
+                 ],
+               },
+             ],
+           },
+         ],
+         "failureSummary": "Fix any of the following:
+   Target has insufficient size (104.9px by 18px, should be at least 24px by 24px)
+   Target has insufficient space to its closest neighbors. Safe clickable space has a diameter of 12.4px instead of at least 24px.",
+         "html": "<a href=\"#activity\" class=\"group/nav inline-flex min-h-6 items-center gap-2 text-text-2 transition-colors duration-(--duration-micro) ease-out hover:text-text aria-[current=location]:text-text\">",
+         "impact": "serious",
+         "none": Array [],
+         "target": Array [
+           "a[href$=\"#activity\"]",
+         ],
+       },
+       Object {
+         "all": Array [],
+         "any": Array [
+           Object {
+             "data": Object {
+               "height": 18,
+               "minSize": 24,
+               "width": 99.5,
+             },
+             "id": "target-size",
+             "impact": "serious",
+             "message": "Target has insufficient size (99.5px by 18px, should be at least 24px by 24px)",
+             "relatedNodes": Array [],
+           },
+           Object {
+             "data": Object {
+               "closestOffset": 12.4,
+               "minOffset": 24,
+             },
+             "id": "target-offset",
+             "impact": "serious",
+             "message": "Target has insufficient space to its closest neighbors. Safe clickable space has a diameter of 12.4px instead of at least 24px.",
+             "relatedNodes": Array [
+               Object {
+                 "html": "<a href=\"#activity\" class=\"group/nav inline-flex min-h-6 items-center gap-2 text-text-2 transition-colors duration-(--duration-micro) ease-out hover:text-text aria-[current=location]:text-text\">",
+                 "target": Array [
+                   "a[href$=\"#activity\"]",
+                 ],
+               },
+             ],
+           },
+         ],
+         "failureSummary": "Fix any of the following:
+   Target has insufficient size (99.5px by 18px, should be at least 24px by 24px)
+   Target has insufficient space to its closest neighbors. Safe clickable space has a diameter of 12.4px instead of at least 24px.",
+         "html": "<a href=\"#contact\" class=\"group/nav inline-flex min-h-6 items-center gap-2 text-text-2 transition-colors duration-(--duration-micro) ease-out hover:text-text aria-[current=location]:text-text\">",
+         "impact": "serious",
+         "none": Array [],
+         "target": Array [
+           "a[href$=\"#contact\"]",
+         ],
+       },
+       Object {
+         "all": Array [],
+         "any": Array [
+           Object {
+             "data": Object {
+               "height": 18,
+               "minSize": 24,
+               "width": 71.6,
+             },
+             "id": "target-size",
+             "impact": "serious",
+             "message": "Target has insufficient size (71.6px by 18px, should be at least 24px by 24px)",
+             "relatedNodes": Array [],
+           },
+           Object {
+             "data": Object {
+               "closestOffset": 18,
+               "minOffset": 24,
+             },
+             "id": "target-offset",
+             "impact": "serious",
+             "message": "Target has insufficient space to its closest neighbors. Safe clickable space has a diameter of 18px instead of at least 24px.",
+             "relatedNodes": Array [
+               Object {
+                 "html": "<a href=\"/lab\" class=\"group/link wrap-anywhere link-roll\">",
+                 "target": Array [
+                   ".link-roll.group\\/link[href$=\"lab\"]",
+                 ],
+               },
+             ],
+           },
+         ],
+         "failureSummary": "Fix any of the following:
+   Target has insufficient size (71.6px by 18px, should be at least 24px by 24px)
+   Target has insufficient space to its closest neighbors. Safe clickable space has a diameter of 18px instead of at least 24px.",
+         "html": "<a href=\"/#work\" class=\"group/link wrap-anywhere link-roll\">",
+         "impact": "serious",
+         "none": Array [],
+         "target": Array [
+           "a[href$=\"/#work\"]",
+         ],
+       },
+       Object {
+         "all": Array [],
+         "any": Array [
+           Object {
+             "data": Object {
+               "height": 18,
+               "minSize": 24,
+               "width": 164.4,
+             },
+             "id": "target-size",
+             "impact": "serious",
+             "message": "Target has insufficient size (164.4px by 18px, should be at least 24px by 24px)",
+             "relatedNodes": Array [],
+           },
+           Object {
+             "data": Object {
+               "closestOffset": 18,
+               "minOffset": 24,
+             },
+             "id": "target-offset",
+             "impact": "serious",
+             "message": "Target has insufficient space to its closest neighbors. Safe clickable space has a diameter of 18px instead of at least 24px.",
+             "relatedNodes": Array [
+               Object {
+                 "html": "<a href=\"https://github.com/RohinCodes15\" target=\"_blank\" rel=\"noopener\" class=\"group/link wrap-anywhere link-roll\">",
+                 "target": Array [
+                   "li:nth-child(3) > .link-roll[target=\"_blank\"][rel=\"noopener\"]",
+                 ],
+               },
+             ],
+           },
+         ],
+         "failureSummary": "Fix any of the following:
+   Target has insufficient size (164.4px by 18px, should be at least 24px by 24px)
+   Target has insufficient space to its closest neighbors. Safe clickable space has a diameter of 18px instead of at least 24px.",
+         "html": "<a href=\"/lab\" class=\"group/link wrap-anywhere link-roll\">",
+         "impact": "serious",
+         "none": Array [],
+         "target": Array [
+           ".link-roll.group\\/link[href$=\"lab\"]",
+         ],
+       },
+       Object {
+         "all": Array [],
+         "any": Array [
+           Object {
+             "data": Object {
+               "height": 18,
+               "minSize": 24,
+               "width": 147.5,
+             },
+             "id": "target-size",
+             "impact": "serious",
+             "message": "Target has insufficient size (147.5px by 18px, should be at least 24px by 24px)",
+             "relatedNodes": Array [],
+           },
+           Object {
+             "data": Object {
+               "closestOffset": 18,
+               "minOffset": 24,
+             },
+             "id": "target-offset",
+             "impact": "serious",
+             "message": "Target has insufficient space to its closest neighbors. Safe clickable space has a diameter of 18px instead of at least 24px.",
+             "relatedNodes": Array [
+               Object {
+                 "html": "<a href=\"https://www.linkedin.com/in/rohin-pidathala-53002842b/\" target=\"_blank\" rel=\"noopener\" class=\"group/link wrap-anywhere link-roll\">",
+                 "target": Array [
+                   "li:nth-child(4) > .link-roll[target=\"_blank\"][rel=\"noopener\"]",
+                 ],
+               },
+             ],
+           },
+         ],
+         "failureSummary": "Fix any of the following:
+   Target has insufficient size (147.5px by 18px, should be at least 24px by 24px)
+   Target has insufficient space to its closest neighbors. Safe clickable space has a diameter of 18px instead of at least 24px.",
+         "html": "<a href=\"#main\" class=\"group/link wrap-anywhere link-roll\">",
+         "impact": "serious",
+         "none": Array [],
+         "target": Array [
+           ".link-roll.group\\/link[href$=\"#main\"]",
+         ],
+       },
+     ],
+     "tags": Array [
+       "cat.sensory-and-visual-cues",
+       "wcag22aa",
+       "wcag258",
+       "EN-301-549v4",
+       "EN-9.2.5.8",
+     ],
+   },
+ ]
```

# Page snapshot

```yaml
- generic [active] [ref=e1]:
  - link "Skip to content" [ref=e2]:
    - /url: "#main"
  - main [ref=e3]:
    - region "Rohin Pidathala" [ref=e4]:
      - generic [ref=e5]:
        - heading "Rohin Pidathala" [level=1] [ref=e6]
        - generic [ref=e7]:
          - navigation "Portfolio sections" [ref=e8]:
            - list [ref=e9]:
              - listitem [ref=e10]:
                - link [ref=e11]:
                  - /url: "#intro"
                  - generic [ref=e12]:
                    - text: Overview
                    - generic [ref=e14]: Overview
              - listitem [ref=e15]:
                - link [ref=e16]:
                  - /url: "#work"
                  - generic [ref=e17]:
                    - text: Selected work
                    - generic [ref=e19]: Selected
                    - generic [ref=e21]: work
              - listitem [ref=e22]:
                - link [ref=e23]:
                  - /url: "#closer-look"
                  - generic [ref=e24]:
                    - text: A Closer Look
                    - generic [ref=e26]: A
                    - generic [ref=e28]: Closer
                    - generic [ref=e30]: Look
              - listitem [ref=e31]:
                - link [ref=e32]:
                  - /url: "#stack"
                  - generic [ref=e33]:
                    - text: Tech Stack
                    - generic [ref=e35]: Tech
                    - generic [ref=e37]: Stack
              - listitem [ref=e38]:
                - link [ref=e39]:
                  - /url: "#research"
                  - generic [ref=e40]:
                    - text: Research and interests
                    - generic [ref=e42]: Research
                    - generic [ref=e44]: and
                    - generic [ref=e46]: interests
              - listitem [ref=e47]:
                - link [ref=e48]:
                  - /url: "#activity"
                  - generic [ref=e49]:
                    - text: Activity
                    - generic [ref=e51]: Activity
              - listitem [ref=e52]:
                - link [ref=e53]:
                  - /url: "#contact"
                  - generic [ref=e54]:
                    - text: Contact
                    - generic [ref=e56]: Contact
          - generic [ref=e57]:
            - button "Search" [ref=e58]
            - group "Theme" [ref=e59]:
              - generic [ref=e61]:
                - generic [ref=e62]:
                  - radio "System" [ref=e63]
                  - text: System
                - generic [ref=e64]:
                  - radio "Light" [ref=e65]
                  - text: Light
                - generic [ref=e66]:
                  - radio "Dark" [ref=e67]
                  - text: Dark
        - paragraph [ref=e68]: Software Developer · AI Engineer · Quantitative Researcher
        - paragraph [ref=e69]: Programming since age 10
        - generic [ref=e70]:
          - paragraph [ref=e71]: I build software and explore how AI systems and quantitative methods can answer practical questions.
          - paragraph [ref=e72]:
            - link [ref=e73]:
              - /url: mailto:rohinpidathala15@gmail.com
              - generic [ref=e74]:
                - text: Email
                - generic [ref=e76]: Email
            - link [ref=e77]:
              - /url: https://github.com/RohinCodes15
              - generic [ref=e78]:
                - text: GitHub
                - generic [ref=e80]: GitHub
              - text: (opens in new tab)
            - link [ref=e83]:
              - /url: https://www.linkedin.com/in/rohin-pidathala-53002842b/
              - generic [ref=e84]:
                - text: LinkedIn
                - generic [ref=e86]: LinkedIn
              - text: (opens in new tab)
    - paragraph [ref=e93]: SOFTWARE DEVELOPERAI ENGINEERQUANTITATIVE RESEARCH
    - region "Selected work" [ref=e94]:
      - generic [ref=e97]:
        - text: "01"
        - heading "Selected work" [level=2] [ref=e98]
      - list [ref=e100]:
        - listitem [ref=e101]:
          - article [ref=e102]:
            - generic [ref=e103]:
              - generic [ref=e104]:
                - heading [level=3] [ref=e105]:
                  - link [ref=e106]:
                    - /url: /work/accessforge
                    - generic [ref=e107]:
                      - text: AccessForge AI
                      - generic [ref=e109]: AccessForge
                      - generic [ref=e111]: AI
                - time [ref=e112]: "2026"
              - paragraph [ref=e113]: Maps pedestrian accessibility barriers and chooses the set of sidewalk repairs that opens the most accessible routes within a budget.
              - paragraph [ref=e114]:
                - generic [ref=e115]: In development
                - text: · Personal project
                - generic [ref=e116]: · Next.js
                - generic [ref=e117]: · TypeScript
                - generic [ref=e118]: · Python
                - generic [ref=e119]: · FastAPI
                - generic [ref=e120]: · PostgreSQL
                - generic [ref=e121]: · PostGIS
                - generic [ref=e122]: · NetworkX
                - generic [ref=e123]: · MapLibre GL JS
                - generic [ref=e124]: · Playwright
              - paragraph [aria-hidden] [ref=e125]: Read case study
            - 'img "AccessForge overview: the headline “Fix the barriers that reconnect the most routes” beside a 3D map of Fremont and counts of places people travel to." [ref=e127]'
        - listitem [ref=e128]:
          - article [ref=e129]:
            - generic [ref=e130]:
              - generic [ref=e131]:
                - heading [level=3] [ref=e132]:
                  - link [ref=e133]:
                    - /url: /work/risklens
                    - generic [ref=e134]:
                      - text: RiskLens Quant
                      - generic [ref=e136]: RiskLens
                      - generic [ref=e138]: Quant
                - time [ref=e139]: "2026"
              - paragraph [ref=e140]: "A portfolio risk analyzer: enter holdings and see historical return, volatility, drawdown, VaR and CVaR, Monte Carlo scenarios, stress tests, and optimized allocations."
              - paragraph [ref=e141]:
                - generic [ref=e142]: Completed
                - text: · Personal project
                - generic [ref=e143]: · Python
                - generic [ref=e144]: · Streamlit
                - generic [ref=e145]: · pandas
                - generic [ref=e146]: · NumPy
                - generic [ref=e147]: · SciPy
                - generic [ref=e148]: · Plotly
              - paragraph [aria-hidden] [ref=e149]: Read case study
            - 'img "RiskLens Monte Carlo chart: a year of hypothetical portfolio wealth paths with the median and 25th–75th and 5th–95th percentile bands." [ref=e151]'
        - listitem [ref=e152]:
          - article [ref=e153]:
            - generic [ref=e154]:
              - generic [ref=e155]:
                - heading [level=3] [ref=e156]:
                  - link [ref=e157]:
                    - /url: /work/ledger
                    - generic [ref=e158]:
                      - text: Ledger
                      - generic [ref=e160]: Ledger
                - time [ref=e161]: "2026"
              - paragraph [ref=e162]: "A desktop game that teaches kids and teens how the stock market works with $1,000 of pretend cash: a simulated market, 35 lessons, a scam-spotting game, and trading-bot duels."
              - paragraph [ref=e163]:
                - generic [ref=e164]: Completed
                - text: · Personal project
                - generic [ref=e165]: · Python
                - generic [ref=e166]: · Pygame
              - paragraph [aria-hidden] [ref=e167]: Read case study
            - 'img "Ledger home screen: a $1,017.94 pretend portfolio, today''s mission, and the watchlist." [ref=e169]'
        - listitem [ref=e170]:
          - article [ref=e171]:
            - generic [ref=e172]:
              - generic [ref=e173]:
                - heading [level=3] [ref=e174]:
                  - link [ref=e175]:
                    - /url: /work/rotation-index
                    - generic [ref=e176]:
                      - text: Rotation Index
                      - generic [ref=e178]: Rotation
                      - generic [ref=e180]: Index
                - time [ref=e181]: "2026"
              - paragraph [ref=e182]: Estimates NBA player impact with regularized adjusted plus-minus, fitted on possession-level play-by-play so each player is credited relative to teammates and opponents.
              - paragraph [ref=e183]:
                - generic [ref=e184]: In development
                - text: · Personal project
                - generic [ref=e185]: · Python
                - generic [ref=e186]: · Flask
                - generic [ref=e187]: · pandas
                - generic [ref=e188]: · NumPy
              - paragraph [aria-hidden] [ref=e189]: Read case study
            - paragraph [ref=e190]: The data pipeline, audit gate, and local dashboard work. Season estimates stay hidden until every one of the 1,230 games in the 2025–26 regular season validates.
        - listitem [ref=e191]:
          - article [ref=e192]:
            - generic [ref=e193]:
              - generic [ref=e194]:
                - heading [level=3] [ref=e195]:
                  - link [ref=e196]:
                    - /url: /work/portfolio
                    - generic [ref=e197]:
                      - text: Developer portfolio
                      - generic [ref=e199]: Developer
                      - generic [ref=e201]: portfolio
                - time [ref=e202]: "2026"
              - paragraph [ref=e203]: An editorial portfolio with a server-rendered GitHub activity calendar and an optional interactive terrain.
              - paragraph [ref=e204]:
                - generic [ref=e205]: In development
                - text: · Personal project
                - generic [ref=e206]: · Next.js
                - generic [ref=e207]: · React
                - generic [ref=e208]: · TypeScript
                - generic [ref=e209]: · Tailwind CSS
                - generic [ref=e210]: · Motion
                - generic [ref=e211]: · Playwright
              - paragraph [aria-hidden] [ref=e212]: Read case study
            - 'img "Portfolio homepage in the dark theme: the name Rohin Pidathala, the role line, contact links, the section rail, and the three identity lines Software Developer, AI Engineer, and Quantitative Research." [ref=e214]'
    - region "A Closer Look" [ref=e215]:
      - generic [ref=e218]:
        - text: "02"
        - heading "A Closer Look" [level=2] [ref=e219]
      - generic [ref=e220]:
        - paragraph [ref=e221]: Exploring the interfaces, systems, and ideas behind my work.
        - generic [ref=e222]:
          - generic [ref=e223]:
            - link [ref=e224]:
              - /url: /work/accessforge
              - 'img "AccessForge overview: the headline “Fix the barriers that reconnect the most routes” beside a 3D map of Fremont and counts of places people travel to." [ref=e225]'
              - text: AccessForge AI
            - link [ref=e226]:
              - /url: /work/risklens
              - img "RiskLens histogram of historical daily portfolio returns with the 95% value-at-risk cutoff marked." [ref=e227]
              - text: RiskLens Quant
            - link [ref=e228]:
              - /url: /work/ledger
              - 'img "Market screen: the market mood, the top gainer and loser, and a stock list with price charts." [ref=e229]'
              - text: Ledger
            - link [ref=e230]:
              - /url: /work/ledger
              - 'img "Portfolio screen: net worth, cash, invested amount and dividends, a wealth milestone, and a portfolio health grade." [ref=e231]'
              - text: Ledger
          - generic [ref=e232]:
            - link [ref=e233]:
              - /url: /work/ledger
              - 'img "Ledger home screen: a $1,017.94 pretend portfolio, today''s mission, and the watchlist." [ref=e234]'
              - text: Ledger
            - link [ref=e235]:
              - /url: /work/risklens
              - 'img "RiskLens efficient frontier: expected return against volatility, marking the current, minimum-volatility, and maximum-Sharpe portfolios." [ref=e236]'
              - text: RiskLens Quant
            - link [ref=e237]:
              - /url: /work/accessforge
              - 'img "AccessForge repair planner story: a wheelchair user’s short trip to Washington Hospital blocked by a raised curb." [ref=e238]'
              - text: AccessForge AI
            - link [ref=e239]:
              - /url: /work/risklens
              - img "RiskLens chart comparing the portfolio’s cumulative return with the S&P 500 (SPY) over the same dates." [ref=e240]
              - text: RiskLens Quant
            - link [ref=e241]:
              - /url: /work/ledger
              - 'img "Bot battle setup: how to win, a scouting report on the rival bot, and a choice of 60 or 90 second rounds." [ref=e242]'
              - text: Ledger
          - generic [ref=e243]:
            - link [ref=e244]:
              - /url: /work/risklens
              - 'img "RiskLens Monte Carlo chart: a year of hypothetical portfolio wealth paths with the median and 25th–75th and 5th–95th percentile bands." [ref=e245]'
              - text: RiskLens Quant
            - link [ref=e246]:
              - /url: /work/accessforge
              - 'img "AccessForge barrier map: Fremont streets and buildings in 3D, destinations shaded by type, with a barrier details panel." [ref=e247]'
              - text: AccessForge AI
            - link [ref=e248]:
              - /url: /work/ledger
              - 'img "Scam Detective: a giveaway message asking for a home address and card number, with Scam and Legit buttons." [ref=e249]'
              - text: Ledger
            - link [ref=e250]:
              - /url: /work/risklens
              - 'img "RiskLens drawdown chart: how far the portfolio sat below its previous peak on each day, reaching about −20%." [ref=e251]'
              - text: RiskLens Quant
            - link [ref=e252]:
              - /url: /work/ledger
              - 'img "A lesson card from Making a budget: a budget is a plan for your money before you spend it." [ref=e253]'
              - text: Ledger
    - region "Tech Stack" [ref=e254]:
      - generic [ref=e257]:
        - text: "03"
        - heading "Tech Stack" [level=2] [ref=e258]
      - generic [ref=e260]:
        - paragraph [ref=e261]: The technologies behind my ideas.
        - list "Featured technologies" [ref=e263]:
          - listitem [ref=e264]:
            - link "Python Used in AccessForge AI, RiskLens Quant, Ledger, Rotation Index" [ref=e265]:
              - /url: /work/accessforge
          - listitem [ref=e267]:
            - link "TypeScript Used in AccessForge AI, Developer portfolio" [ref=e268]:
              - /url: /work/accessforge
          - listitem [ref=e270]:
            - link "React Used in Developer portfolio" [ref=e271]:
              - /url: /work/portfolio
          - listitem [ref=e273]:
            - link "Next.js Used in AccessForge AI, Developer portfolio" [ref=e274]:
              - /url: /work/accessforge
          - listitem [ref=e276]:
            - generic [ref=e277]: C++
          - listitem [ref=e279]:
            - generic [ref=e280]: PyTorch
          - listitem [ref=e282]:
            - link "PostgreSQL Used in AccessForge AI" [ref=e283]:
              - /url: /work/accessforge
          - listitem [ref=e285]:
            - link "GitHub" [ref=e286]:
              - /url: https://github.com/RohinCodes15
          - listitem [ref=e288]:
            - link "FastAPI Used in AccessForge AI" [ref=e289]:
              - /url: /work/accessforge
        - generic [ref=e291]:
          - group "Filter technologies" [ref=e292]:
            - button "All" [pressed] [ref=e293]: All44
            - button "Languages" [ref=e294]: Languages7
            - button "Frameworks" [ref=e295]: Frameworks13
            - button "Data" [ref=e296]: Data4
            - button "AI and quant" [ref=e297]: AI and quant11
            - button "Tools" [ref=e298]: Tools9
          - generic [ref=e299]:
            - status [ref=e300]: 44 technologies shown
            - list [ref=e301]:
              - listitem [ref=e302]:
                - text: Python
                - generic [ref=e303]:
                  - text: Used in
                  - link "AccessForge AI" [ref=e305]:
                    - /url: /work/accessforge
                  - generic [ref=e306]:
                    - text: ","
                    - link "RiskLens Quant" [ref=e307]:
                      - /url: /work/risklens
                  - generic [ref=e308]:
                    - text: ","
                    - link "Ledger" [ref=e309]:
                      - /url: /work/ledger
                  - generic [ref=e310]:
                    - text: ","
                    - link "Rotation Index" [ref=e311]:
                      - /url: /work/rotation-index
                - text: Languages
              - listitem [ref=e312]: JavaScriptLanguages
              - listitem [ref=e313]: C++Languages
              - listitem [ref=e314]: CSSLanguages
              - listitem [ref=e315]: HTMLLanguages
              - listitem [ref=e316]:
                - text: TypeScript
                - generic [ref=e317]:
                  - text: Used in
                  - link "AccessForge AI" [ref=e319]:
                    - /url: /work/accessforge
                  - generic [ref=e320]:
                    - text: ","
                    - link "Developer portfolio" [ref=e321]:
                      - /url: /work/portfolio
                - text: Languages
              - listitem [ref=e322]: JavaLanguages
              - listitem [ref=e323]: ExpoFrameworks
              - listitem [ref=e324]:
                - text: Motion
                - generic [ref=e325]:
                  - text: Used in
                  - link "Developer portfolio" [ref=e327]:
                    - /url: /work/portfolio
                - text: Frameworks
              - listitem [ref=e328]:
                - text: Next.js
                - generic [ref=e329]:
                  - text: Used in
                  - link "AccessForge AI" [ref=e331]:
                    - /url: /work/accessforge
                  - generic [ref=e332]:
                    - text: ","
                    - link "Developer portfolio" [ref=e333]:
                      - /url: /work/portfolio
                - text: Frameworks
              - listitem [ref=e334]: React NativeFrameworks
              - listitem [ref=e335]:
                - text: React
                - generic [ref=e336]:
                  - text: Used in
                  - link "Developer portfolio" [ref=e338]:
                    - /url: /work/portfolio
                - text: Frameworks
              - listitem [ref=e339]:
                - text: FastAPI
                - generic [ref=e340]:
                  - text: Used in
                  - link "AccessForge AI" [ref=e342]:
                    - /url: /work/accessforge
                - text: Frameworks
              - listitem [ref=e343]: Node.jsFrameworks
              - listitem [ref=e344]:
                - text: Tailwind CSS
                - generic [ref=e345]:
                  - text: Used in
                  - link "Developer portfolio" [ref=e347]:
                    - /url: /work/portfolio
                - text: Frameworks
              - listitem [ref=e348]:
                - text: Flask
                - generic [ref=e349]:
                  - text: Used in
                  - link "Rotation Index" [ref=e351]:
                    - /url: /work/rotation-index
                - text: Frameworks
              - listitem [ref=e352]:
                - text: Streamlit
                - generic [ref=e353]:
                  - text: Used in
                  - link "RiskLens Quant" [ref=e355]:
                    - /url: /work/risklens
                - text: Frameworks
              - listitem [ref=e356]:
                - text: MapLibre GL JS
                - generic [ref=e357]:
                  - text: Used in
                  - link "AccessForge AI" [ref=e359]:
                    - /url: /work/accessforge
                - text: Frameworks
              - listitem [ref=e360]:
                - text: Plotly
                - generic [ref=e361]:
                  - text: Used in
                  - link "RiskLens Quant" [ref=e363]:
                    - /url: /work/risklens
                - text: Frameworks
              - listitem [ref=e364]:
                - text: Pygame
                - generic [ref=e365]:
                  - text: Used in
                  - link "Ledger" [ref=e367]:
                    - /url: /work/ledger
                - text: Frameworks
              - listitem [ref=e368]: MongoDBData
              - listitem [ref=e369]: SupabaseData
              - listitem [ref=e370]:
                - text: PostgreSQL
                - generic [ref=e371]:
                  - text: Used in
                  - link "AccessForge AI" [ref=e373]:
                    - /url: /work/accessforge
                - text: Data
              - listitem [ref=e374]:
                - text: PostGIS
                - generic [ref=e375]:
                  - text: Used in
                  - link "AccessForge AI" [ref=e377]:
                    - /url: /work/accessforge
                - text: Data
              - listitem [ref=e378]:
                - text: pandas
                - generic [ref=e379]:
                  - text: Used in
                  - link "RiskLens Quant" [ref=e381]:
                    - /url: /work/risklens
                  - generic [ref=e382]:
                    - text: ","
                    - link "Rotation Index" [ref=e383]:
                      - /url: /work/rotation-index
                - text: AI and quant
              - listitem [ref=e384]: PyTorchAI and quant
              - listitem [ref=e385]: Claude APIAI and quant
              - listitem [ref=e386]: Hugging FaceAI and quant
              - listitem [ref=e387]: Monte Carlo simulationAI and quant
              - listitem [ref=e388]: Statistical modelingAI and quant
              - listitem [ref=e389]: OpenAI APIAI and quant
              - listitem [ref=e390]: scikit-learnAI and quant
              - listitem [ref=e391]:
                - text: NumPy
                - generic [ref=e392]:
                  - text: Used in
                  - link "RiskLens Quant" [ref=e394]:
                    - /url: /work/risklens
                  - generic [ref=e395]:
                    - text: ","
                    - link "Rotation Index" [ref=e396]:
                      - /url: /work/rotation-index
                - text: AI and quant
              - listitem [ref=e397]:
                - text: SciPy
                - generic [ref=e398]:
                  - text: Used in
                  - link "RiskLens Quant" [ref=e400]:
                    - /url: /work/risklens
                - text: AI and quant
              - listitem [ref=e401]:
                - text: NetworkX
                - generic [ref=e402]:
                  - text: Used in
                  - link "AccessForge AI" [ref=e404]:
                    - /url: /work/accessforge
                - text: AI and quant
              - listitem [ref=e405]: GitTools
              - listitem [ref=e406]: GitHub ActionsTools
              - listitem [ref=e407]: VercelTools
              - listitem [ref=e408]: Google CloudTools
              - listitem [ref=e409]: FigmaTools
              - listitem [ref=e410]: VS CodeTools
              - listitem [ref=e411]: GitHubTools
              - listitem [ref=e412]: ArduinoTools
              - listitem [ref=e413]:
                - text: Playwright
                - generic [ref=e414]:
                  - text: Used in
                  - link "AccessForge AI" [ref=e416]:
                    - /url: /work/accessforge
                  - generic [ref=e417]:
                    - text: ","
                    - link "Developer portfolio" [ref=e418]:
                      - /url: /work/portfolio
                - text: Tools
    - region "Research and interests" [ref=e419]:
      - generic [ref=e422]:
        - text: "04"
        - heading "Research and interests" [level=2] [ref=e423]
      - generic [ref=e424]:
        - generic [ref=e425]:
          - generic [ref=e426]:
            - term [ref=e427]: Software development
            - definition [ref=e428]: Accessible interfaces and reliable software systems.
          - generic [ref=e429]:
            - term [ref=e430]: AI engineering
            - definition [ref=e431]: Building with models and evaluating how they behave.
          - generic [ref=e432]:
            - term [ref=e433]: Quantitative research
            - definition [ref=e434]: Using data and reproducible experiments to investigate questions.
        - paragraph [ref=e435]:
          - link "Open the research lab" [ref=e436]:
            - /url: /lab
          - text: · interactive educational demonstrations on synthetic data
    - region "Activity" [ref=e437]:
      - generic [ref=e440]:
        - text: "05"
        - heading "Activity" [level=2] [ref=e441]
      - figure "Fig. 1 · GitHub contributions" [ref=e443]:
        - generic [ref=e445]:
          - paragraph [ref=e446]: GitHub activity unavailable
          - paragraph [ref=e447]:
            - link "View profile on GitHub (opens in new tab)" [ref=e448]:
              - /url: https://github.com/RohinCodes15
    - region "Contact" [ref=e452]:
      - generic [ref=e455]:
        - text: "06"
        - heading "Contact" [level=2] [ref=e456]
      - generic [ref=e458]:
        - generic [ref=e459]:
          - link "rohinpidathala15@gmail.com" [ref=e460]:
            - /url: mailto:rohinpidathala15@gmail.com
          - button "Copy email" [ref=e461]
        - list [ref=e462]:
          - listitem [ref=e463]:
            - link [ref=e464]:
              - /url: https://github.com/RohinCodes15
              - generic [ref=e465]:
                - text: GitHub
                - generic [ref=e467]: GitHub
              - text: (opens in new tab)
          - listitem [ref=e470]:
            - link [ref=e471]:
              - /url: https://www.linkedin.com/in/rohin-pidathala-53002842b/
              - generic [ref=e472]:
                - text: LinkedIn
                - generic [ref=e474]: LinkedIn
              - text: (opens in new tab)
  - contentinfo [ref=e477]:
    - generic [ref=e478]:
      - paragraph [ref=e479]:
        - link [ref=e480]:
          - /url: mailto:rohinpidathala15@gmail.com
          - generic [ref=e481]:
            - text: rohinpidathala15@gmail.com
            - generic [ref=e483]: rohinpidathala15@gmail.com
      - navigation "Footer" [ref=e484]:
        - list [ref=e485]:
          - listitem [ref=e486]:
            - link [ref=e487]:
              - /url: /#work
              - generic [ref=e488]:
                - text: Work
                - generic [ref=e490]: Work
          - listitem [ref=e491]:
            - link [ref=e492]:
              - /url: /lab
              - generic [ref=e493]:
                - text: Research lab
                - generic [ref=e495]: Research
                - generic [ref=e497]: lab
          - listitem [ref=e498]:
            - link [ref=e499]:
              - /url: https://github.com/RohinCodes15
              - generic [ref=e500]:
                - text: GitHub
                - generic [ref=e502]: GitHub
              - text: (opens in new tab)
          - listitem [ref=e505]:
            - link [ref=e506]:
              - /url: https://www.linkedin.com/in/rohin-pidathala-53002842b/
              - generic [ref=e507]:
                - text: LinkedIn
                - generic [ref=e509]: LinkedIn
              - text: (opens in new tab)
          - listitem [ref=e512]:
            - link [ref=e513]:
              - /url: "#main"
              - generic [ref=e514]:
                - text: Back to top
                - generic [ref=e516]: Back
                - generic [ref=e518]: to
                - generic [ref=e520]: top
      - paragraph [ref=e521]: Rohin Pidathala
```

# Test source

```ts
  1   | import AxeBuilder from "@axe-core/playwright";
  2   | import { expect, test } from "@playwright/test";
  3   | 
  4   | test("the production homepage exposes the portfolio heading without JavaScript", async ({ browser, baseURL }, testInfo) => {
  5   |   const page = await browser.newPage({ ...testInfo.project.use, baseURL, javaScriptEnabled: false });
  6   |   try {
  7   |     const response = await page.goto("/");
  8   |     expect(response?.status()).toBe(200);
  9   |     const headers = response?.headers();
  10  |     expect(headers?.["x-robots-tag"]).toContain("noindex");
  11  |     expect(headers?.["x-content-type-options"]).toBe("nosniff");
  12  |     expect(headers?.["content-security-policy"]).toContain("frame-ancestors 'none'");
  13  |     expect(headers?.["content-security-policy"]).not.toContain("'unsafe-eval'");
  14  |     expect(headers?.["x-powered-by"]).toBeUndefined();
  15  |     await expect(page.getByRole("main").getByRole("heading", { level: 1 })).toHaveText("Rohin Pidathala");
  16  |     await expect(page).toHaveTitle(/Rohin Pidathala/);
  17  |     await expect(page.getByRole("link", { name: /View activity on GitHub/ })).toBeVisible();
  18  |     await expect(page.getByRole("button", { name: "Languages" })).toBeHidden();
  19  |     // The stack inventory rows render without JavaScript (the featured logo row also names TypeScript).
  20  |     await expect(page.getByText("TypeScript", { exact: true }).last()).toBeVisible();
  21  |     // The theme toggle needs JavaScript, so it stays hidden (keeping its space) and the OS theme applies.
  22  |     await expect(page.getByRole("group", { name: "Theme" })).toBeHidden();
  23  |   } finally {
  24  |     await page.close();
  25  |   }
  26  | });
  27  | 
  28  | test("the page grid reflows across the viewport range", async ({ page }, testInfo) => {
  29  |   test.skip(testInfo.project.name !== "desktop", "These widths are exercised in one Chromium project.");
  30  | 
  31  |   for (const [width, columns, margin] of [
  32  |     [320, 4, 20],
  33  |     [639, 4, 20],
  34  |     [640, 8, 32],
  35  |     [768, 8, 32],
  36  |     [1023, 8, 32],
  37  |     [1024, 12, 51.2],
  38  |     [1440, 12, 64],
  39  |     [2560, 12, 64],
  40  |   ]) {
  41  |     await page.setViewportSize({ width, height: 900 });
  42  |     await page.goto("/");
  43  |     const layout = await page.getByRole("heading", { level: 1 }).evaluate((heading) => {
  44  |       const grid = heading.parentElement!;
  45  |       const style = getComputedStyle(grid);
  46  |       const rect = grid.getBoundingClientRect();
  47  |       const { scrollWidth, clientWidth } = document.documentElement;
  48  |       return {
  49  |         columns: style.gridTemplateColumns.split(" ").length,
  50  |         margin: Number.parseFloat(style.paddingInlineStart),
  51  |         start: rect.left,
  52  |         width: rect.width,
  53  |         headingColumn: getComputedStyle(heading).gridColumnStart,
  54  |         overflows: scrollWidth > clientWidth,
  55  |       };
  56  |     });
  57  |     expect(layout.columns, `${width}px columns`).toBe(columns);
  58  |     expect(layout.margin, `${width}px margin`).toBeCloseTo(margin, 0);
  59  |     expect(layout.start, `${width}px left edge`).toBe(0);
  60  |     expect(layout.width, `${width}px content cap`).toBeCloseTo(Math.min(width, 1320 + 2 * margin), 0);
  61  |     expect(layout.headingColumn, `${width}px heading placement`).toBe(columns === 12 ? "4" : "1");
  62  |     expect(layout.overflows, `${width}px horizontal overflow`).toBe(false);
  63  |   }
  64  | });
  65  | 
  66  | for (const colorScheme of ["light", "dark"] as const) {
  67  |   test(`the production homepage passes axe in ${colorScheme} mode`, async ({ page }) => {
  68  |     await page.emulateMedia({ colorScheme });
  69  |     await page.goto("/");
  70  |     const results = await new AxeBuilder({ page })
  71  |       .withTags(["wcag2a", "wcag2aa", "wcag21a", "wcag21aa", "wcag22aa"])
  72  |       .analyze();
> 73  |     expect(results.violations).toEqual([]);
      |                                ^ Error: expect(received).toEqual(expected) // deep equality
  74  |   });
  75  | }
  76  | 
  77  | test("the development showcase is not part of the production build", async ({ page }) => {
  78  |   const response = await page.goto("/showcase");
  79  |   expect(response?.status()).toBe(404);
  80  | });
  81  | 
  82  | test("the homepage gallery links every screen to its case study", async ({ page }) => {
  83  |   await page.goto("/");
  84  |   await expect(page.getByRole("heading", { level: 2, name: "A Closer Look" })).toBeVisible();
  85  |   const links = page.locator(".parallax-gallery a");
  86  |   await expect(links).toHaveCount(14);
  87  |   for (const href of await links.evaluateAll((anchors) => anchors.map((anchor) => anchor.getAttribute("href") ?? ""))) expect(href).toMatch(/^\/work\/(accessforge|risklens|ledger)$/);
  88  |   for (const alt of await links.locator("img").evaluateAll((images) => images.map((image) => image.getAttribute("alt") ?? ""))) expect(alt.length).toBeGreaterThan(20);
  89  |   await links.first().focus();
  90  |   await expect(links.first().locator(".gallery-label")).toHaveCSS("opacity", "1");
  91  | });
  92  | 
  93  | test("the stack logos name themselves on keyboard focus and link to projects", async ({ page }) => {
  94  |   await page.goto("/");
  95  |   const logos = page.getByRole("list", { name: "Featured technologies" }).getByRole("listitem");
  96  |   await expect(logos).toHaveCount(9);
  97  |   const python = logos.first().locator(".logo-assembly-item");
  98  |   await expect(python).toHaveAttribute("href", "/work/accessforge");
  99  |   await python.focus();
  100 |   await expect(python.locator(".logo-assembly-label")).toHaveCSS("opacity", "1");
  101 |   await expect(python).toContainText("Python");
  102 |   await expect(page.getByRole("list", { name: "Featured technologies" })).toContainText("C++");
  103 | });
  104 | 
  105 | test("navigation labels roll on keyboard focus without changing their names or size", async ({ page }, testInfo) => {
  106 |   await page.goto("/");
  107 |   const link = page.getByRole("navigation", { name: "Portfolio sections" }).getByRole("link", { name: "Selected work", exact: true });
  108 |   const before = await link.boundingBox();
  109 |   await link.focus();
  110 |   const letter = link.locator(".text-roll-letter").first();
  111 |   if (testInfo.project.name === "desktop") await expect(letter).not.toHaveCSS("transform", "none");
  112 |   expect(await link.boundingBox()).toEqual(before);
  113 |   await expect(link.locator("[aria-hidden='true']").first()).toBeAttached();
  114 | });
  115 | 
  116 | test("featured projects stack as pinned panels on wide screens and stay a plain list under reduced motion", async ({ page }) => {
  117 |   await page.setViewportSize({ width: 1440, height: 900 });
  118 |   await page.goto("/");
  119 |   const items = page.locator(".project-stack-item");
  120 |   await expect(items).toHaveCount(5);
  121 |   await expect(items.first()).toHaveCSS("position", "sticky");
  122 |   await expect(page.getByRole("region", { name: "Selected work" }).getByRole("img")).toHaveCount(4);
  123 |   await page.emulateMedia({ reducedMotion: "reduce" });
  124 |   await expect(items.first()).toHaveCSS("position", "static");
  125 | });
  126 | 
```