// The homepage hero entrance (app/globals.css, Hero entrance) plays on the first homepage view of a tab session.
// HeroLines records it here when the entrance ends; <html data-hero-played> turns the entrance off.

export const HERO_PLAYED_KEY = "hero-played";

/**
 * Runs in <head> before first paint, so a later full-page visit in the session shows the final frame without a
 * flash. Blocked storage throws, and the entrance then plays on every load.
 */
export const HERO_PLAYED_SCRIPT = `try{if(sessionStorage.getItem(${JSON.stringify(HERO_PLAYED_KEY)}))document.documentElement.dataset.heroPlayed=""}catch(e){}`;
