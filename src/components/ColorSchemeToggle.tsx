import DarkModeIcon from '@mui/icons-material/DarkMode';
import LightModeIcon from '@mui/icons-material/LightMode';
import SettingsBrightnessIcon from '@mui/icons-material/SettingsBrightness';
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';
import Tooltip from '@mui/material/Tooltip';
import { useColorScheme } from '@mui/material/styles';
import type { ReactElement } from 'react';
import { useLocale } from '../lib/useLocale';

type Mode = 'light' | 'system' | 'dark';

/* The table holds translation keys; the labels are resolved at render. */
const MODES: ReadonlyArray<{
  value: Mode;
  labelKey: 'colorScheme.light' | 'colorScheme.system' | 'colorScheme.dark';
  icon: ReactElement;
}> = [
  {
    value: 'light',
    labelKey: 'colorScheme.light',
    icon: <LightModeIcon fontSize="small" />,
  },
  {
    value: 'system',
    labelKey: 'colorScheme.system',
    icon: <SettingsBrightnessIcon fontSize="small" />,
  },
  {
    value: 'dark',
    labelKey: 'colorScheme.dark',
    icon: <DarkModeIcon fontSize="small" />,
  },
];

/**
 * Light / system / dark, as three segments rather than a single sun-moon
 * button: with only two states there is nowhere to put "follow the OS", and
 * that is the state most people actually want.
 *
 * `useColorScheme` persists the choice to `localStorage` and swaps a class on
 * `<html>`; the theme's CSS variables do the rest.
 */
export function ColorSchemeToggle() {
  const { t } = useLocale();
  const { mode, setMode } = useColorScheme();

  // Undefined on the very first render, before the stored mode is read back.
  if (!mode) {
    return null;
  }

  return (
    <ToggleButtonGroup
      exclusive
      size="small"
      value={mode}
      // `null` when the active segment is re-clicked; keep the current mode.
      onChange={(_event, next: Mode | null) => next && setMode(next)}
      aria-label={t('colorScheme.label')}
    >
      {MODES.map(({ value, labelKey, icon }) => (
        <Tooltip key={value} title={t(labelKey)}>
          <ToggleButton value={value} aria-label={t(labelKey)}>
            {icon}
          </ToggleButton>
        </Tooltip>
      ))}
    </ToggleButtonGroup>
  );
}
