# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: portfolio.spec.ts >> a case study shows its status, sections, and captioned figure
- Location: tests/portfolio.spec.ts:46:1

# Error details

```
Error: browserType.launch: Failed to launch the browser process.
Browser logs:

<launching> /Users/rohinpidathala/Library/Caches/ms-playwright/firefox-1572/firefox/Nightly.app/Contents/MacOS/firefox -no-remote -headless -profile /var/folders/sc/6k61d6_n0z78917zsdvswbwr0000gn/T/playwright_firefoxdev_profile-W8QmlX -juggler-pipe -silent
<launched> pid=69316
[pid=69316][err] *** You are running in headless mode.
[pid=69316][err] Could not find profile folder.
[pid=69316] <process did exit: exitCode=1, signal=null>
[pid=69316] starting temporary directories cleanup
Call log:
  - <launching> /Users/rohinpidathala/Library/Caches/ms-playwright/firefox-1572/firefox/Nightly.app/Contents/MacOS/firefox -no-remote -headless -profile /var/folders/sc/6k61d6_n0z78917zsdvswbwr0000gn/T/playwright_firefoxdev_profile-W8QmlX -juggler-pipe -silent
  - <launched> pid=69316
  - [pid=69316][err] *** You are running in headless mode.
  - [pid=69316][err] Could not find profile folder.
  - [pid=69316] <process did exit: exitCode=1, signal=null>
  - [pid=69316] starting temporary directories cleanup
  - [pid=69316] <gracefully close start>
  - [pid=69316] <kill>
  - [pid=69316] <skipped force kill spawnedProcess.killed=false processClosed=true>
  - [pid=69316] finished temporary directories cleanup
  - [pid=69316] <gracefully close end>

```