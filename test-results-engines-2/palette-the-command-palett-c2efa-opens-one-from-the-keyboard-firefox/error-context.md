# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: palette.spec.ts >> the command palette searches projects and opens one from the keyboard
- Location: tests/palette.spec.ts:4:1

# Error details

```
Error: browserType.launch: Failed to launch the browser process.
Browser logs:

<launching> /Users/rohinpidathala/Library/Caches/ms-playwright/firefox-1572/firefox/Nightly.app/Contents/MacOS/firefox -no-remote -headless -profile /var/folders/sc/6k61d6_n0z78917zsdvswbwr0000gn/T/playwright_firefoxdev_profile-s0Eqmh -juggler-pipe -silent
<launched> pid=73568
[pid=73568][err] *** You are running in headless mode.
[pid=73568][err] Could not find profile folder.
[pid=73568] <process did exit: exitCode=1, signal=null>
[pid=73568] starting temporary directories cleanup
Call log:
  - <launching> /Users/rohinpidathala/Library/Caches/ms-playwright/firefox-1572/firefox/Nightly.app/Contents/MacOS/firefox -no-remote -headless -profile /var/folders/sc/6k61d6_n0z78917zsdvswbwr0000gn/T/playwright_firefoxdev_profile-s0Eqmh -juggler-pipe -silent
  - <launched> pid=73568
  - [pid=73568][err] *** You are running in headless mode.
  - [pid=73568][err] Could not find profile folder.
  - [pid=73568] <process did exit: exitCode=1, signal=null>
  - [pid=73568] starting temporary directories cleanup
  - [pid=73568] <gracefully close start>
  - [pid=73568] <kill>
  - [pid=73568] <skipped force kill spawnedProcess.killed=false processClosed=true>
  - [pid=73568] finished temporary directories cleanup
  - [pid=73568] <gracefully close end>

```