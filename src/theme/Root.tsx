import React, {type ReactNode} from 'react';
import BrowserOnly from '@docusaurus/BrowserOnly';
import AdsenseConsent from '../components/AdsenseConsent';

/**
 * Wraps the whole site.
 *
 * The advertising consent banner and the AdSense script live here, because
 * auto ads need Google's loader on every page. The banner is rendered on the
 * client only — it reads `localStorage`, which the server has no access to.
 */
export default function Root({children}: {children: ReactNode}): React.JSX.Element {
  return (
    <>
      {children}
      <BrowserOnly fallback={null}>{() => <AdsenseConsent />}</BrowserOnly>
    </>
  );
}
