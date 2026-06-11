import React from 'react';
 
const s = {
  footer: { background: '#1A1A18', color: 'rgba(255,255,255,0.55)', padding: '56px 5% 28px' },
  inner: { maxWidth: '1160px', margin: '0 auto' },
  grid: {
    display: 'grid', gridTemplateColumns: '2fr 1fr 1fr 1fr', gap: '36px',
    paddingBottom: '36px', borderBottom: '1px solid rgba(255,255,255,0.1)', marginBottom: '26px',
  },
  logo: {
    width: '44px', height: '44px',
    background: 'linear-gradient(135deg,#C9A84C,#E8C96C)',
    borderRadius: '10px', display: 'flex', alignItems: 'center',
    justifyContent: 'center', fontFamily: "'Bebas Neue',sans-serif",
    fontSize: '20px', color: '#0B1F3A', letterSpacing: '1px',
    flexShrink: 0, marginBottom: '14px',
  },
  brandP: { fontSize: '13.5px', lineHeight: 1.75, margin: '14px 0' },
  badge: {
    display: 'inline-flex', alignItems: 'center', gap: '7px',
    background: 'rgba(26,107,60,0.2)', border: '1px solid rgba(26,107,60,0.4)',
    color: '#4CAF82', fontSize: '11.5px', fontWeight: 600,
    padding: '6px 14px', borderRadius: '100px',
  },
  colH4: { color: '#fff', fontSize: '13.5px', fontWeight: 600, marginBottom: '14px' },
  colA: {
    display: 'block', color: 'rgba(255,255,255,0.48)', textDecoration: 'none',
    fontSize: '13.5px', marginBottom: '9px', transition: 'color .2s', cursor: 'pointer',
  },
  bottom: { display: 'flex', alignItems: 'center', justifyContent: 'space-between', fontSize: '12.5px' },
};

export default function Footer({ navigate, variant = 'default' }) {
  const isLadies = variant === 'ladies';
  return (
    <footer style={s.footer}>
      <div style={s.inner}>
        <div style={{ ...s.grid, ...(window.innerWidth < 900 ? { gridTemplateColumns: '1fr 1fr' } : {}) }}>
          <div>
            <div style={s.logo}>GVV</div>
            <p style={s.brandP}>
              {isLadies
                ? 'GVV Driving School — proud home of the Ladies Teaches Ladies program. Empowering women drivers since 2009.'
                : "GVV Driving School — Chennai's premier government-approved driving institution. Empowering safe, confident drivers since 2009."}
            </p>
            <div style={s.badge}>✓ Government Approved · Reg. No: TN/DS/2005/0412</div>
          </div>
          <div>
            <h4 style={s.colH4}>Pages</h4>
            {[['landing','Home'],['courses','Courses'],['ladies','♀ Ladies Program'],['contact','Contact Us']].map(([k,l])=>(
              <span key={k} style={s.colA} onClick={()=>navigate(k)}>{l}</span>
            ))}
          </div>
          <div>
            <h4 style={s.colH4}>{isLadies ? 'Ladies Enquiry' : 'Contact'}</h4>
            <a href="tel:+919884772048" style={s.colA}>+91 9884772048</a>
            <a href="tel:+919840067890" style={s.colA}>+91 9884770583 (Ladies)</a>
            <a href="mailto:info@gvvdrivingschool.in" style={s.colA}>info@gvvdrivingschool.in</a>
          </div>
          <div>
            <h4 style={s.colH4}>Address</h4>
            <span style={s.colA}>42, Anna Salai, Guindy</span>
            <span style={s.colA}>Chennai – 600 032</span>
            <span style={s.colA}>Tamil Nadu, India</span>
          </div>
        </div>
        <div style={s.bottom}>
          <span>© 2025 GVV Driving School. All rights reserved. Government Approved — Tamil Nadu.</span>
          <span style={{ color: 'rgba(255,255,255,0.25)' }}>Crafted with ♥ for Safe Drivers</span>
        </div>
      </div>
    </footer>
  );
}
