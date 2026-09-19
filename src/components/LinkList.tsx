import List from '@mui/material/List';
import ListSubheader from '@mui/material/ListSubheader';
import { useLocale } from '../lib/useLocale';
import type { ProfileLink } from '../types';
import { LinkRow } from './LinkRow';

interface LinkListProps {
  readonly links: readonly ProfileLink[];
  readonly selectedId: string;
  readonly onSelect: (id: string) => void;
}

export function LinkList({ links, selectedId, onSelect }: LinkListProps) {
  const { t } = useLocale();

  return (
    <List
      component="nav"
      aria-label={t('nav.whereToFindMe')}
      disablePadding
      subheader={
        <ListSubheader disableSticky>{t('nav.whereToFindMe')}</ListSubheader>
      }
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
