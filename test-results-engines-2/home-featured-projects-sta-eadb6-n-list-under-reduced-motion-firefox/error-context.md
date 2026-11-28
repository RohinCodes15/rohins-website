# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: home.spec.ts >> featured projects stack as pinned panels on wide screens and stay a plain list under reduced motion
- Location: tests/home.spec.ts:116:1

# Error details

```
Error: browserType.launch: Failed to launch the browser process.
Browser logs:

<launching> /Users/rohinpidathala/Library/Caches/ms-playwright/firefox-1572/firefox/Nightly.app/Contents/MacOS/firefox -no-remote -headless -profile /var/folders/sc/6k61d6_n0z78917zsdvswbwr0000gn/T/playwright_firefoxdev_profile-KD9C8w -juggler-pipe -silent
<launched> pid=73668
[pid=73668][err] *** You are running in headless mode.
[pid=73668][err] Could not find profile folder.
[pid=73668] <process did exit: exitCode=1, signal=null>
[pid=73668] starting temporary directories cleanup
Call log:
  - <launching> /Users/rohinpidathala/Library/Caches/ms-playwright/firefox-1572/firefox/Nightly.app/Contents/MacOS/firefox -no-remote -headless -profile /var/folders/sc/6k61d6_n0z78917zsdvswbwr0000gn/T/playwright_firefoxdev_profile-KD9C8w -juggler-pipe -silent
  - <launched> pid=73668
  - [pid=73668][err] *** You are running in headless mode.
  - [pid=73668][err] Could not find profile folder.
  - [pid=73668] <process did exit: exitCode=1, signal=null>
  - [pid=73668] starting temporary directories cleanup
  - [pid=73668] <gracefully close start>
  - [pid=73668] <kill>
  - [pid=73668] <skipped force kill spawnedProcess.killed=false processClosed=true>
  - [pid=73668] finished temporary directories cleanup
  - [pid=73668] <gracefully close end>

```