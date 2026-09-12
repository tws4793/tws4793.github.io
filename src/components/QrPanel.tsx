import type { ProfileLink } from '../types';
import { QrCode } from './QrCode';
import './QrPanel.css';

interface QrPanelProps {
  readonly link: ProfileLink;
}

export function QrPanel({ link }: QrPanelProps) {
  return (
    <section className="qr-panel" aria-label="Code on show">
      <div className="qr-panel__paper">
        <div className="qr-panel__body">
          {/* Remounting on id change replays the swap animation. */}
          <div className="qr-panel__code" key={link.id}>
            <QrCode
              value={link.url}
              title={`${link.label} code for ${link.handle}`}
            />
          </div>

          <div className="qr-panel__meta" aria-live="polite">
            <p className="qr-panel__platform">{link.label}</p>
            <p className="qr-panel__handle">{link.handle}</p>
          </div>
        </div>

        <p className="qr-panel__help">Point a phone camera at the code.</p>
      </div>

      <a
        className="qr-panel__open"
        href={link.url}
        target="_blank"
        rel="noreferrer noopener"
      >
        Open {link.label}
      </a>
    </section>
  );
}
