# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: theme.spec.ts >> Light overrides a dark OS and persists across reloads
- Location: tests/theme.spec.ts:46:3

# Error details

```
Error: browserType.launch: Failed to launch the browser process.
Browser logs:

<launching> /Users/rohinpidathala/Library/Caches/ms-playwright/firefox-1572/firefox/Nightly.app/Contents/MacOS/firefox -no-remote -headless -profile /var/folders/sc/6k61d6_n0z78917zsdvswbwr0000gn/T/playwright_firefoxdev_profile-MzsTcf -juggler-pipe -silent
<launched> pid=73628
[pid=73628][err] *** You are running in headless mode.
[pid=73628][err] Could not find profile folder.
[pid=73628] <process did exit: exitCode=1, signal=null>
[pid=73628] starting temporary directories cleanup
Call log:
  - <launching> /Users/rohinpidathala/Library/Caches/ms-playwright/firefox-1572/firefox/Nightly.app/Contents/MacOS/firefox -no-remote -headless -profile /var/folders/sc/6k61d6_n0z78917zsdvswbwr0000gn/T/playwright_firefoxdev_profile-MzsTcf -juggler-pipe -silent
  - <launched> pid=73628
  - [pid=73628][err] *** You are running in headless mode.
  - [pid=73628][err] Could not find profile folder.
  - [pid=73628] <process did exit: exitCode=1, signal=null>
  - [pid=73628] starting temporary directories cleanup
  - [pid=73628] <gracefully close start>
  - [pid=73628] <kill>
  - [pid=73628] <skipped force kill spawnedProcess.killed=false processClosed=true>
  - [pid=73628] finished temporary directories cleanup
  - [pid=73628] <gracefully close end>

```