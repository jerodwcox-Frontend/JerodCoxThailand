import { Link } from 'react-router-dom';
import { updates, support } from '../data';
import { BookIcon, HeartIcon, HandsIcon } from '../components/icons';

const quickLinks = [
  { icon: BookIcon, label: 'Updates', desc: 'Weekly mission updates from the field', href: '/updates' },
  { icon: HandsIcon, label: 'About', desc: 'The calling and the work in Thailand', href: '/about' },
  { icon: HeartIcon, label: 'Support', desc: 'Prayer and financial partnership', href: '/support' },
];

export default function Home() {
  const latest = updates[0];

  return (
    <>
      {latest && (
        <section className="update-detail home-latest">
          <div className="container">
            <span className="update-week">Latest Update &middot; Week {latest.week}</span>
            <h1>{latest.title}</h1>

            <article className="update-body">
              {latest.body.map((block, i) => {
                if (block.type === 'h2') return <h2 key={i}>{block.text}</h2>;
                if (block.type === 'h3') return <h3 key={i}>{block.text}</h3>;
                return <p key={i}>{block.text}</p>;
              })}

              {latest.prayerPoints && (
                <div className="prayer-points">
                  <h3>How You Can Pray</h3>
                  <ol>
                    {latest.prayerPoints.map((point, i) => (
                      <li key={i}>{point}</li>
                    ))}
                  </ol>
                </div>
              )}

              {latest.closing && (
                <p className="update-signature">
                  {latest.closing.text}
                  <br />
                  <br />
                  {latest.closing.signoff}
                  <br />
                  <strong>{latest.closing.signature}</strong>
                </p>
              )}

              <div className="update-support-note">
                <p>
                  Want to partner in this work? See the{' '}
                  <Link to="/support">Support page</Link> for prayer needs and ways to give,
                  including through{' '}
                  <a href={support.throughRoehIsrael} target="_blank" rel="noopener noreferrer">
                    Congregation Roeh Israel
                  </a>
                  .
                </p>
              </div>
            </article>

            <div className="hero-actions home-latest-actions">
              <Link className="btn btn-primary" to="/updates">
                See All Updates
              </Link>
              <Link className="btn btn-ghost" to="/support">
                Support the Mission
              </Link>
            </div>
          </div>
        </section>
      )}

      <section className="explore">
        <div className="container">
          <div className="explore-grid">
            {quickLinks.map(({ icon: Icon, label, desc, href }) => (
              <Link className="explore-card" to={href} key={href}>
                <span className="explore-icon">
                  <Icon />
                </span>
                <h3>{label}</h3>
                <p>{desc}</p>
                <span className="explore-more">Learn more →</span>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
