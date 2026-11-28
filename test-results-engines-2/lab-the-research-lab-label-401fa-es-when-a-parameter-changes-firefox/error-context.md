# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: lab.spec.ts >> the research lab labels its demos and recomputes when a parameter changes
- Location: tests/lab.spec.ts:4:1

# Error details

```
Error: browserType.launch: Failed to launch the browser process.
Browser logs:

<launching> /Users/rohinpidathala/Library/Caches/ms-playwright/firefox-1572/firefox/Nightly.app/Contents/MacOS/firefox -no-remote -headless -profile /var/folders/sc/6k61d6_n0z78917zsdvswbwr0000gn/T/playwright_firefoxdev_profile-4u8ibR -juggler-pipe -silent
<launched> pid=73567
[pid=73567][err] *** You are running in headless mode.
[pid=73567][err] Could not find profile folder.
[pid=73567] <process did exit: exitCode=1, signal=null>
[pid=73567] starting temporary directories cleanup
Call log:
  - <launching> /Users/rohinpidathala/Library/Caches/ms-playwright/firefox-1572/firefox/Nightly.app/Contents/MacOS/firefox -no-remote -headless -profile /var/folders/sc/6k61d6_n0z78917zsdvswbwr0000gn/T/playwright_firefoxdev_profile-4u8ibR -juggler-pipe -silent
  - <launched> pid=73567
  - [pid=73567][err] *** You are running in headless mode.
  - [pid=73567][err] Could not find profile folder.
  - [pid=73567] <process did exit: exitCode=1, signal=null>
  - [pid=73567] starting temporary directories cleanup
  - [pid=73567] <gracefully close start>
  - [pid=73567] <kill>
  - [pid=73567] <skipped force kill spawnedProcess.killed=false processClosed=true>
  - [pid=73567] finished temporary directories cleanup
  - [pid=73567] <gracefully close end>

```