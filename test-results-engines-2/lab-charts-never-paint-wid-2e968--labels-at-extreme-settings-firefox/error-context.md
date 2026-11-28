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

<launching> /Users/rohinpidathala/Library/Caches/ms-playwright/firefox-1572/firefox/Nightly.app/Contents/MacOS/firefox -no-remote -headless -profile /var/folders/sc/6k61d6_n0z78917zsdvswbwr0000gn/T/playwright_firefoxdev_profile-7rzk2N -juggler-pipe -silent
<launched> pid=73613
[pid=73613][err] *** You are running in headless mode.
[pid=73613][err] Could not find profile folder.
[pid=73613] <process did exit: exitCode=1, signal=null>
[pid=73613] starting temporary directories cleanup
Call log:
  - <launching> /Users/rohinpidathala/Library/Caches/ms-playwright/firefox-1572/firefox/Nightly.app/Contents/MacOS/firefox -no-remote -headless -profile /var/folders/sc/6k61d6_n0z78917zsdvswbwr0000gn/T/playwright_firefoxdev_profile-7rzk2N -juggler-pipe -silent
  - <launched> pid=73613
  - [pid=73613][err] *** You are running in headless mode.
  - [pid=73613][err] Could not find profile folder.
  - [pid=73613] <process did exit: exitCode=1, signal=null>
  - [pid=73613] starting temporary directories cleanup
  - [pid=73613] <gracefully close start>
  - [pid=73613] <kill>
  - [pid=73613] <skipped force kill spawnedProcess.killed=false processClosed=true>
  - [pid=73613] finished temporary directories cleanup
  - [pid=73613] <gracefully close end>

```