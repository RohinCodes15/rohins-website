# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: portfolio.spec.ts >> navigation, keyboard filters, and the featured project work
- Location: tests/portfolio.spec.ts:16:1

# Error details

```
Error: browserType.launch: Failed to launch the browser process.
Browser logs:

<launching> /Users/rohinpidathala/Library/Caches/ms-playwright/firefox-1572/firefox/Nightly.app/Contents/MacOS/firefox -no-remote -headless -profile /var/folders/sc/6k61d6_n0z78917zsdvswbwr0000gn/T/playwright_firefoxdev_profile-a0bpci -juggler-pipe -silent
<launched> pid=69307
[pid=69307][err] *** You are running in headless mode.
[pid=69307][err] Could not find profile folder.
[pid=69307] <process did exit: exitCode=1, signal=null>
[pid=69307] starting temporary directories cleanup
Call log:
  - <launching> /Users/rohinpidathala/Library/Caches/ms-playwright/firefox-1572/firefox/Nightly.app/Contents/MacOS/firefox -no-remote -headless -profile /var/folders/sc/6k61d6_n0z78917zsdvswbwr0000gn/T/playwright_firefoxdev_profile-a0bpci -juggler-pipe -silent
  - <launched> pid=69307
  - [pid=69307][err] *** You are running in headless mode.
  - [pid=69307][err] Could not find profile folder.
  - [pid=69307] <process did exit: exitCode=1, signal=null>
  - [pid=69307] starting temporary directories cleanup
  - [pid=69307] <gracefully close start>
  - [pid=69307] <kill>
  - [pid=69307] <skipped force kill spawnedProcess.killed=false processClosed=true>
  - [pid=69307] finished temporary directories cleanup
  - [pid=69307] <gracefully close end>

```