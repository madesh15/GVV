import React from 'react';
import { useLanguage } from '../context/LanguageContext';

export default function FloatingButtons({ navigate, scrollY }) {
  const { t } = useLanguage();
  const visible = scrollY > 350;

  const wrap = {
    position: 'fixed', bottom: '28px', right: '28px', zIndex: 900,
    display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: '10px',
    opacity: visible ? 1 : 0, pointerEvents: visible ? 'auto' : 'none',
    transition: 'opacity .4s',
  };

  const base = {
    padding: '12px 20px', borderRadius: '100px', border: 'none',
    cursor: 'pointer', fontWeight: 700, fontSize: '13.5px',
    display: 'flex', alignItems: 'center', gap: '7px',
    transition: 'all .2s', fontFamily: "'DM Sans',sans-serif",
    textDecoration: 'none',
  };

  return (
    <div style={wrap}>
      <span style={{ ...base, background: '#D63384', color: '#fff', boxShadow: '0 6px 22px rgba(214,51,132,0.35)' }}
        onClick={() => navigate('ladies')}>{t('ladies_program_btn')}</span>
      <span style={{ ...base, background: '#C9A84C', color: '#0B1F3A', boxShadow: '0 6px 22px rgba(201,168,76,0.35)' }}
        onClick={() => navigate('courses')}>{t('view_courses')}</span>
    </div>
  );
}

