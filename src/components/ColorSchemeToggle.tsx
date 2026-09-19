import DarkModeIcon from '@mui/icons-material/DarkMode';
import LightModeIcon from '@mui/icons-material/LightMode';
import SettingsBrightnessIcon from '@mui/icons-material/SettingsBrightness';
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';
import Tooltip from '@mui/material/Tooltip';
import { useColorScheme } from '@mui/material/styles';
import type { ReactElement } from 'react';

type Mode = 'light' | 'system' | 'dark';

const MODES: ReadonlyArray<{ value: Mode; label: string; icon: ReactElement }> =
  [
    {
      value: 'light',
      label: 'Light',
      icon: <LightModeIcon fontSize="small" />,
    },
    {
      value: 'system',
      label: 'Match system',
      icon: <SettingsBrightnessIcon fontSize="small" />,
    },
    { value: 'dark', label: 'Dark', icon: <DarkModeIcon fontSize="small" /> },
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
      aria-label="Colour scheme"
    >
      {MODES.map(({ value, label, icon }) => (
        <Tooltip key={value} title={label}>
          <ToggleButton value={value} aria-label={label}>
            {icon}
          </ToggleButton>
        </Tooltip>
      ))}
    </ToggleButtonGroup>
  );
}
