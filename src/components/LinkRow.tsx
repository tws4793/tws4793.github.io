import type { ProfileLink } from '../types';
import { PlatformIcon, QrGlyph } from './PlatformIcon';

interface LinkRowProps {
  readonly link: ProfileLink;
  readonly isSelected: boolean;
  readonly onSelect: (id: string) => void;
}

export function LinkRow({ link, isSelected, onSelect }: LinkRowProps) {
  return (
    <li className="link-row" data-selected={isSelected}>
      <a
        className="link-row__open"
        href={link.url}
        target="_blank"
        rel="noreferrer noopener"
      >
        <span className="link-row__icon">
          <PlatformIcon platform={link.platform} />
        </span>
        <span className="link-row__text">
          <span className="link-row__label">{link.label}</span>
          <span className="link-row__handle">{link.handle}</span>
        </span>
      </a>

      <button
        type="button"
        className="link-row__code"
        aria-pressed={isSelected}
        onClick={() => onSelect(link.id)}
      >
        <QrGlyph />
        <span className="visually-hidden">Show the {link.label} code</span>
      </button>
    </li>
  );
}
