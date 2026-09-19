import OpenInNewIcon from '@mui/icons-material/OpenInNew';
import IconButton from '@mui/material/IconButton';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Tooltip from '@mui/material/Tooltip';
import { externalLinkProps } from '../lib/externalLink';
import { useLocale } from '../lib/useLocale';
import type { ProfileLink } from '../types';
import { PlatformIcon } from './PlatformIcon';

interface LinkRowProps {
  readonly link: ProfileLink;
  readonly isSelected: boolean;
  readonly onSelect: (id: string) => void;
}

/**
 * The row's primary action selects — tapping it puts this code on show, which
 * is what the page is for. Opening the destination is the secondary action, so
 * it gets the trailing icon button, per Material's list anatomy.
 */
export function LinkRow({ link, isSelected, onSelect }: LinkRowProps) {
  const { t, l } = useLocale();
  const label = l(link.label);

  return (
    <ListItem
      disablePadding
      secondaryAction={
        <Tooltip title={t('qr.open', { label })}>
          <IconButton
            edge="end"
            {...externalLinkProps(link.url)}
            component="a"
            aria-label={t('nav.openInNewTab', { label })}
          >
            <OpenInNewIcon fontSize="small" />
          </IconButton>
        </Tooltip>
      }
    >
      <ListItemButton
        selected={isSelected}
        onClick={() => onSelect(link.id)}
        aria-label={t('nav.showCode', { label })}
        // `selected` is only a tint; this is what says so to a screen reader.
        aria-current={isSelected}
      >
        <ListItemIcon sx={{ color: isSelected ? 'primary.main' : undefined }}>
          <PlatformIcon platform={link.platform} />
        </ListItemIcon>
        <ListItemText
          primary={label}
          secondary={link.handle}
          slotProps={{ secondary: { noWrap: true } }}
        />
      </ListItemButton>
    </ListItem>
  );
}
