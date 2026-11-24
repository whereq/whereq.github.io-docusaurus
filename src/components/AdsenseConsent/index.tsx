import React, {useCallback, useEffect, useRef, useState} from 'react';
import Link from '@docusaurus/Link';
import {
  ADSENSE_ENABLED,
  ADSENSE_SCRIPT_ID,
  ADSENSE_SCRIPT_SRC,
  CONSENT_REQUEST_EVENT,
  CONSENT_STORAGE_KEY,
  type ConsentState,
} from '../../data/adsense';
import styles from './adsense.module.css';

/** Read the remembered choice. `null` means the visitor has not decided yet. */
function readConsent(): ConsentState | null {
  try {
    const stored = window.localStorage.getItem(CONSENT_STORAGE_KEY);
    return stored === 'granted' || stored === 'denied' ? stored : null;
  } catch {
    // Storage can be blocked (private mode, cookie settings). Treat it as
    // "not decided" — the banner still appears, it just cannot be remembered.
    return null;
  }
}

function writeConsent(state: ConsentState): void {
  try {
    window.localStorage.setItem(CONSENT_STORAGE_KEY, state);
  } catch {
    // Nothing to do: the choice still applies to this page view.
  }
}

/**
 * Load Google's loader, once. Auto ads need it on every page, and AdSense
 * reads the publisher ID out of the query string.
 */
function loadAdSense(): void {
  if (!ADSENSE_ENABLED || document.getElementById(ADSENSE_SCRIPT_ID)) {
    return;
  }
  const script = document.createElement('script');
  script.id = ADSENSE_SCRIPT_ID;
  script.async = true;
  script.crossOrigin = 'anonymous';
  script.src = ADSENSE_SCRIPT_SRC;
  document.head.appendChild(script);
}

/**
 * The advertising consent banner, and the thing that decides whether
 * AdSense's script is allowed to run at all.
 *
 * The rule is simple: Google's code is not loaded until the visitor has said
 * yes. If they say no — or if they never answer and simply leave — nothing is
 * fetched, no cookie is set and no ad is personalised.
 */
export default function AdsenseConsent(): React.JSX.Element | null {
  const [consent, setConsent] = useState<ConsentState | null>(null);
  const [ready, setReady] = useState(false);
  const bannerRef = useRef<HTMLDivElement | null>(null);

  // Read the stored choice after the first paint, so the server and the
  // browser agree on the markup.
  useEffect(() => {
    setConsent(readConsent());
    setReady(true);
  }, []);

  // Only a "granted" choice lets Google's script run.
  useEffect(() => {
    if (consent === 'granted') {
      loadAdSense();
    }
  }, [consent]);

  // The privacy page can ask for the banner again, so the choice can be
  // changed later.
  useEffect(() => {
    const onRequest = () => setConsent(null);
    window.addEventListener(CONSENT_REQUEST_EVENT, onRequest);
    return () => window.removeEventListener(CONSENT_REQUEST_EVENT, onRequest);
  }, []);

  // The footer is fixed to the bottom of the window, so the banner has to sit
  // on top of it and the page needs to know how much room to leave.
  const visible = ready && consent === null;
  useEffect(() => {
    const root = document.documentElement;
    if (!visible) {
      root.style.setProperty('--consent-banner-height', '0px');
      return undefined;
    }
    const element = bannerRef.current;
    if (!element) {
      return undefined;
    }
    const apply = () => {
      root.style.setProperty('--consent-banner-height', `${element.offsetHeight}px`);
    };
    apply();
    const observer = new ResizeObserver(apply);
    observer.observe(element);
    return () => {
      observer.disconnect();
      root.style.setProperty('--consent-banner-height', '0px');
    };
  }, [visible]);

  const decide = useCallback((state: ConsentState) => {
    writeConsent(state);
    setConsent(state);
  }, []);

  if (!visible) {
    return null;
  }

  return (
    <div className={styles.banner} ref={bannerRef} role="region" aria-label="Cookie and advertising choices">
      <div className={styles.bannerInner}>
        <p className={styles.bannerText}>
          We use Google ads and cookies to keep this site free. Nothing is
          loaded from Google until you agree — read the{' '}
          <Link to="/privacy" className={styles.bannerLink}>
            privacy policy
          </Link>{' '}
          first.
        </p>
        <div className={styles.bannerActions}>
          <button
            type="button"
            className={`${styles.button} ${styles.buttonPrimary}`}
            onClick={() => decide('granted')}>
            Accept
          </button>
          <button
            type="button"
            className={`${styles.button} ${styles.buttonSecondary}`}
            onClick={() => decide('denied')}>
            Reject
          </button>
        </div>
      </div>
    </div>
  );
}
