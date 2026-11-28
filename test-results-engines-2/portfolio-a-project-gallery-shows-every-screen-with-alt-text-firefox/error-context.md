# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: portfolio.spec.ts >> a project gallery shows every screen with alt text
- Location: tests/portfolio.spec.ts:97:1

# Error details

```
Error: browserType.launch: Failed to launch the browser process.
Browser logs:

<launching> /Users/rohinpidathala/Library/Caches/ms-playwright/firefox-1572/firefox/Nightly.app/Contents/MacOS/firefox -no-remote -headless -profile /var/folders/sc/6k61d6_n0z78917zsdvswbwr0000gn/T/playwright_firefoxdev_profile-uIsxen -juggler-pipe -silent
<launched> pid=73675
[pid=73675][err] *** You are running in headless mode.
[pid=73675][err] Could not find profile folder.
[pid=73675] <process did exit: exitCode=1, signal=null>
[pid=73675] starting temporary directories cleanup
Call log:
  - <launching> /Users/rohinpidathala/Library/Caches/ms-playwright/firefox-1572/firefox/Nightly.app/Contents/MacOS/firefox -no-remote -headless -profile /var/folders/sc/6k61d6_n0z78917zsdvswbwr0000gn/T/playwright_firefoxdev_profile-uIsxen -juggler-pipe -silent
  - <launched> pid=73675
  - [pid=73675][err] *** You are running in headless mode.
  - [pid=73675][err] Could not find profile folder.
  - [pid=73675] <process did exit: exitCode=1, signal=null>
  - [pid=73675] starting temporary directories cleanup
  - [pid=73675] <gracefully close start>
  - [pid=73675] <kill>
  - [pid=73675] <skipped force kill spawnedProcess.killed=false processClosed=true>
  - [pid=73675] finished temporary directories cleanup
  - [pid=73675] <gracefully close end>

```