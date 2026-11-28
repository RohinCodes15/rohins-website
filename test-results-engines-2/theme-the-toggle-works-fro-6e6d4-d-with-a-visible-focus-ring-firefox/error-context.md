# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: theme.spec.ts >> the toggle works from the keyboard with a visible focus ring
- Location: tests/theme.spec.ts:99:1

# Error details

```
Error: browserType.launch: Failed to launch the browser process.
Browser logs:

<launching> /Users/rohinpidathala/Library/Caches/ms-playwright/firefox-1572/firefox/Nightly.app/Contents/MacOS/firefox -no-remote -headless -profile /var/folders/sc/6k61d6_n0z78917zsdvswbwr0000gn/T/playwright_firefoxdev_profile-MBuKwn -juggler-pipe -silent
<launched> pid=73680
[pid=73680][err] *** You are running in headless mode.
[pid=73680][err] Could not find profile folder.
[pid=73680] <process did exit: exitCode=1, signal=null>
[pid=73680] starting temporary directories cleanup
Call log:
  - <launching> /Users/rohinpidathala/Library/Caches/ms-playwright/firefox-1572/firefox/Nightly.app/Contents/MacOS/firefox -no-remote -headless -profile /var/folders/sc/6k61d6_n0z78917zsdvswbwr0000gn/T/playwright_firefoxdev_profile-MBuKwn -juggler-pipe -silent
  - <launched> pid=73680
  - [pid=73680][err] *** You are running in headless mode.
  - [pid=73680][err] Could not find profile folder.
  - [pid=73680] <process did exit: exitCode=1, signal=null>
  - [pid=73680] starting temporary directories cleanup
  - [pid=73680] <gracefully close start>
  - [pid=73680] <kill>
  - [pid=73680] <skipped force kill spawnedProcess.killed=false processClosed=true>
  - [pid=73680] finished temporary directories cleanup
  - [pid=73680] <gracefully close end>

```