# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: theme.spec.ts >> system follows the OS, including a change while the page is open
- Location: tests/theme.spec.ts:31:1

# Error details

```
Error: browserType.launch: Failed to launch the browser process.
Browser logs:

<launching> /Users/rohinpidathala/Library/Caches/ms-playwright/firefox-1572/firefox/Nightly.app/Contents/MacOS/firefox -no-remote -headless -profile /var/folders/sc/6k61d6_n0z78917zsdvswbwr0000gn/T/playwright_firefoxdev_profile-gYmiYK -juggler-pipe -silent
<launched> pid=73616
[pid=73616][err] *** You are running in headless mode.
[pid=73616][err] Could not find profile folder.
[pid=73616] <process did exit: exitCode=1, signal=null>
[pid=73616] starting temporary directories cleanup
Call log:
  - <launching> /Users/rohinpidathala/Library/Caches/ms-playwright/firefox-1572/firefox/Nightly.app/Contents/MacOS/firefox -no-remote -headless -profile /var/folders/sc/6k61d6_n0z78917zsdvswbwr0000gn/T/playwright_firefoxdev_profile-gYmiYK -juggler-pipe -silent
  - <launched> pid=73616
  - [pid=73616][err] *** You are running in headless mode.
  - [pid=73616][err] Could not find profile folder.
  - [pid=73616] <process did exit: exitCode=1, signal=null>
  - [pid=73616] starting temporary directories cleanup
  - [pid=73616] <gracefully close start>
  - [pid=73616] <kill>
  - [pid=73616] <skipped force kill spawnedProcess.killed=false processClosed=true>
  - [pid=73616] finished temporary directories cleanup
  - [pid=73616] <gracefully close end>

```