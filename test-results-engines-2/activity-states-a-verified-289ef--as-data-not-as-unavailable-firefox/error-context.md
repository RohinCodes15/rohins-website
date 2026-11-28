# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: activity-states.spec.ts >> a verified all-zero calendar is shown as data, not as unavailable
- Location: tests/activity-states.spec.ts:25:1

# Error details

```
Error: browserType.launch: Failed to launch the browser process.
Browser logs:

<launching> /Users/rohinpidathala/Library/Caches/ms-playwright/firefox-1572/firefox/Nightly.app/Contents/MacOS/firefox -no-remote -headless -profile /var/folders/sc/6k61d6_n0z78917zsdvswbwr0000gn/T/playwright_firefoxdev_profile-A2NjGr -juggler-pipe -silent
<launched> pid=73577
[pid=73577][err] *** You are running in headless mode.
[pid=73577][err] Could not find profile folder.
[pid=73577] <process did exit: exitCode=1, signal=null>
[pid=73577] starting temporary directories cleanup
Call log:
  - <launching> /Users/rohinpidathala/Library/Caches/ms-playwright/firefox-1572/firefox/Nightly.app/Contents/MacOS/firefox -no-remote -headless -profile /var/folders/sc/6k61d6_n0z78917zsdvswbwr0000gn/T/playwright_firefoxdev_profile-A2NjGr -juggler-pipe -silent
  - <launched> pid=73577
  - [pid=73577][err] *** You are running in headless mode.
  - [pid=73577][err] Could not find profile folder.
  - [pid=73577] <process did exit: exitCode=1, signal=null>
  - [pid=73577] starting temporary directories cleanup
  - [pid=73577] <gracefully close start>
  - [pid=73577] <kill>
  - [pid=73577] <skipped force kill spawnedProcess.killed=false processClosed=true>
  - [pid=73577] finished temporary directories cleanup
  - [pid=73577] <gracefully close end>

```