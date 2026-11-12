import { Link } from 'react-router-dom';
import PageBanner from '../components/PageBanner';
import { lessons, podcast } from '../data';
import { PlayIcon } from '../components/icons';

export default function LessonsPage() {
  return (
    <>
      <PageBanner
        eyebrow="Teaching"
        title="Lessons"
        lede="Bible studies and discipleship lessons from the field."
      />

      <section className="updates-list">
        <div className="container">
          <a
            className="podcast-banner"
            href={podcast.spotifyUrl}
            target="_blank"
            rel="noopener noreferrer"
          >
            <img src="/images/podcast-cover.jpg" alt="" width="72" height="72" />
            <span className="podcast-banner-text">
              <span className="update-week">Podcast</span>
              <strong>{podcast.name}</strong>
              <span>Listen to the weekly lessons on Spotify</span>
            </span>
            <span className="podcast-banner-cta">Listen on Spotify ↗</span>
          </a>

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
