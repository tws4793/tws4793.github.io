import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Container from '@mui/material/Container';
import Divider from '@mui/material/Divider';
import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import { useState } from 'react';
import { Trans } from 'react-i18next';
import { ColorSchemeToggle } from './components/ColorSchemeToggle';
import { InstallButton } from './components/InstallButton';
import { LanguageMenu } from './components/LanguageMenu';
import { LinkList } from './components/LinkList';
import { ProfileHeader } from './components/ProfileHeader';
import { QrPanel } from './components/QrPanel';
import { ServiceWorkerPrompts } from './components/ServiceWorkerPrompts';
import { findLinkById, profile } from './data/profile';

/**
 * Which code to show on open. The manifest's launcher shortcuts point at
 * `./?code=<id>`, so that parameter picks the starting code — but it arrives
 * from outside the app, so it is matched against the profile rather than
 * handed to `findLinkById`, which throws on an id it does not know.
 */
function initialSelectedId(): string {
  const fallback = profile.links[0]?.id ?? '';
  const requested = new URLSearchParams(window.location.search).get('code');
  return profile.links.some((link) => link.id === requested)
    ? (requested ?? fallback)
    : fallback;
}

export default function App() {
  const [selectedId, setSelectedId] = useState(initialSelectedId);

  return (
    <Box
      component="main"
      sx={{ backgroundColor: 'background.default', minHeight: '100dvh', py: 4 }}
    >
      <Container maxWidth="md">
        <Stack
          direction="row"
          spacing={1}
          sx={{ mb: 2, justifyContent: 'flex-end', alignItems: 'center' }}
        >
          <InstallButton />
          <LanguageMenu />
          <ColorSchemeToggle />
        </Stack>

        <Card elevation={3}>
          <ProfileHeader profile={profile} />
          <Divider />

          {profile.links.length === 0 ? (
            <EmptyState />
          ) : (
            <Grid container>
              <Grid size={{ xs: 12, md: 5 }}>
                <CardContent>
                  <QrPanel link={findLinkById(selectedId)} />
                </CardContent>
              </Grid>

              <Grid
                size={{ xs: 12, md: 'grow' }}
                sx={{
                  /*
                    The rule between the two halves turns with the layout:
                    above the code while the columns are stacked, beside it
                    once they sit side by side.
                  */
                  borderColor: 'divider',
                  borderTop: { xs: 1, md: 0 },
                  borderLeft: { md: 1 },
                }}
              >
                <Box sx={{ py: 1 }}>
                  <LinkList
                    links={profile.links}
                    selectedId={selectedId}
                    onSelect={setSelectedId}
                  />
                </Box>
              </Grid>
            </Grid>
          )}
        </Card>
      </Container>

      <ServiceWorkerPrompts />
    </Box>
  );
}

/*
  `Trans` rather than plain interpolation: the filename has to be marked up as
  <code>, and which side of the sentence it falls on differs by language. The
  <code> tag in the translation string says where it goes.
*/
function EmptyState() {
  return (
    <CardContent>
      <Typography color="text.secondary">
        <Trans
          i18nKey="empty.message"
          values={{ file: 'src/data/profile.ts' }}
          components={{ code: <code /> }}
        />
      </Typography>
    </CardContent>
  );
}
