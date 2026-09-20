import List from '@mui/material/List';
import ListSubheader from '@mui/material/ListSubheader';
import { useLocale } from '../lib/useLocale';
import type { CardEntry } from '../types';
import { EntryRow } from './EntryRow';

interface EntryListProps {
  readonly entries: readonly CardEntry[];
  readonly selectedId: string;
  readonly onSelect: (id: string) => void;
}

export function EntryList({ entries, selectedId, onSelect }: EntryListProps) {
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
      {entries.map((entry) => (
        <EntryRow
          key={entry.id}
          entry={entry}
          isSelected={entry.id === selectedId}
          onSelect={onSelect}
        />
      ))}
    </List>
  );
}
