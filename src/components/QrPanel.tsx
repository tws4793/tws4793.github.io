import OpenInNewIcon from '@mui/icons-material/OpenInNew';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Paper from '@mui/material/Paper';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import { externalLinkProps } from '../lib/externalLink';
import { useLocale } from '../lib/useLocale';
import type { ProfileLink } from '../types';
import { QrCode } from './QrCode';

interface QrPanelProps {
  readonly link: ProfileLink;
}

export function QrPanel({ link }: QrPanelProps) {
  const { t, l } = useLocale();
  const label = l(link.label);

  return (
    <Stack component="section" aria-label={t('qr.region')} spacing={2}>
      <Paper
        variant="outlined"
        sx={{
          alignSelf: 'center',
          p: 2,
          /*
            Fixed, not themed: a decoder needs dark modules on a light quiet
            zone, so this stays a light surface in both colour schemes.
          */
          backgroundColor: 'common.white',
          color: 'common.black',
          borderColor: 'divider',
        }}
      >
        <Box sx={{ width: { xs: 180, sm: 208 } }}>
          <QrCode value={link.url} title={`${label} — ${link.handle}`} />
        </Box>
      </Paper>

      <Stack spacing={0.5} sx={{ textAlign: 'center' }} aria-live="polite">
        <Typography variant="subtitle1">{label}</Typography>
        <Typography
          variant="body2"
          color="text.secondary"
          sx={{ overflowWrap: 'anywhere' }}
        >
          {link.handle}
        </Typography>
      </Stack>

      <Button
        component="a"
        {...externalLinkProps(link.url)}
        variant="contained"
        endIcon={<OpenInNewIcon />}
        fullWidth
      >
        {t('qr.open', { label })}
      </Button>

      <Typography variant="caption" color="text.secondary" align="center">
        {t('qr.hint')}
      </Typography>
    </Stack>
  );
}
