import { useState } from 'react';
import { findLinkById, profile } from './data/profile';
import { LinkList } from './components/LinkList';
import { ProfileHeader } from './components/ProfileHeader';
import { QrPanel } from './components/QrPanel';
import './App.css';

export default function App() {
  const [selectedId, setSelectedId] = useState(
    () => profile.links[0]?.id ?? '',
  );

  if (profile.links.length === 0) {
    return (
      <main className="page">
        <p className="page__empty">
          Add your first link in <code>src/data/profile.ts</code> and it will
          appear here with its own code.
        </p>
      </main>
    );
  }

  const selected = findLinkById(selectedId);

  return (
    <main className="page">
      <div className="card">
        <div className="card__identity">
          <ProfileHeader profile={profile} />
        </div>

        <div className="card__panel">
          <QrPanel link={selected} />
        </div>

        <div className="card__links">
          <LinkList
            links={profile.links}
            selectedId={selectedId}
            onSelect={setSelectedId}
          />
        </div>
      </div>
    </main>
  );
}
