import { Link } from 'react-router-dom';
import PageBanner from '../components/PageBanner';
import { lessons } from '../data';
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
