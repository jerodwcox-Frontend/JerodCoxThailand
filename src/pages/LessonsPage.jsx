import { Link, Navigate, useLocation } from 'react-router-dom';
import PageBanner from '../components/PageBanner';
import { lessons, podcast } from '../data';
import { PlayIcon } from '../components/icons';

export default function LessonsPage() {
  const { hash } = useLocation();
  // Older emails linked to the sign-up form here; it now lives on the Updates page
  if (hash === '#join' || hash === '#optout') return <Navigate to={`/updates${hash}`} replace />;

  return (
    <>
      <PageBanner
        eyebrow="Teaching"
        title="Lessons"
        lede="Bible studies and discipleship lessons from the field."
      />

      <section className="updates-list">
        <div className="container">
          <div className="podcast-banner">
            <img src="/images/podcast-cover.jpg" alt="" width="72" height="72" />
            <span className="podcast-banner-text">
              <span className="update-week">Podcast</span>
              <strong>{podcast.name}</strong>
              <span>Listen to the weekly lessons on Spotify or Pocket Casts</span>
            </span>
            <span className="podcast-banner-links">
              <a
                className="podcast-banner-cta"
                href={podcast.spotifyUrl}
                target="_blank"
                rel="noopener noreferrer"
              >
                Listen on Spotify ↗
              </a>
              <a
                className="podcast-banner-cta podcast-banner-cta-pocketcasts"
                href={podcast.pocketCastsUrl}
                target="_blank"
                rel="noopener noreferrer"
              >
                Listen on Pocket Casts ↗
              </a>
            </span>
          </div>

          {lessons.map((l) => (
            <Link className="update-card" to={`/lessons/${l.slug}`} key={l.slug}>
              {l.audio ? (
                <span className="update-week update-week-icon">
                  <PlayIcon width="14" height="14" /> Bible Study · Audio
                </span>
              ) : (
                <span className="update-week">Bible Study</span>
              )}
              <h3>{l.title}</h3>
              <p>{l.excerpt}</p>
              <span className="explore-more">
                {l.audio ? 'Read or listen →' : 'Read the study →'}
              </span>
            </Link>
          ))}
        </div>
      </section>
    </>
  );
}
