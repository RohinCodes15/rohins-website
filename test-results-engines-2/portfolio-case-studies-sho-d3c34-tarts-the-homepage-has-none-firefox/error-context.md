# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: portfolio.spec.ts >> case studies show reading progress once reading starts; the homepage has none
- Location: tests/portfolio.spec.ts:106:1

# Error details

```
Error: browserType.launch: Failed to launch the browser process.
Browser logs:

<launching> /Users/rohinpidathala/Library/Caches/ms-playwright/firefox-1572/firefox/Nightly.app/Contents/MacOS/firefox -no-remote -headless -profile /var/folders/sc/6k61d6_n0z78917zsdvswbwr0000gn/T/playwright_firefoxdev_profile-WRpSHi -juggler-pipe -silent
<launched> pid=73686
[pid=73686][err] *** You are running in headless mode.
[pid=73686][err] Could not find profile folder.
[pid=73686] <process did exit: exitCode=1, signal=null>
[pid=73686] starting temporary directories cleanup
Call log:
  - <launching> /Users/rohinpidathala/Library/Caches/ms-playwright/firefox-1572/firefox/Nightly.app/Contents/MacOS/firefox -no-remote -headless -profile /var/folders/sc/6k61d6_n0z78917zsdvswbwr0000gn/T/playwright_firefoxdev_profile-WRpSHi -juggler-pipe -silent
  - <launched> pid=73686
  - [pid=73686][err] *** You are running in headless mode.
  - [pid=73686][err] Could not find profile folder.
  - [pid=73686] <process did exit: exitCode=1, signal=null>
  - [pid=73686] starting temporary directories cleanup
  - [pid=73686] <gracefully close start>
  - [pid=73686] <kill>
  - [pid=73686] <skipped force kill spawnedProcess.killed=false processClosed=true>
  - [pid=73686] finished temporary directories cleanup
  - [pid=73686] <gracefully close end>

```