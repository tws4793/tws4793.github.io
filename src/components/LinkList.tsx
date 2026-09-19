import List from '@mui/material/List';
import ListSubheader from '@mui/material/ListSubheader';
import type { ProfileLink } from '../types';
import { LinkRow } from './LinkRow';

interface LinkListProps {
  readonly links: readonly ProfileLink[];
  readonly selectedId: string;
  readonly onSelect: (id: string) => void;
}

export function LinkList({ links, selectedId, onSelect }: LinkListProps) {
  return (
    <List
      component="nav"
      aria-label="Where to find me"
      disablePadding
      subheader={<ListSubheader disableSticky>Where to find me</ListSubheader>}
    >
      {links.map((link) => (
        <LinkRow
          key={link.id}
          link={link}
          isSelected={link.id === selectedId}
          onSelect={onSelect}
        />
      ))}
    </List>
  );
}
