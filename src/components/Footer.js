import React from 'react';
import { useLanguage } from '../context/LanguageContext';
 
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
  const { t } = useLanguage();

  return (
    <footer style={s.footer}>
      <div style={s.inner}>
        <div style={{ ...s.grid, ...(window.innerWidth < 900 ? { gridTemplateColumns: '1fr 1fr' } : {}) }}>
          <div>
            <div style={s.logo}>GVV</div>
            <p style={s.brandP}>
              {isLadies ? t('footer_desc_ladies') : t('footer_desc_default')}
            </p>
          </div>
          <div>
            <h4 style={s.colH4}>{t('footer_col_pages')}</h4>
            {[
              ['landing', t('home')],
              ['courses', t('courses')],
              ['ladies', t('ladies_program')],
              ['contact', t('contact_us')]
            ].map(([k, l]) => (
              <span key={k} style={s.colA} onClick={() => navigate(k)}>{l}</span>
            ))}
          </div>
          <div>
            <h4 style={s.colH4}>{isLadies ? t('footer_col_enquiry') : t('footer_col_contact')}</h4>
            <a href="tel:+919884772048" style={s.colA}>+91 9884772048</a>
            <a href="https://wa.me/919884770583?text=Hi!%20I%20want%20to%20know%20more%20about%20the%20Ladies%20Driving%20Program." target="_blank" rel="noreferrer" style={s.colA}>+91 9884770583 (Ladies)</a>
            <a href="mailto:info@gvvdrivingschool.in" style={s.colA}>Gvvds2009@gmail.com</a>
          </div>
          <div>
            <h4 style={s.colH4}>{t('footer_col_addr')}</h4>
            <span style={s.colA}>{t('footer_addr_line1')}</span>
            <span style={s.colA}>{t('footer_addr_line2')}</span>
            <span style={s.colA}>{t('footer_addr_line3')}</span>
          </div>
        </div>
        <div style={s.bottom}>
          <span>{t('footer_copyright')}</span>
          <span style={{ color: 'rgba(255,255,255,0.25)' }}>{t('footer_crafted')}</span>
        </div>
      </div>
    </footer>
  );
}

