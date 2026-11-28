# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: theme.spec.ts >> the stored theme applies before any JavaScript bundle runs (no flash)
- Location: tests/theme.spec.ts:73:1

# Error details

```
Error: browserType.launch: Failed to launch the browser process.
Browser logs:

<launching> /Users/rohinpidathala/Library/Caches/ms-playwright/firefox-1572/firefox/Nightly.app/Contents/MacOS/firefox -no-remote -headless -profile /var/folders/sc/6k61d6_n0z78917zsdvswbwr0000gn/T/playwright_firefoxdev_profile-AxBndn -juggler-pipe -silent
<launched> pid=73656
[pid=73656][err] *** You are running in headless mode.
[pid=73656][err] Could not find profile folder.
[pid=73656] <process did exit: exitCode=1, signal=null>
[pid=73656] starting temporary directories cleanup
Call log:
  - <launching> /Users/rohinpidathala/Library/Caches/ms-playwright/firefox-1572/firefox/Nightly.app/Contents/MacOS/firefox -no-remote -headless -profile /var/folders/sc/6k61d6_n0z78917zsdvswbwr0000gn/T/playwright_firefoxdev_profile-AxBndn -juggler-pipe -silent
  - <launched> pid=73656
  - [pid=73656][err] *** You are running in headless mode.
  - [pid=73656][err] Could not find profile folder.
  - [pid=73656] <process did exit: exitCode=1, signal=null>
  - [pid=73656] starting temporary directories cleanup
  - [pid=73656] <gracefully close start>
  - [pid=73656] <kill>
  - [pid=73656] <skipped force kill spawnedProcess.killed=false processClosed=true>
  - [pid=73656] finished temporary directories cleanup
  - [pid=73656] <gracefully close end>

```