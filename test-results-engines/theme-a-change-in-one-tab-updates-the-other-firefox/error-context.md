# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: theme.spec.ts >> a change in one tab updates the other
- Location: tests/theme.spec.ts:119:1

# Error details

```
Error: browserType.launch: Failed to launch the browser process.
Browser logs:

<launching> /Users/rohinpidathala/Library/Caches/ms-playwright/firefox-1572/firefox/Nightly.app/Contents/MacOS/firefox -no-remote -headless -profile /var/folders/sc/6k61d6_n0z78917zsdvswbwr0000gn/T/playwright_firefoxdev_profile-Jd32FM -juggler-pipe -silent
<launched> pid=69418
[pid=69418][err] *** You are running in headless mode.
[pid=69418][err] Could not find profile folder.
[pid=69418] <process did exit: exitCode=1, signal=null>
[pid=69418] starting temporary directories cleanup
Call log:
  - <launching> /Users/rohinpidathala/Library/Caches/ms-playwright/firefox-1572/firefox/Nightly.app/Contents/MacOS/firefox -no-remote -headless -profile /var/folders/sc/6k61d6_n0z78917zsdvswbwr0000gn/T/playwright_firefoxdev_profile-Jd32FM -juggler-pipe -silent
  - <launched> pid=69418
  - [pid=69418][err] *** You are running in headless mode.
  - [pid=69418][err] Could not find profile folder.
  - [pid=69418] <process did exit: exitCode=1, signal=null>
  - [pid=69418] starting temporary directories cleanup
  - [pid=69418] <gracefully close start>
  - [pid=69418] <kill>
  - [pid=69418] <skipped force kill spawnedProcess.killed=false processClosed=true>
  - [pid=69418] finished temporary directories cleanup
  - [pid=69418] <gracefully close end>

```