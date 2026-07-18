import { Link } from 'react-router-dom';
import PageBanner from '../components/PageBanner';
import { updates } from '../data';

export default function UpdatesPage() {
  return (
    <>
      <PageBanner
        eyebrow="From the field"
        title="Mission Updates"
        lede="Weekly updates from Thailand — language, relationships, and where G-d is already at work."
      />

      <section className="updates-list">
        <div className="container">
          {updates.map((u) => (
            <Link className="update-card" to={`/updates/${u.slug}`} key={u.slug}>
              <span className="update-week">Week {u.week}</span>
              <h3>{u.title}</h3>
              <p>{u.excerpt}</p>
              <span className="explore-more">Read the full update →</span>
            </Link>
          ))}

          <div className="update-card update-card-pending">
            <span className="update-week">Coming soon</span>
            <h3>Earlier Updates</h3>
            <p>Additional weekly updates from the field will be added here as they're posted.</p>
          </div>
        </div>
      </section>
    </>
  );
}
