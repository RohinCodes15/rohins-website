# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: palette.spec.ts >> axe passes with the command palette open
- Location: tests/palette.spec.ts:39:1

# Error details

```
Error: browserType.launch: Failed to launch the browser process.
Browser logs:

<launching> /Users/rohinpidathala/Library/Caches/ms-playwright/firefox-1572/firefox/Nightly.app/Contents/MacOS/firefox -no-remote -headless -profile /var/folders/sc/6k61d6_n0z78917zsdvswbwr0000gn/T/playwright_firefoxdev_profile-FsDrXC -juggler-pipe -silent
<launched> pid=69297
[pid=69297][err] *** You are running in headless mode.
[pid=69297][err] Could not find profile folder.
[pid=69297] <process did exit: exitCode=1, signal=null>
[pid=69297] starting temporary directories cleanup
Call log:
  - <launching> /Users/rohinpidathala/Library/Caches/ms-playwright/firefox-1572/firefox/Nightly.app/Contents/MacOS/firefox -no-remote -headless -profile /var/folders/sc/6k61d6_n0z78917zsdvswbwr0000gn/T/playwright_firefoxdev_profile-FsDrXC -juggler-pipe -silent
  - <launched> pid=69297
  - [pid=69297][err] *** You are running in headless mode.
  - [pid=69297][err] Could not find profile folder.
  - [pid=69297] <process did exit: exitCode=1, signal=null>
  - [pid=69297] starting temporary directories cleanup
  - [pid=69297] <gracefully close start>
  - [pid=69297] <kill>
  - [pid=69297] <skipped force kill spawnedProcess.killed=false processClosed=true>
  - [pid=69297] finished temporary directories cleanup
  - [pid=69297] <gracefully close end>

```