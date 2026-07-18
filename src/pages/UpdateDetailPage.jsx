import { Link, useParams, Navigate } from 'react-router-dom';
import { updates, support } from '../data';

export default function UpdateDetailPage() {
  const { slug } = useParams();
  const update = updates.find((u) => u.slug === slug);

  if (!update) return <Navigate to="/updates" replace />;

  return (
    <section className="update-detail">
      <div className="container">
        <Link className="back-link" to="/updates">
          ← All Updates
        </Link>

        <span className="update-week">Week {update.week}</span>
        <h1>{update.title}</h1>

        <article className="update-body">
          {update.body.map((block, i) => (
            <p key={i}>{block.text}</p>
          ))}

          {update.prayerPoints && (
            <div className="prayer-points">
              <h3>How You Can Pray</h3>
              <ol>
                {update.prayerPoints.map((point, i) => (
                  <li key={i}>{point}</li>
                ))}
              </ol>
            </div>
          )}

          {update.closing && (
            <p className="update-signature">
              {update.closing.text}
              <br />
              <br />
              {update.closing.signoff}
              <br />
              <strong>{update.closing.signature}</strong>
            </p>
          )}

          <div className="update-support-note">
            <p>
              Want to partner in this work? See the{' '}
              <Link to="/support">Support page</Link> for prayer needs and ways to give, including
              through{' '}
              <a href={support.throughRoehIsrael} target="_blank" rel="noopener noreferrer">
                Congregation Roeh Israel
              </a>
              .
            </p>
          </div>
        </article>
      </div>
    </section>
  );
}
