import { useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { SproutIcon } from './icons';
import { nav } from '../data';

export default function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <header className="navbar">
      <div className="container">
        <Link className="brand" to="/" onClick={() => setOpen(false)}>
          <span className="brand-mark">
            <SproutIcon />
          </span>
          <span className="brand-text">
            <span className="name">Jerod Cox in Thailand</span>
            <span className="tagline">Mission Updates &amp; Discipleship</span>
          </span>
        </Link>

        <button className="menu-toggle" aria-label="Toggle menu" onClick={() => setOpen((o) => !o)}>
          <span />
          <span />
          <span />
        </button>

        <nav className={`nav-links${open ? ' open' : ''}`}>
          {nav.map((item) => (
            <NavLink
              key={item.href}
              to={item.href}
              className={({ isActive }) => (isActive ? 'active' : '')}
              onClick={() => setOpen(false)}
            >
              {item.label}
            </NavLink>
          ))}
        </nav>

        <Link className="btn btn-primary nav-give" to="/support">
          Support the Mission
        </Link>
      </div>
    </header>
  );
}
