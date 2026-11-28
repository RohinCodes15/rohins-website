# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: home.spec.ts >> the stack logos name themselves on keyboard focus and link to projects
- Location: tests/home.spec.ts:93:1

# Error details

```
Error: browserType.launch: Failed to launch the browser process.
Browser logs:

<launching> /Users/rohinpidathala/Library/Caches/ms-playwright/firefox-1572/firefox/Nightly.app/Contents/MacOS/firefox -no-remote -headless -profile /var/folders/sc/6k61d6_n0z78917zsdvswbwr0000gn/T/playwright_firefoxdev_profile-gp6oM5 -juggler-pipe -silent
<launched> pid=73645
[pid=73645][err] *** You are running in headless mode.
[pid=73645][err] Could not find profile folder.
[pid=73645] <process did exit: exitCode=1, signal=null>
[pid=73645] starting temporary directories cleanup
Call log:
  - <launching> /Users/rohinpidathala/Library/Caches/ms-playwright/firefox-1572/firefox/Nightly.app/Contents/MacOS/firefox -no-remote -headless -profile /var/folders/sc/6k61d6_n0z78917zsdvswbwr0000gn/T/playwright_firefoxdev_profile-gp6oM5 -juggler-pipe -silent
  - <launched> pid=73645
  - [pid=73645][err] *** You are running in headless mode.
  - [pid=73645][err] Could not find profile folder.
  - [pid=73645] <process did exit: exitCode=1, signal=null>
  - [pid=73645] starting temporary directories cleanup
  - [pid=73645] <gracefully close start>
  - [pid=73645] <kill>
  - [pid=73645] <skipped force kill spawnedProcess.killed=false processClosed=true>
  - [pid=73645] finished temporary directories cleanup
  - [pid=73645] <gracefully close end>

```