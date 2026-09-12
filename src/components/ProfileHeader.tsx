import type { Profile } from '../types';
import './ProfileHeader.css';

interface ProfileHeaderProps {
  readonly profile: Profile;
}

export function ProfileHeader({ profile }: ProfileHeaderProps) {
  return (
    <header className="profile">
      <h1 className="profile__name">{profile.name}</h1>
      <p className="profile__tagline">{profile.tagline}</p>
      <p className="profile__location">{profile.location}</p>
    </header>
  );
}
