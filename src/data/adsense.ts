/**
 * Google AdSense — where the site's advertising is configured.
 *
 * The site uses AdSense **auto ads**: one script on every page, and AdSense
 * decides where the ads land. Turning ads on is a two-step job:
 *
 *   1. Get `whereq.github.io` approved in the AdSense console.
 *   2. Paste the publisher ID below. It looks like
 *      `ca-pub-1234567890123456`.
 *
 * Nothing else has to change. Until the ID is here the script is never
 * injected, so the site stays ad-free and no Google cookie is ever set.
 *
 * Ads are also gated on the visitor's consent — see
 * `src/components/AdsenseConsent`. The script is only injected once consent
 * has been given, so a visitor who says no never loads Google's code at all.
 */

/** The publisher ID from the AdSense console. Empty means "no ads". */
export const ADSENSE_CLIENT = '';

/** True once a real publisher ID is in place. */
export const ADSENSE_ENABLED = /^ca-pub-\d+$/.test(ADSENSE_CLIENT);

/** The id we give the injected <script>, so it is only ever added once. */
export const ADSENSE_SCRIPT_ID = 'whereq-adsense';

/** Google's loader. The publisher ID rides along in the query string. */
export const ADSENSE_SCRIPT_SRC =
  'https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=' +
  encodeURIComponent(ADSENSE_CLIENT);

/** Where the visitor's choice is remembered, in their own browser. */
export const CONSENT_STORAGE_KEY = 'whereq.consent';

/** The event the privacy page fires to ask for the banner to come back. */
export const CONSENT_REQUEST_EVENT = 'whereq:consent-request';

/** What a visitor can decide. */
export type ConsentState = 'granted' | 'denied';
