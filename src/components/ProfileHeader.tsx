import PlaceIcon from '@mui/icons-material/Place';
import Avatar from '@mui/material/Avatar';
import CardHeader from '@mui/material/CardHeader';
import Chip from '@mui/material/Chip';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import type { Profile } from '../types';

interface ProfileHeaderProps {
  readonly profile: Profile;
}

export function ProfileHeader({ profile }: ProfileHeaderProps) {
  return (
    <CardHeader
      avatar={
        <Avatar
          aria-hidden
          sx={{ bgcolor: 'primary.main', width: 56, height: 56 }}
        >
          {initials(profile.name)}
        </Avatar>
      }
      title={
        <Typography variant="h5" component="h1">
          {profile.name}
        </Typography>
      }
      subheader={
        <Stack spacing={1} sx={{ mt: 0.5, alignItems: 'flex-start' }}>
          <Typography variant="body2" color="text.secondary">
            {profile.tagline}
          </Typography>
          <Chip
            size="small"
            variant="outlined"
            icon={<PlaceIcon />}
            label={profile.location}
          />
        </Stack>
      }
    />
  );
}

/**
 * Up to two initials for the avatar, from the first and last word of the name.
 * A photo would be better, but the profile deliberately carries no image.
 */
function initials(name: string): string {
  const words = name.trim().split(/\s+/).filter(Boolean);
  const first = words.at(0)?.[0] ?? '';
  const last = words.length > 1 ? (words.at(-1)?.[0] ?? '') : '';
  return (first + last).toUpperCase();
}
