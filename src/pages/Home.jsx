import { Link } from 'react-router-dom';
import Hero from '../components/Hero';
import { updates } from '../data';
import { BookIcon, PlayIcon, HeartIcon, HandsIcon } from '../components/icons';

const quickLinks = [
  { icon: BookIcon, label: 'Updates', desc: 'Weekly mission updates from the field', href: '/updates' },
  { icon: PlayIcon, label: 'Lessons', desc: 'Recorded teaching and discipleship lessons', href: '/lessons' },
  { icon: HandsIcon, label: 'About', desc: 'The calling and the work in Thailand', href: '/about' },
  { icon: HeartIcon, label: 'Support', desc: 'Prayer and financial partnership', href: '/support' },
];

export default function Home() {
  const latest = updates[0];

  return (
    <>
      <Hero />

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

      {latest && (
        <section className="latest-update">
          <div className="container">
            <div className="section-head">
              <span className="eyebrow">Latest from the field</span>
              <h2>Week {latest.week}: {latest.title}</h2>
              <p>{latest.excerpt}</p>
            </div>
            <Link className="btn btn-primary" to={`/updates/${latest.slug}`}>
              Read the Full Update
            </Link>
          </div>
        </section>
      )}
    </>
  );
}
