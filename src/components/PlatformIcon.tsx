import ContactPageIcon from '@mui/icons-material/ContactPage';
import EmailIcon from '@mui/icons-material/Email';
import GitHubIcon from '@mui/icons-material/GitHub';
import InstagramIcon from '@mui/icons-material/Instagram';
import LanguageIcon from '@mui/icons-material/Language';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import TelegramIcon from '@mui/icons-material/Telegram';
import type { SvgIconComponent } from '@mui/icons-material';
import type { SvgIconProps } from '@mui/material/SvgIcon';
import type { Platform } from '../types';

/*
  Straight from `@mui/icons-material`, which ships Material's own brand marks.
  Drawing our own would mean matching Material's 24dp grid and optical weight
  by hand for no gain — and the official set is already licensed for this use.
*/
const ICONS: Record<Platform, SvgIconComponent> = {
  telegram: TelegramIcon,
  instagram: InstagramIcon,
  linkedin: LinkedInIcon,
  github: GitHubIcon,
  email: EmailIcon,
  website: LanguageIcon,
  contact: ContactPageIcon,
};

interface PlatformIconProps extends SvgIconProps {
  readonly platform: Platform;
}

export function PlatformIcon({ platform, ...props }: PlatformIconProps) {
  const Icon = ICONS[platform];
  return <Icon {...props} />;
}
