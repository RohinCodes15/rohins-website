# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: home.spec.ts >> the production homepage passes axe in dark mode
- Location: tests/home.spec.ts:67:3

# Error details

```
Error: browserType.launch: Failed to launch the browser process.
Browser logs:

<launching> /Users/rohinpidathala/Library/Caches/ms-playwright/firefox-1572/firefox/Nightly.app/Contents/MacOS/firefox -no-remote -headless -profile /var/folders/sc/6k61d6_n0z78917zsdvswbwr0000gn/T/playwright_firefoxdev_profile-IHZBdg -juggler-pipe -silent
<launched> pid=69306
[pid=69306][err] *** You are running in headless mode.
[pid=69306][err] Could not find profile folder.
[pid=69306] <process did exit: exitCode=1, signal=null>
[pid=69306] starting temporary directories cleanup
Call log:
  - <launching> /Users/rohinpidathala/Library/Caches/ms-playwright/firefox-1572/firefox/Nightly.app/Contents/MacOS/firefox -no-remote -headless -profile /var/folders/sc/6k61d6_n0z78917zsdvswbwr0000gn/T/playwright_firefoxdev_profile-IHZBdg -juggler-pipe -silent
  - <launched> pid=69306
  - [pid=69306][err] *** You are running in headless mode.
  - [pid=69306][err] Could not find profile folder.
  - [pid=69306] <process did exit: exitCode=1, signal=null>
  - [pid=69306] starting temporary directories cleanup
  - [pid=69306] <gracefully close start>
  - [pid=69306] <kill>
  - [pid=69306] <skipped force kill spawnedProcess.killed=false processClosed=true>
  - [pid=69306] finished temporary directories cleanup
  - [pid=69306] <gracefully close end>

```