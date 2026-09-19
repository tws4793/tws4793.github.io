import InstallMobileIcon from '@mui/icons-material/InstallMobile';
import Button from '@mui/material/Button';
import { useInstallPrompt } from '../lib/useInstallPrompt';

/**
 * Renders nothing unless the browser has offered an install invitation, which
 * is the honest behaviour: there is no way to install from a page the browser
 * has not judged installable, and a dead button would only puzzle people.
 */
export function InstallButton() {
  const { prompt } = useInstallPrompt();

  if (!prompt) {
    return null;
  }

  return (
    <Button
      size="small"
      variant="outlined"
      startIcon={<InstallMobileIcon />}
      onClick={() => void prompt()}
    >
      Install
    </Button>
  );
}
