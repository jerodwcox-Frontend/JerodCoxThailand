import { Link } from 'react-router-dom';
import { nav, contact } from '../data';
import { SproutIcon, MailIcon, PinIcon } from './icons';

export default function Footer() {
  return (
    <footer className="site-footer">
      <div className="container">
        <div className="footer-grid">
          <div className="footer-brand">
            <Link className="brand" to="/">
              <span className="brand-mark">
                <SproutIcon />
              </span>
              <span className="brand-text">
                <span className="name">Jerod Cox in Thailand</span>
              </span>
            </Link>
            <p>
              Learning the language, sharing Y'shua, and standing with the people of Thailand —
              partnered with Congregation Roeh Israel.
            </p>
          </div>

          <div className="footer-col">
            <h4>Explore</h4>
            {nav.map((item) => (
              <Link key={item.href} to={item.href}>
                {item.label}
              </Link>
            ))}
          </div>

          <div className="footer-col">
            <h4>Contact</h4>
            <a href={`mailto:${contact.email}`}>
              <MailIcon width="16" height="16" /> {contact.email}
            </a>
            <span className="footer-address">
              <PinIcon width="16" height="16" /> {contact.address.join(', ')}
            </span>
          </div>
        </div>

        <div className="footer-bottom">
          <p>&copy; {new Date().getFullYear()} Jerod Cox in Thailand. Serving in partnership with Congregation Roeh Israel.</p>
        </div>
      </div>
    </footer>
  );
}
