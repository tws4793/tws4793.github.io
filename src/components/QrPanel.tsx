import OpenInNewIcon from '@mui/icons-material/OpenInNew';
import SaveAltIcon from '@mui/icons-material/SaveAlt';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Paper from '@mui/material/Paper';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import { externalLinkProps } from '../lib/externalLink';
import { useLocale } from '../lib/useLocale';
import { buildVCard, downloadVCard } from '../lib/vcard';
import type { CardEntry } from '../types';
import { QrCode } from './QrCode';

interface QrPanelProps {
  readonly entry: CardEntry;
}

export function QrPanel({ entry }: QrPanelProps) {
  const { t, l, locale } = useLocale();
  const label = l(entry.label);

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
        {/*
          Sized for the densest code the card carries, not the sparsest: a
          vCard runs to around 65 modules where a link runs to 29, and at the
          old 180px that left each module under 3px on a small phone. Still
          inside the width of a 320px screen once the card and the quiet zone
          have taken their padding.
        */}
        <Box sx={{ width: { xs: 200, sm: 240 } }}>
          <QrCode
            value={
              entry.kind === 'contact'
                ? buildVCard(entry.contact, locale)
                : entry.url
            }
            title={entry.kind === 'link' ? `${label} — ${entry.handle}` : label}
            /*
              A vCard is an order of magnitude longer than a URL, and every
              extra byte costs module size at a fixed width on screen. `L`
              spends the least of the code on error correction, which is the
              right trade for a lit screen held up for a second — the damage
              and smudging the higher levels exist for happen to print.
            */
            level={entry.kind === 'contact' ? 'L' : 'M'}
          />
        </Box>
      </Paper>

      <Stack spacing={0.5} sx={{ textAlign: 'center' }} aria-live="polite">
        <Typography variant="subtitle1">{label}</Typography>
        {/*
          A link names what the code will hand over — the handle is the thing
          you are checking before you scan. The contact card's details are the
          payload itself, and the header above has already said whose they are.
        */}
        {entry.kind === 'link' && (
          <Typography
            variant="body2"
            color="text.secondary"
            sx={{ overflowWrap: 'anywhere' }}
          >
            {entry.handle}
          </Typography>
        )}
      </Stack>

      {/*
        The button is for the visitor reading on the same device the code is
        on, who has no second phone to point at it: saving the file gets them
        the same contact the code would have.
      */}
      {entry.kind === 'contact' ? (
        <Button
          onClick={() => downloadVCard(entry.contact, locale)}
          variant="contained"
          endIcon={<SaveAltIcon />}
          fullWidth
        >
          {t('contact.save')}
        </Button>
      ) : (
        <Button
          component="a"
          {...externalLinkProps(entry.url)}
          variant="contained"
          endIcon={<OpenInNewIcon />}
          fullWidth
        >
          {t('qr.open', { label })}
        </Button>
      )}

      <Typography variant="caption" color="text.secondary" align="center">
        {entry.kind === 'contact' ? t('contact.hint') : t('qr.hint')}
      </Typography>
    </Stack>
  );
}
