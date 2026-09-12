import type { ProfileLink } from '../types';
import { LinkRow } from './LinkRow';
import './LinkList.css';

interface LinkListProps {
  readonly links: readonly ProfileLink[];
  readonly selectedId: string;
  readonly onSelect: (id: string) => void;
}

export function LinkList({ links, selectedId, onSelect }: LinkListProps) {
  return (
    <nav className="link-list" aria-label="Where to find me">
      <p className="link-list__intro">
        Open any of these, or pick a code to scan.
      </p>
      <ul className="link-list__items">
        {links.map((link) => (
          <LinkRow
            key={link.id}
            link={link}
            isSelected={link.id === selectedId}
            onSelect={onSelect}
          />
        ))}
      </ul>
    </nav>
  );
}
