# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: home.spec.ts >> the production homepage exposes the portfolio heading without JavaScript
- Location: tests/home.spec.ts:4:1

# Error details

```
Error: browserType.launch: Failed to launch the browser process.
Browser logs:

<launching> /Users/rohinpidathala/Library/Caches/ms-playwright/firefox-1572/firefox/Nightly.app/Contents/MacOS/firefox -no-remote -headless -profile /var/folders/sc/6k61d6_n0z78917zsdvswbwr0000gn/T/playwright_firefoxdev_profile-rWW688 -juggler-pipe -silent
<launched> pid=73566
[pid=73566][err] *** You are running in headless mode.
[pid=73566][err] Could not find profile folder.
[pid=73566] <process did exit: exitCode=1, signal=null>
[pid=73566] starting temporary directories cleanup
Call log:
  - <launching> /Users/rohinpidathala/Library/Caches/ms-playwright/firefox-1572/firefox/Nightly.app/Contents/MacOS/firefox -no-remote -headless -profile /var/folders/sc/6k61d6_n0z78917zsdvswbwr0000gn/T/playwright_firefoxdev_profile-rWW688 -juggler-pipe -silent
  - <launched> pid=73566
  - [pid=73566][err] *** You are running in headless mode.
  - [pid=73566][err] Could not find profile folder.
  - [pid=73566] <process did exit: exitCode=1, signal=null>
  - [pid=73566] starting temporary directories cleanup
  - [pid=73566] <gracefully close start>
  - [pid=73566] <kill>
  - [pid=73566] <skipped force kill spawnedProcess.killed=false processClosed=true>
  - [pid=73566] finished temporary directories cleanup
  - [pid=73566] <gracefully close end>

```