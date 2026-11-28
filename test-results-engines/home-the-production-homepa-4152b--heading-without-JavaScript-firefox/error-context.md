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

<launching> /Users/rohinpidathala/Library/Caches/ms-playwright/firefox-1572/firefox/Nightly.app/Contents/MacOS/firefox -no-remote -headless -profile /var/folders/sc/6k61d6_n0z78917zsdvswbwr0000gn/T/playwright_firefoxdev_profile-MM54i2 -juggler-pipe -silent
<launched> pid=69258
[pid=69258][err] *** You are running in headless mode.
[pid=69258][err] Could not find profile folder.
[pid=69258] <process did exit: exitCode=1, signal=null>
[pid=69258] starting temporary directories cleanup
Call log:
  - <launching> /Users/rohinpidathala/Library/Caches/ms-playwright/firefox-1572/firefox/Nightly.app/Contents/MacOS/firefox -no-remote -headless -profile /var/folders/sc/6k61d6_n0z78917zsdvswbwr0000gn/T/playwright_firefoxdev_profile-MM54i2 -juggler-pipe -silent
  - <launched> pid=69258
  - [pid=69258][err] *** You are running in headless mode.
  - [pid=69258][err] Could not find profile folder.
  - [pid=69258] <process did exit: exitCode=1, signal=null>
  - [pid=69258] starting temporary directories cleanup
  - [pid=69258] <gracefully close start>
  - [pid=69258] <kill>
  - [pid=69258] <skipped force kill spawnedProcess.killed=false processClosed=true>
  - [pid=69258] finished temporary directories cleanup
  - [pid=69258] <gracefully close end>

```