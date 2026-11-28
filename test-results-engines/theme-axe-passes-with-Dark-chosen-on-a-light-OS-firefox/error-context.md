# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: theme.spec.ts >> axe passes with Dark chosen on a light OS
- Location: tests/theme.spec.ts:135:3

# Error details

```
Error: browserType.launch: Failed to launch the browser process.
Browser logs:

<launching> /Users/rohinpidathala/Library/Caches/ms-playwright/firefox-1572/firefox/Nightly.app/Contents/MacOS/firefox -no-remote -headless -profile /var/folders/sc/6k61d6_n0z78917zsdvswbwr0000gn/T/playwright_firefoxdev_profile-J48Yhj -juggler-pipe -silent
<launched> pid=69459
[pid=69459][err] *** You are running in headless mode.
[pid=69459][err] Could not find profile folder.
[pid=69459] <process did exit: exitCode=1, signal=null>
[pid=69459] starting temporary directories cleanup
Call log:
  - <launching> /Users/rohinpidathala/Library/Caches/ms-playwright/firefox-1572/firefox/Nightly.app/Contents/MacOS/firefox -no-remote -headless -profile /var/folders/sc/6k61d6_n0z78917zsdvswbwr0000gn/T/playwright_firefoxdev_profile-J48Yhj -juggler-pipe -silent
  - <launched> pid=69459
  - [pid=69459][err] *** You are running in headless mode.
  - [pid=69459][err] Could not find profile folder.
  - [pid=69459] <process did exit: exitCode=1, signal=null>
  - [pid=69459] starting temporary directories cleanup
  - [pid=69459] <gracefully close start>
  - [pid=69459] <kill>
  - [pid=69459] <skipped force kill spawnedProcess.killed=false processClosed=true>
  - [pid=69459] finished temporary directories cleanup
  - [pid=69459] <gracefully close end>

```