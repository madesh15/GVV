import React from 'react';

export default function InnerPageHero({ breadcrumb, title, titleEm, subtitle, navigate, darkTheme = false }) {
  const heroStyle = {
    background: darkTheme
      ? 'linear-gradient(135deg,#280715 0%,#420C26 55%,#280715 100%)'
      : 'linear-gradient(155deg,#0B1F3A 0%,#162D50 60%,#1B3C64 100%)',
    padding: '70px 5% 60px', position: 'relative', overflow: 'hidden',
    marginTop: '72px',
  };

  return (
    <div style={heroStyle}>
      <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(circle at 80% 50%,rgba(201,168,76,0.07),transparent 60%)', pointerEvents: 'none' }} />
      <div style={{ maxWidth: '1160px', margin: '0 auto', position: 'relative', zIndex: 1 }}>
        <div style={{ fontSize: '12px', color: 'rgba(255,255,255,0.45)', marginBottom: '14px', display: 'flex', alignItems: 'center', gap: '8px' }}>
          <span style={{ cursor: 'pointer', transition: 'color .2s' }} onClick={() => navigate('landing')}>← Home</span>
          <span>/ {breadcrumb}</span>
        </div>
        <h1 style={{ fontFamily: "'Playfair Display',serif", fontSize: 'clamp(32px,4vw,54px)', fontWeight: 900, color: '#fff', marginBottom: '12px', lineHeight: 1.1 }}>
          {title} {titleEm && <em style={{ color: '#C9A84C', fontStyle: 'italic' }}>{titleEm}</em>}
        </h1>
        <p style={{ fontSize: '16px', color: 'rgba(255,255,255,0.65)', maxWidth: '600px', lineHeight: 1.7 }}>{subtitle}</p>
      </div>
    </div>
  );
}
