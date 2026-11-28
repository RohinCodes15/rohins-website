# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: lab.spec.ts >> charts never paint wider than the page and keep distinct axis labels at extreme settings
- Location: tests/lab.spec.ts:44:1

# Error details

```
Error: browserType.launch: Failed to launch the browser process.
Browser logs:

<launching> /Users/rohinpidathala/Library/Caches/ms-playwright/firefox-1572/firefox/Nightly.app/Contents/MacOS/firefox -no-remote -headless -profile /var/folders/sc/6k61d6_n0z78917zsdvswbwr0000gn/T/playwright_firefoxdev_profile-huI6rA -juggler-pipe -silent
<launched> pid=69308
[pid=69308][err] *** You are running in headless mode.
[pid=69308][err] Could not find profile folder.
[pid=69308] <process did exit: exitCode=1, signal=null>
[pid=69308] starting temporary directories cleanup
Call log:
  - <launching> /Users/rohinpidathala/Library/Caches/ms-playwright/firefox-1572/firefox/Nightly.app/Contents/MacOS/firefox -no-remote -headless -profile /var/folders/sc/6k61d6_n0z78917zsdvswbwr0000gn/T/playwright_firefoxdev_profile-huI6rA -juggler-pipe -silent
  - <launched> pid=69308
  - [pid=69308][err] *** You are running in headless mode.
  - [pid=69308][err] Could not find profile folder.
  - [pid=69308] <process did exit: exitCode=1, signal=null>
  - [pid=69308] starting temporary directories cleanup
  - [pid=69308] <gracefully close start>
  - [pid=69308] <kill>
  - [pid=69308] <skipped force kill spawnedProcess.killed=false processClosed=true>
  - [pid=69308] finished temporary directories cleanup
  - [pid=69308] <gracefully close end>

```