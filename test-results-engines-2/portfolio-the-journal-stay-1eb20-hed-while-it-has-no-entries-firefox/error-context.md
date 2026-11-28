# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: portfolio.spec.ts >> the journal stays unpublished while it has no entries
- Location: tests/portfolio.spec.ts:90:1

# Error details

```
Error: browserType.launch: Failed to launch the browser process.
Browser logs:

<launching> /Users/rohinpidathala/Library/Caches/ms-playwright/firefox-1572/firefox/Nightly.app/Contents/MacOS/firefox -no-remote -headless -profile /var/folders/sc/6k61d6_n0z78917zsdvswbwr0000gn/T/playwright_firefoxdev_profile-sE6q5p -juggler-pipe -silent
<launched> pid=73661
[pid=73661][err] *** You are running in headless mode.
[pid=73661][err] Could not find profile folder.
[pid=73661] <process did exit: exitCode=1, signal=null>
[pid=73661] starting temporary directories cleanup
Call log:
  - <launching> /Users/rohinpidathala/Library/Caches/ms-playwright/firefox-1572/firefox/Nightly.app/Contents/MacOS/firefox -no-remote -headless -profile /var/folders/sc/6k61d6_n0z78917zsdvswbwr0000gn/T/playwright_firefoxdev_profile-sE6q5p -juggler-pipe -silent
  - <launched> pid=73661
  - [pid=73661][err] *** You are running in headless mode.
  - [pid=73661][err] Could not find profile folder.
  - [pid=73661] <process did exit: exitCode=1, signal=null>
  - [pid=73661] starting temporary directories cleanup
  - [pid=73661] <gracefully close start>
  - [pid=73661] <kill>
  - [pid=73661] <skipped force kill spawnedProcess.killed=false processClosed=true>
  - [pid=73661] finished temporary directories cleanup
  - [pid=73661] <gracefully close end>

```