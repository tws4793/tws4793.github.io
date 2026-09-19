import Alert from '@mui/material/Alert';
import Button from '@mui/material/Button';
import Snackbar from '@mui/material/Snackbar';
import { useRegisterSW } from 'virtual:pwa-register/react';
import { useLocale } from '../lib/useLocale';

/**
 * The two things the service worker has to be able to say.
 *
 * Registration is deliberately owned by a component rather than by `main.tsx`:
 * `useRegisterSW` is what surfaces both states, and having one owner means
 * there is no second, silent registration racing this one.
 */
export function ServiceWorkerPrompts() {
  const { t } = useLocale();
  const {
    offlineReady: [offlineReady, setOfflineReady],
    needRefresh: [needRefresh, setNeedRefresh],
    updateServiceWorker,
  } = useRegisterSW();

  return (
    <>
      <Snackbar
        open={offlineReady}
        autoHideDuration={4000}
        onClose={() => setOfflineReady(false)}
      >
        <Alert severity="success" onClose={() => setOfflineReady(false)}>
          {t('serviceWorker.offlineReady')}
        </Alert>
      </Snackbar>

      {/*
        No `autoHideDuration`: an update the page hid on its own would leave
        the old version running with nothing left to say so.
      */}
      <Snackbar open={needRefresh}>
        <Alert
          severity="info"
          onClose={() => setNeedRefresh(false)}
          action={
            <Button
              color="inherit"
              size="small"
              onClick={() => void updateServiceWorker()}
            >
              {t('serviceWorker.reload')}
            </Button>
          }
        >
          {t('serviceWorker.updateAvailable')}
        </Alert>
      </Snackbar>
    </>
  );
}
