import React, { useState } from 'react';

const styles = {
  nav: {
    position: 'fixed', top: 0, left: 0, right: 0, zIndex: 1000,
    background: 'rgba(11,31,58,0.97)', backdropFilter: 'blur(14px)',
    borderBottom: '1px solid rgba(201,168,76,0.22)',
    display: 'flex', alignItems: 'center', justifyContent: 'space-between',
    padding: '0 5%', height: '72px',
  },
  brand: {
    display: 'flex', alignItems: 'center', gap: '13px', cursor: 'pointer',
  },
  logo: {
    width: '44px', height: '44px',
    background: 'linear-gradient(135deg,#C9A84C,#E8C96C)',
    borderRadius: '10px', display: 'flex', alignItems: 'center',
    justifyContent: 'center', fontFamily: "'Bebas Neue',sans-serif",
    fontSize: '20px', color: '#0B1F3A', letterSpacing: '1px', flexShrink: 0,
  },
  titleWrap: {},
  titleMain: {
    display: 'block', fontFamily: "'Playfair Display',serif",
    fontSize: '17px', fontWeight: 700, color: '#fff',
  },
  titleSub: {
    display: 'block', fontSize: '9.5px', color: '#C9A84C',
    letterSpacing: '2px', textTransform: 'uppercase', marginTop: '1px',
  },
  center: {
    flex: 1, display: 'flex', justifyContent: 'center',
  },
  links: {
    display: 'flex', alignItems: 'center', gap: '4px',
  },
  ctaWrap: {
    display: 'flex', alignItems: 'center', justifyContent: 'flex-end',
  },
  hamburger: {
    display: 'none', flexDirection: 'column', gap: '5px',
    cursor: 'pointer', padding: '6px', background: 'none', border: 'none',
  },
  bar: { width: '24px', height: '2px', background: '#fff', borderRadius: '2px', display: 'block' },
};

export default function Navbar({ currentPage, navigate, activeSection }) {
  const [mobileOpen, setMobileOpen] = useState(false);

  const links = [
    { key: 'landing', label: 'Home' },
    { key: 'courses', label: 'Courses' },
    { key: 'reviews', label: 'Reviews' },
    { key: 'ladies', label: '♀ Ladies Program' },
    { key: 'contact', label: 'Contact Us' },
  ];

  const activeKey = currentPage === 'landing' ? (activeSection || 'landing') : currentPage;
  const linkStyle = (key) => ({
    color: activeKey === key ? '#C9A84C' : 'rgba(255,255,255,0.78)',
    textDecoration: 'none', fontSize: '13.5px', fontWeight: 500,
    padding: '8px 13px', borderRadius: '8px', cursor: 'pointer',
    background: activeKey === key ? 'rgba(201,168,76,0.1)' : 'transparent',
    transition: 'all .2s', whiteSpace: 'nowrap',
  });

  const ctaStyle = {
    background: '#C9A84C', color: '#0B1F3A', fontWeight: 700,
    fontSize: '13.5px', padding: '9px 20px', borderRadius: '8px',
    marginLeft: '6px', cursor: 'pointer', textDecoration: 'none',
    transition: 'all .2s',
  };

  const go = (key) => { navigate(key); setMobileOpen(false); };

  return (
    <nav style={styles.nav}>
      <div style={styles.brand} onClick={() => go('landing')}>
        <div style={styles.logo}>GVV</div>
        <div style={styles.titleWrap}>
          <span style={styles.titleMain}>GVV Driving School</span>
          <span style={styles.titleSub}>Government Approved · Est. 2009</span>
        </div>
      </div>

      {/* Desktop links */}
      <div style={styles.center} className="nav-desktop">
        <div style={styles.links}>
          {links.map(l => (
            <span key={l.key} style={linkStyle(l.key)} onClick={() => go(l.key)}>{l.label}</span>
          ))}
        </div>
      </div>
      <div style={styles.ctaWrap} className="nav-desktop">
        <span style={ctaStyle} onClick={() => go('enroll')}>Enroll Now →</span>
      </div>
      <style>{`
        @media(max-width:900px){
          .nav-desktop { display: none !important; }
          .nav-hamburger { display: flex !important; }
        }
      `}</style>

      {/* Hamburger */}
      <button
        className="nav-hamburger"
        style={{ ...styles.hamburger, display: 'none' }}
        onClick={() => setMobileOpen(!mobileOpen)}
        aria-label="Toggle menu"
      >
        <span style={styles.bar}></span>
        <span style={styles.bar}></span>
        <span style={styles.bar}></span>
      </button>

      {/* Mobile menu overlay */}
      {mobileOpen && (
        <div style={{
          position: 'fixed', top: '72px', left: 0, right: 0,
          background: 'rgba(11,31,58,0.98)', padding: '16px 5%',
          display: 'flex', flexDirection: 'column', gap: '3px', zIndex: 998,
        }}>
          {links.map(l => (
            <span key={l.key} style={{ ...linkStyle(l.key), padding: '12px 16px' }} onClick={() => go(l.key)}>{l.label}</span>
          ))}
          <span style={{ ...ctaStyle, marginLeft: 0, marginTop: '8px', textAlign: 'center', padding: '12px 16px' }} onClick={() => go('enroll')}>Enroll Now →</span>
        </div>
      )}
    </nav>
  );
}
