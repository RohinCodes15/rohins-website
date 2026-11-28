# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: lab.spec.ts >> axe passes on the research lab in dark mode
- Location: tests/lab.spec.ts:35:3

# Error details

```
Error: browserType.launch: Failed to launch the browser process.
Browser logs:

<launching> /Users/rohinpidathala/Library/Caches/ms-playwright/firefox-1572/firefox/Nightly.app/Contents/MacOS/firefox -no-remote -headless -profile /var/folders/sc/6k61d6_n0z78917zsdvswbwr0000gn/T/playwright_firefoxdev_profile-SpBSG0 -juggler-pipe -silent
<launched> pid=69298
[pid=69298][err] *** You are running in headless mode.
[pid=69298][err] Could not find profile folder.
[pid=69298] <process did exit: exitCode=1, signal=null>
[pid=69298] starting temporary directories cleanup
Call log:
  - <launching> /Users/rohinpidathala/Library/Caches/ms-playwright/firefox-1572/firefox/Nightly.app/Contents/MacOS/firefox -no-remote -headless -profile /var/folders/sc/6k61d6_n0z78917zsdvswbwr0000gn/T/playwright_firefoxdev_profile-SpBSG0 -juggler-pipe -silent
  - <launched> pid=69298
  - [pid=69298][err] *** You are running in headless mode.
  - [pid=69298][err] Could not find profile folder.
  - [pid=69298] <process did exit: exitCode=1, signal=null>
  - [pid=69298] starting temporary directories cleanup
  - [pid=69298] <gracefully close start>
  - [pid=69298] <kill>
  - [pid=69298] <skipped force kill spawnedProcess.killed=false processClosed=true>
  - [pid=69298] finished temporary directories cleanup
  - [pid=69298] <gracefully close end>

```