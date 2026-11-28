# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: portfolio.spec.ts >> activity reports unavailable without a credential and never loads the terrain
- Location: tests/portfolio.spec.ts:3:1

# Error details

```
Error: browserType.launch: Failed to launch the browser process.
Browser logs:

<launching> /Users/rohinpidathala/Library/Caches/ms-playwright/firefox-1572/firefox/Nightly.app/Contents/MacOS/firefox -no-remote -headless -profile /var/folders/sc/6k61d6_n0z78917zsdvswbwr0000gn/T/playwright_firefoxdev_profile-bl7BRa -juggler-pipe -silent
<launched> pid=73600
[pid=73600][err] *** You are running in headless mode.
[pid=73600][err] Could not find profile folder.
[pid=73600] <process did exit: exitCode=1, signal=null>
[pid=73600] starting temporary directories cleanup
Call log:
  - <launching> /Users/rohinpidathala/Library/Caches/ms-playwright/firefox-1572/firefox/Nightly.app/Contents/MacOS/firefox -no-remote -headless -profile /var/folders/sc/6k61d6_n0z78917zsdvswbwr0000gn/T/playwright_firefoxdev_profile-bl7BRa -juggler-pipe -silent
  - <launched> pid=73600
  - [pid=73600][err] *** You are running in headless mode.
  - [pid=73600][err] Could not find profile folder.
  - [pid=73600] <process did exit: exitCode=1, signal=null>
  - [pid=73600] starting temporary directories cleanup
  - [pid=73600] <gracefully close start>
  - [pid=73600] <kill>
  - [pid=73600] <skipped force kill spawnedProcess.killed=false processClosed=true>
  - [pid=73600] finished temporary directories cleanup
  - [pid=73600] <gracefully close end>

```