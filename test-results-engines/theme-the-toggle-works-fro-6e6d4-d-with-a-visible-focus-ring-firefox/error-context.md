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

<launching> /Users/rohinpidathala/Library/Caches/ms-playwright/firefox-1572/firefox/Nightly.app/Contents/MacOS/firefox -no-remote -headless -profile /var/folders/sc/6k61d6_n0z78917zsdvswbwr0000gn/T/playwright_firefoxdev_profile-HE49Fd -juggler-pipe -silent
<launched> pid=69389
[pid=69389][err] *** You are running in headless mode.
[pid=69389][err] Could not find profile folder.
[pid=69389] <process did exit: exitCode=1, signal=null>
[pid=69389] starting temporary directories cleanup
Call log:
  - <launching> /Users/rohinpidathala/Library/Caches/ms-playwright/firefox-1572/firefox/Nightly.app/Contents/MacOS/firefox -no-remote -headless -profile /var/folders/sc/6k61d6_n0z78917zsdvswbwr0000gn/T/playwright_firefoxdev_profile-HE49Fd -juggler-pipe -silent
  - <launched> pid=69389
  - [pid=69389][err] *** You are running in headless mode.
  - [pid=69389][err] Could not find profile folder.
  - [pid=69389] <process did exit: exitCode=1, signal=null>
  - [pid=69389] starting temporary directories cleanup
  - [pid=69389] <gracefully close start>
  - [pid=69389] <kill>
  - [pid=69389] <skipped force kill spawnedProcess.killed=false processClosed=true>
  - [pid=69389] finished temporary directories cleanup
  - [pid=69389] <gracefully close end>

```