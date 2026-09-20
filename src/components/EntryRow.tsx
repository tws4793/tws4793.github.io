import OpenInNewIcon from '@mui/icons-material/OpenInNew';
import SaveAltIcon from '@mui/icons-material/SaveAlt';
import IconButton from '@mui/material/IconButton';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Tooltip from '@mui/material/Tooltip';
import { externalLinkProps } from '../lib/externalLink';
import { useLocale } from '../lib/useLocale';
import { downloadVCard } from '../lib/vcard';
import type { CardEntry } from '../types';
import { PlatformIcon } from './PlatformIcon';

interface EntryRowProps {
  readonly entry: CardEntry;
  readonly isSelected: boolean;
  readonly onSelect: (id: string) => void;
}

/**
 * The row's primary action selects — tapping it puts this code on show, which
 * is what the page is for. Taking the entry away with you — opening the link,
 * or saving the contact file — is the secondary action, so it gets the
 * trailing icon button, per Material's list anatomy.
 */
export function EntryRow({ entry, isSelected, onSelect }: EntryRowProps) {
  const { t, l, locale } = useLocale();
  const label = l(entry.label);

  return (
    <ListItem
      disablePadding
      secondaryAction={
        entry.kind === 'contact' ? (
          <Tooltip title={t('contact.save')}>
            <IconButton
              edge="end"
              onClick={() => downloadVCard(entry.contact, locale)}
              aria-label={t('contact.save')}
            >
              <SaveAltIcon fontSize="small" />
            </IconButton>
          </Tooltip>
        ) : (
          <Tooltip title={t('qr.open', { label })}>
            <IconButton
              edge="end"
              {...externalLinkProps(entry.url)}
              component="a"
              aria-label={t('nav.openInNewTab', { label })}
            >
              <OpenInNewIcon fontSize="small" />
            </IconButton>
          </Tooltip>
        )
      }
    >
      <ListItemButton
        selected={isSelected}
        onClick={() => onSelect(entry.id)}
        aria-label={t('nav.showCode', { label })}
        // `selected` is only a tint; this is what says so to a screen reader.
        aria-current={isSelected}
      >
        <ListItemIcon sx={{ color: isSelected ? 'primary.main' : undefined }}>
          <PlatformIcon platform={entry.platform} />
        </ListItemIcon>
        <ListItemText
          primary={label}
          // The contact row is a one-line item among two-line ones, which is
          // the honest shape: it has no handle to show under its name.
          secondary={entry.kind === 'link' ? entry.handle : undefined}
          slotProps={{ secondary: { noWrap: true } }}
        />
      </ListItemButton>
    </ListItem>
  );
}
