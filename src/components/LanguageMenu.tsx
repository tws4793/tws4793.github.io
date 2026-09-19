import TranslateIcon from '@mui/icons-material/Translate';
import IconButton from '@mui/material/IconButton';
import ListItemText from '@mui/material/ListItemText';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Tooltip from '@mui/material/Tooltip';
import { useState } from 'react';
import { LANGUAGE_NAMES } from '../i18n';
import { useLocale } from '../lib/useLocale';
import { LOCALES } from '../types';
import type { Locale } from '../types';

/**
 * A menu rather than a segmented control: four options with names of wildly
 * different widths would make a toggle group wrap awkwardly, and unlike the
 * colour scheme there is no useful icon for a language.
 *
 * Each option is written in its own language, never translated — someone who
 * cannot read the current language still has to be able to find theirs.
 */
export function LanguageMenu() {
  const { t, locale, setLocale } = useLocale();
  const [anchor, setAnchor] = useState<HTMLElement | null>(null);

  const choose = (next: Locale) => {
    setLocale(next);
    setAnchor(null);
  };

  return (
    <>
      <Tooltip title={t('language.label')}>
        <IconButton
          size="small"
          aria-label={t('language.label')}
          aria-haspopup="menu"
          aria-expanded={anchor !== null}
          onClick={(event) => setAnchor(event.currentTarget)}
        >
          <TranslateIcon fontSize="small" />
        </IconButton>
      </Tooltip>

      <Menu
        open={anchor !== null}
        anchorEl={anchor}
        onClose={() => setAnchor(null)}
      >
        {LOCALES.map((option) => (
          <MenuItem
            key={option}
            selected={option === locale}
            lang={option}
            onClick={() => choose(option)}
          >
            <ListItemText>{LANGUAGE_NAMES[option]}</ListItemText>
          </MenuItem>
        ))}
      </Menu>
    </>
  );
}
