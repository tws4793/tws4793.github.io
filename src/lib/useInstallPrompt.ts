import { useEffect, useState } from 'react';

/**
 * The slice of `BeforeInstallPromptEvent` we use. The event is Chromium-only
 * and absent from the DOM lib, so it is declared here rather than widened into
 * a global type that would imply every browser fires it.
 */
interface BeforeInstallPromptEvent extends Event {
  prompt: () => Promise<void>;
  userChoice: Promise<{ outcome: 'accepted' | 'dismissed' }>;
}

/**
 * Captures the browser's own install invitation so it can be offered from a
 * button in the page instead of whatever prompt the browser would have shown.
 *
 * `prompt` is `null` whenever installing is not on the table — the browser
 * does not support it (Firefox, iOS Safari), the app is already installed, or
 * the invitation has been used. Callers should render nothing in that case.
 */
export function useInstallPrompt(): { prompt: (() => Promise<void>) | null } {
  const [event, setEvent] = useState<BeforeInstallPromptEvent | null>(null);

  useEffect(() => {
    const onBeforeInstallPrompt = (e: Event) => {
      // Suppress the browser's own banner; the page offers the button instead.
      e.preventDefault();
      setEvent(e as BeforeInstallPromptEvent);
    };
    const onInstalled = () => setEvent(null);

    window.addEventListener('beforeinstallprompt', onBeforeInstallPrompt);
    window.addEventListener('appinstalled', onInstalled);
    return () => {
      window.removeEventListener('beforeinstallprompt', onBeforeInstallPrompt);
      window.removeEventListener('appinstalled', onInstalled);
    };
  }, []);

  if (!event) {
    return { prompt: null };
  }

  return {
    prompt: async () => {
      await event.prompt();
      await event.userChoice;
      // The invitation is single-use whatever the answer was.
      setEvent(null);
    },
  };
}
