import { useState, useEffect } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import NotificationIndicator from '../NotificationIndicator/NotificationIndicator';
import { getUnreadCount } from '../../services/notifications';
import './Navbar.css';

function Navbar() {
  const { user } = useAuth();
  const [menuOpen, setMenuOpen] = useState(false);
  const [unreadCount, setUnreadCount] = useState(0);
  const location = useLocation();
  const userInitial = user?.name?.charAt(0)?.toUpperCase() || '?';

  useEffect(() => {
    getUnreadCount().then(setUnreadCount).catch(() => setUnreadCount(0));
  }, [location.pathname]);

  useEffect(() => {
    setMenuOpen(false);
  }, [location.pathname]);

  const navLinks = [
    { to: '/browse', label: 'Browse Tools' },
    { to: '/', label: 'My Borrowings', end: true },
  ];

  return (
    <header className="navbar">
      <div className="navbar__inner">
        <Link to="/" className="navbar__brand">
          <svg className="navbar__logo" width="28" height="28" viewBox="0 0 28 28" fill="none" aria-hidden="true">
            <rect x="2" y="8" width="24" height="16" rx="2" stroke="currentColor" strokeWidth="2" />
            <path d="M8 8V5a6 6 0 0 1 12 0v3" stroke="currentColor" strokeWidth="2" />
            <circle cx="14" cy="16" r="2" fill="currentColor" />
          </svg>
          <span className="navbar__brand-text">
            <strong>CTLP</strong>
            <span className="navbar__brand-sub">Community Tool Lending</span>
          </span>
        </Link>

        <nav className={`navbar__nav ${menuOpen ? 'navbar__nav--open' : ''}`} aria-label="Main navigation">
          {navLinks.map((link) => (
            <NavLink
              key={link.to}
              to={link.to}
              end={link.end}
              className={({ isActive }) =>
                `navbar__link ${isActive ? 'navbar__link--active' : ''}`
              }
            >
              {link.label}
            </NavLink>
          ))}
          <button type="button" className="navbar__link navbar__link--icon" aria-label="Notifications">
            <NotificationIndicator count={unreadCount} />
          </button>
          <button type="button" className="navbar__link navbar__profile" aria-label="Profile">
            <span className="navbar__avatar">{userInitial}</span>
            <span className="navbar__profile-label">Profile</span>
          </button>
        </nav>

        <button
          type="button"
          className="navbar__toggle"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-expanded={menuOpen}
          aria-label={menuOpen ? 'Close menu' : 'Open menu'}
        >
          {menuOpen ? (
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden="true">
              <path d="M18 6L6 18M6 6l12 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
            </svg>
          ) : (
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden="true">
              <path d="M3 6h18M3 12h18M3 18h18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
            </svg>
          )}
        </button>
      </div>
    </header>
  );
}

export default Navbar;
