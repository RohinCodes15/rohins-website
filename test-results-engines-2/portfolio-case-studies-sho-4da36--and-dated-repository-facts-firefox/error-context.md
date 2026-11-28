# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: portfolio.spec.ts >> case studies show the architecture flows and dated repository facts
- Location: tests/portfolio.spec.ts:81:1

# Error details

```
Error: browserType.launch: Failed to launch the browser process.
Browser logs:

<launching> /Users/rohinpidathala/Library/Caches/ms-playwright/firefox-1572/firefox/Nightly.app/Contents/MacOS/firefox -no-remote -headless -profile /var/folders/sc/6k61d6_n0z78917zsdvswbwr0000gn/T/playwright_firefoxdev_profile-EC7HTL -juggler-pipe -silent
<launched> pid=73654
[pid=73654][err] *** You are running in headless mode.
[pid=73654][err] Could not find profile folder.
[pid=73654] <process did exit: exitCode=1, signal=null>
[pid=73654] starting temporary directories cleanup
Call log:
  - <launching> /Users/rohinpidathala/Library/Caches/ms-playwright/firefox-1572/firefox/Nightly.app/Contents/MacOS/firefox -no-remote -headless -profile /var/folders/sc/6k61d6_n0z78917zsdvswbwr0000gn/T/playwright_firefoxdev_profile-EC7HTL -juggler-pipe -silent
  - <launched> pid=73654
  - [pid=73654][err] *** You are running in headless mode.
  - [pid=73654][err] Could not find profile folder.
  - [pid=73654] <process did exit: exitCode=1, signal=null>
  - [pid=73654] starting temporary directories cleanup
  - [pid=73654] <gracefully close start>
  - [pid=73654] <kill>
  - [pid=73654] <skipped force kill spawnedProcess.killed=false processClosed=true>
  - [pid=73654] finished temporary directories cleanup
  - [pid=73654] <gracefully close end>

```