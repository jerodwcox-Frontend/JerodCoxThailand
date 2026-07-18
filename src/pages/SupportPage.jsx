import PageBanner from '../components/PageBanner';
import { support, remoteWork, contact } from '../data';
import { HeartIcon, MailIcon, PinIcon, CodeIcon } from '../components/icons';

export default function SupportPage() {
  return (
    <>
      <PageBanner
        eyebrow="Partner in the work"
        title="Support the Mission"
        lede="Every conversation about Y'shua, every relationship being built, and every seed of the Gospel planted in Thailand is connected to prayer and partnership."
      />

      <section className="support-section">
        <div className="container">
          <div className="support-goal">
            <HeartIcon />
            <p>{support.goal}</p>
          </div>

          <div className="support-grid">
            <div className="support-card">
              <h3>PayPal</h3>
              <p>{support.paypal}</p>
            </div>
            <div className="support-card">
              <h3>Zelle</h3>
              <p>{support.zelle}</p>
            </div>
            <div className="support-card">
              <h3>
                <PinIcon width="18" height="18" /> Mail a Gift
              </h3>
              <p>{support.mail.join(', ')}</p>
            </div>
            <div className="support-card">
              <h3>Through Congregation Roeh Israel</h3>
              <p>
                <a href={support.throughRoehIsrael} target="_blank" rel="noopener noreferrer">
                  roehisrael.org
                </a>
              </p>
            </div>
          </div>

          <div className="remote-work">
            <h3>
              <CodeIcon width="20" height="20" /> Remote Development Work
            </h3>
            <p>{remoteWork.intro}</p>
            <div className="portfolio-links">
              {remoteWork.projects.map((p) => (
                <a key={p.href} href={p.href} target="_blank" rel="noopener noreferrer" className="chip-link">
                  {p.label}
                </a>
              ))}
            </div>
          </div>

          <div className="support-contact">
            <MailIcon width="18" height="18" />
            <p>
              Questions about giving or partnership? Reach out any time at{' '}
              <a href={`mailto:${contact.email}`}>{contact.email}</a>.
            </p>
          </div>
        </div>
      </section>
    </>
  );
}
