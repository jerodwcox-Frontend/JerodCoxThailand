import { Link, useParams, Navigate } from 'react-router-dom';
import { updates, support } from '../data';

const URL_RE = /(https?:\/\/[^\s]+)/g;
const SITE = 'https://jerod-cox-thailand.vercel.app';

function linkify(text) {
  return text.split(URL_RE).map((part, i) => {
    if (i % 2 === 0) return part;
    const trail = part.match(/[.,;:!?)"']+$/)?.[0] ?? '';
    const url = trail ? part.slice(0, -trail.length) : part;
    let link;
    if (url.startsWith(SITE)) {
      link = (
        <Link key={i} to={url.slice(SITE.length) || '/'}>
          {url}
        </Link>
      );
    } else {
      link = (
        <a key={i} href={url} target="_blank" rel="noopener noreferrer">
          {url}
        </a>
      );
    }
    return trail ? [link, trail] : link;
  });
}

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

        <span className="update-week">{update.label ?? `Week ${update.week}`}</span>
        <h1>{update.title}</h1>

        <article className="update-body">
          {update.body.map((block, i) => {
            if (block.type === 'h2') return <h2 key={i}>{block.text}</h2>;
            if (block.type === 'h3') return <h3 key={i}>{block.text}</h3>;
            if (block.type === 'buttons')
              return (
                <div key={i} className="update-buttons">
                  {block.links.map((l, j) =>
                    l.href.startsWith(SITE) ? (
                      <Link key={j} className="btn btn-outline" to={l.href.slice(SITE.length) || '/'}>
                        {l.label}
                      </Link>
                    ) : (
                      <a key={j} className="btn btn-outline" href={l.href} target="_blank" rel="noopener noreferrer">
                        {l.label}
                      </a>
                    )
                  )}
                </div>
              );
            if (block.type === 'cta')
              return (
                <div key={i} className="update-cta">
                  <h3>{block.title}</h3>
                  <p>{block.text}</p>
                  <div className="update-cta-buttons">
                    {[
                      { label: block.button, href: block.href, cls: 'btn btn-primary' },
                      ...(block.secondary
                        ? [{ label: block.secondary.button, href: block.secondary.href, cls: 'btn btn-ghost' }]
                        : []),
                    ].map((b) =>
                      b.href.startsWith(SITE) ? (
                        <Link key={b.label} className={b.cls} to={b.href.slice(SITE.length) || '/'}>
                          {b.label}
                        </Link>
                      ) : (
                        <a key={b.label} className={b.cls} href={b.href} target="_blank" rel="noopener noreferrer">
                          {b.label}
                        </a>
                      )
                    )}
                  </div>
                </div>
              );
            return <p key={i}>{linkify(block.text)}</p>;
          })}

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
              {update.closing.phone && (
                <>
                  <br />
                  <a href={`tel:+1${update.closing.phone.replace(/\D/g, '')}`}>{update.closing.phone}</a>
                </>
              )}
            </p>
          )}

          {update.ps && (
            <div className="update-ps">
              <h3>P.S.</h3>
              {update.ps.split('\n\n').map((para, i) => (
                <p key={i}>{para}</p>
              ))}
            </div>
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
