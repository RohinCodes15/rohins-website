# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: activity-states.spec.ts >> a verified calendar renders totals, dates, and the date list
- Location: tests/activity-states.spec.ts:10:1

# Error details

```
Error: browserType.launch: Failed to launch the browser process.
Browser logs:

<launching> /Users/rohinpidathala/Library/Caches/ms-playwright/firefox-1572/firefox/Nightly.app/Contents/MacOS/firefox -no-remote -headless -profile /var/folders/sc/6k61d6_n0z78917zsdvswbwr0000gn/T/playwright_firefoxdev_profile-93mhaW -juggler-pipe -silent
<launched> pid=73564
[pid=73564][err] *** You are running in headless mode.
[pid=73564][err] Could not find profile folder.
[pid=73564] <process did exit: exitCode=1, signal=null>
[pid=73564] starting temporary directories cleanup
Call log:
  - <launching> /Users/rohinpidathala/Library/Caches/ms-playwright/firefox-1572/firefox/Nightly.app/Contents/MacOS/firefox -no-remote -headless -profile /var/folders/sc/6k61d6_n0z78917zsdvswbwr0000gn/T/playwright_firefoxdev_profile-93mhaW -juggler-pipe -silent
  - <launched> pid=73564
  - [pid=73564][err] *** You are running in headless mode.
  - [pid=73564][err] Could not find profile folder.
  - [pid=73564] <process did exit: exitCode=1, signal=null>
  - [pid=73564] starting temporary directories cleanup
  - [pid=73564] <gracefully close start>
  - [pid=73564] <kill>
  - [pid=73564] <skipped force kill spawnedProcess.killed=false processClosed=true>
  - [pid=73564] finished temporary directories cleanup
  - [pid=73564] <gracefully close end>

```