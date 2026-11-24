import React from 'react';
import {ADSENSE_ENABLED, CONSENT_REQUEST_EVENT} from '../../data/adsense';
import styles from './consent-settings.module.css';

/**
 * The "change your mind" control that lives on the privacy policy page.
 *
 * It does not clear the stored choice itself — it asks the banner to come
 * back, so the visitor is asked again rather than quietly having their
 * answer overwritten.
 */
export default function ConsentSettings(): React.JSX.Element {
  const askAgain = () => {
    window.dispatchEvent(new CustomEvent(CONSENT_REQUEST_EVENT));
    document.getElementById('consent-choices')?.scrollIntoView({behavior: 'smooth'});
  };

  if (!ADSENSE_ENABLED) {
    // No publisher ID means no ads are served, so there is no choice to
    // change and no banner to bring back.
    return (
      <div className={styles.settings}>
        <p className={styles.hint}>
          No advertising is served on this site at the moment, so there is no
          choice to change and nothing from Google is loaded. If advertising
          is switched on later, the banner will ask you then.
        </p>
      </div>
    );
  }

  return (
    <div className={styles.settings}>
      <button type="button" className={styles.button} onClick={askAgain}>
        Change my advertising choices
      </button>
      <p className={styles.hint}>
        Your choice is remembered in this browser only. Clearing your browser
        data for this site resets it.
      </p>
    </div>
  );
}
