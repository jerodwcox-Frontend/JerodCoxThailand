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
              <span className="update-week">Bible Study</span>
              <h3>{l.title}</h3>
              <p>{l.excerpt}</p>
              <span className="explore-more">Read the study →</span>
            </Link>
          ))}

          <div className="update-card update-card-pending">
            <span className="update-week update-week-icon">
              <PlayIcon width="14" height="14" /> Coming soon
            </span>
            <h3>Recorded Lessons</h3>
            <p>Audio and video lessons are on the way — check back soon.</p>
          </div>
        </div>
      </section>
    </>
  );
}
