import React, { useState, useEffect, useRef } from 'react';
import Footer from '../components/Footer';
import { useLanguage } from '../context/LanguageContext';

const css = `
.ticker-wrap { background: #C9A84C; overflow: hidden; height: 40px; display: flex; align-items: center; }
.ticker { display: flex; animation: tick 28s linear infinite; white-space: nowrap; }
.ticker-item { padding: 0 36px; font-size: 12.5px; font-weight: 700; color: #0B1F3A; text-transform: uppercase; letter-spacing: 1.5px; }
.ticker-item::before { content: '✦'; margin-right: 14px; }

/* WHY CARDS */
.why-card { background: rgba(255,255,255,0.05); border: 1px solid rgba(255,255,255,0.09); border-radius: 16px; padding: 28px; transition: all .3s; }
.why-card:hover { background: rgba(201,168,76,0.08); border-color: rgba(201,168,76,0.3); }

/* REVIEW CARDS */
.review-card { background: #fff; border: 1px solid #E8E8E0; border-radius: 18px; padding: 28px; transition: all .3s; }
.review-card:hover { transform: translateY(-3px); box-shadow: 0 14px 36px rgba(11,31,58,0.09); }

/* CERT ROW */
.cert-row { display: flex; align-items: center; gap: 12px; padding: 14px 18px; background: #F5F5F0; border-radius: 12px; border-left: 3px solid #C9A84C; }

/* HERO VISUAL MINI */
.hv-mini { background: rgba(255,255,255,0.05); border: 1px solid rgba(255,255,255,0.1); border-radius: 13px; padding: 18px; }

/* LS MINI */
.ls-mini { background: rgba(255,255,255,0.04); border: 1px solid rgba(255,107,176,0.18); border-radius: 12px; padding: 18px; }

/* BUTTONS */
.btn-gold { background: #C9A84C; color: #0B1F3A; font-weight: 700; font-size: 14.5px; padding: 13px 26px; border-radius: 10px; border: none; cursor: pointer; display: inline-flex; align-items: center; gap: 8px; transition: all .2s; letter-spacing: .3px; font-family: 'DM Sans',sans-serif; }
.btn-gold:hover { background: #E8C96C; transform: translateY(-1px); }
.btn-ghost { background: transparent; color: #fff; font-weight: 600; font-size: 14.5px; padding: 13px 26px; border-radius: 10px; border: 1.5px solid rgba(255,255,255,0.3); cursor: pointer; display: inline-flex; align-items: center; gap: 8px; transition: all .2s; font-family: 'DM Sans',sans-serif; }
.btn-ghost:hover { border-color: #C9A84C; color: #C9A84C; }
.btn-rose { background: #D63384; color: #fff; font-weight: 700; font-size: 14.5px; padding: 13px 26px; border-radius: 10px; border: none; cursor: pointer; display: inline-flex; align-items: center; gap: 8px; transition: all .2s; font-family: 'DM Sans',sans-serif; }
.btn-rose:hover { transform: translateY(-2px); opacity: .9; }
.btn-rose-outline { background: rgba(214,51,132,0.15); color: #FFB3D9; font-weight: 600; font-size: 14.5px; padding: 13px 26px; border-radius: 10px; border: 1.5px solid rgba(214,51,132,0.6); cursor: pointer; display: inline-flex; align-items: center; gap: 8px; transition: all .2s; font-family: 'DM Sans',sans-serif; backdrop-filter: blur(4px); }
.btn-rose-outline:hover { border-color: #D63384; color: #fff; background: rgba(214,51,132,0.35); }
.btn-navy { background: #0B1F3A; color: #fff; font-weight: 700; font-size: 15px; padding: 14px 28px; border-radius: 10px; border: none; cursor: pointer; display: inline-flex; align-items: center; gap: 8px; transition: all .2s; font-family: 'DM Sans',sans-serif; }
.btn-navy:hover { background: #162D50; transform: translateY(-1px); }
.btn-navy-outline { background: transparent; color: #0B1F3A; font-weight: 700; font-size: 15px; padding: 14px 28px; border-radius: 10px; border: 2px solid #0B1F3A; cursor: pointer; display: inline-flex; align-items: center; gap: 8px; transition: all .2s; font-family: 'DM Sans',sans-serif; }
.btn-navy-outline:hover { background: rgba(11,31,58,0.08); }

@media(max-width:900px){
  .hero-grid { grid-template-columns: 1fr !important; }
  .hero-visual { display: none !important; }
  .about-inner { grid-template-columns: 1fr !important; }
  .about-visual-cards { display: none !important; }
  .ls-inner { grid-template-columns: 1fr !important; }
  .ls-right { display: none !important; }
}
@media(max-width:600px){
  .hero-stats { gap: 18px !important; flex-wrap: wrap; }
  .why-grid { grid-template-columns: 1fr !important; }
  .reviews-grid { grid-template-columns: 1fr !important; }
  .cta-btns { flex-direction: column; align-items: center; }
}
.enroll-form-wrap { background: #fff; border: 1px solid rgba(201,168,76,0.22); border-radius: 24px; padding: 40px; max-width: 980px; margin: 0 auto; box-shadow: 0 18px 50px rgba(11,31,58,0.08); }
.enroll-form-row { display: grid; grid-template-columns: 1fr 1fr; gap: 18px; margin-bottom: 18px; }
.enroll-form-row.single { grid-template-columns: 1fr; }
.enroll-form-group { display: flex; flex-direction: column; gap: 8px; }
.enroll-form-group label { font-size: 13px; font-weight: 700; color: #0B1F3A; }
.enroll-form-group input, .enroll-form-group select, .enroll-form-group textarea { background: #F5F5F0; border: 1px solid rgba(11,31,58,0.12); border-radius: 12px; padding: 14px 16px; font-size: 14px; color: #0B1F3A; outline: none; }
.enroll-form-group input::placeholder, .enroll-form-group textarea::placeholder { color: rgba(11,31,58,0.4); }
.enroll-submit-btn { background: #C9A84C; color: #0B1F3A; border: none; border-radius: 14px; padding: 15px 28px; font-size: 15px; font-weight: 700; cursor: pointer; transition: all .2s; }
.enroll-submit-btn:hover { transform: translateY(-1px); opacity: .95; }
.enroll-success { background: #F5F0D8; border: 1px solid rgba(201,168,76,0.4); border-radius: 22px; padding: 36px 32px; text-align: center; }
@media(max-width:900px){
  .enroll-form-row { grid-template-columns: 1fr !important; }
}
`;

const tickerKeys = [
  'ticker_1',
  'ticker_2',
  'ticker_3',
  'ticker_4',
  'ticker_5',
  'ticker_6',
];

const whyCards = [
  { icon: '🏛️', titleKey: 'why_1_title', textKey: 'why_1_desc' },
  { icon: '♀', titleKey: 'why_2_title', textKey: 'why_2_desc' },
  { icon: '🚗', titleKey: 'why_3_title', textKey: 'why_3_desc' },
  { icon: '📊', titleKey: 'why_4_title', textKey: 'why_4_desc' },
  { icon: '📅', titleKey: 'why_5_title', textKey: 'why_5_desc' },
  { icon: '🛡️', titleKey: 'why_6_title', textKey: 'why_6_desc' },
];

const reviews = [
  { stars: 5, textKey: 'review_1_text', nameKey: 'review_1_name', tagKey: 'review_tag_ladies', initials: 'AN', bg: '#F8E8F0', color: '#D63384' },
  { stars: 5, textKey: 'review_2_text', nameKey: 'review_2_name', tagKey: 'review_tag_four', initials: 'SK', bg: '#E8F0FB', color: '#1A3A8B' },
  { stars: 5, textKey: 'review_3_text', nameKey: 'review_3_name', tagKey: 'review_tag_ladies_parent', initials: 'MR', bg: '#FDF4DC', color: '#7A5200' },
  { stars: 5, textKey: 'review_4_text', nameKey: 'review_4_name', tagKey: 'review_tag_rto', initials: 'KP', bg: '#E8F5EE', color: '#1A6B3C' },
  { stars: 5, textKey: 'review_5_text', nameKey: 'review_5_name', tagKey: 'review_tag_two_ladies', initials: 'SV', bg: '#FAECE7', color: '#8B3A1A' },
  { stars: 5, textKey: 'review_6_text', nameKey: 'review_6_name', tagKey: 'review_tag_advanced', initials: 'DM', bg: '#EDEBFE', color: '#4C3AB5' },
];

const certRows = [
  { icon: '🏛️', titleKey: 'about_cert_1_title', descKey: 'about_cert_1_desc' },
  { icon: '🛡️', titleKey: 'about_cert_2_title', descKey: 'about_cert_2_desc' },
  { icon: '♀', titleKey: 'about_cert_3_title', descKey: 'about_cert_3_desc' },
  { icon: '🚗', titleKey: 'about_cert_4_title', descKey: 'about_cert_4_desc' }
];

const statRows = [
  { valKey: 'about_stat_2_val', lblKey: 'about_stat_2_lbl' },
  { valKey: 'about_stat_3_val', lblKey: 'about_stat_3_lbl' },
  { valKey: 'about_stat_4_val', lblKey: 'about_stat_4_lbl' }
];

const ladiesBadges = [
  'ladies_strip_badge_1',
  'ladies_strip_badge_2',
  'ladies_strip_badge_3',
  'ladies_strip_badge_4'
];

const ladiesMiniFeats = [
  { icon: '👩‍🏫', titleKey: 'ladies_strip_mini_1_title', descKey: 'ladies_strip_mini_1_desc' },
  { icon: '🌸', titleKey: 'ladies_strip_mini_2_title', descKey: 'ladies_strip_mini_2_desc' },
  { icon: '🏅', titleKey: 'ladies_strip_mini_3_title', descKey: 'ladies_strip_mini_3_desc' }
];

export default function LandingPage({ navigate }) {
  const { t, lang } = useLanguage();
  const [enroll, setEnroll] = useState({ name: '', phone: '', email: '', course: '', notes: '' });
  const [enrollSubmitted, setEnrollSubmitted] = useState(false);
  const [enrollErrors, setEnrollErrors] = useState({});
  const ref = useRef(null);

  const inputStyle = (key) => ({
    background: '#F5F5F0', border: `1px solid ${enrollErrors[key] ? '#D63384' : 'rgba(11,31,58,0.12)'}`,
    borderRadius: '12px', padding: '14px 16px', fontSize: '14px', color: '#0B1F3A', outline: 'none', width: '100%',
  });

  const updateEnroll = (field, value) => setEnroll(prev => ({ ...prev, [field]: value }));
  const submitEnroll = () => {
    const errors = {};
    if (!enroll.name.trim()) errors.name = true;
    if (!enroll.phone.trim()) errors.phone = true;
    if (!enroll.course.trim()) errors.course = true;
    setEnrollErrors(errors);
    if (Object.keys(errors).length) return;
    setEnrollSubmitted(true);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  useEffect(() => {
    if (!ref.current) return;
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((e, i) => {
        if (e.isIntersecting) {
          setTimeout(() => e.target.classList.add('vis'), i * 75);
          observer.unobserve(e.target);
        }
      });
    }, { threshold: 0.08, rootMargin: '0px 0px -30px 0px' });
    ref.current.querySelectorAll('.reveal').forEach(el => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  return (
    <div ref={ref}>
      <style>{css}</style>

      {/* ── TICKER ── */}
      <div className="ticker-wrap" style={{ marginTop: '72px' }}>
        <div className="ticker">
          {[...tickerKeys, ...tickerKeys].map((tk, i) => (
            <span className="ticker-item" key={i}>{t(tk)}</span>
          ))}
        </div>
      </div>

      {/* ── HERO ── */}
      <section style={{ minHeight: '82vh', position: 'relative', overflow: 'hidden' }}>
        <video
          src="/car.mp4"
          poster="/poster.jpg"
          preload="auto"
          autoPlay
          muted
          loop
          playsInline
          style={{
            position: 'absolute', top: 0, left: 0, width: '100%', height: '100%',
            objectFit: 'cover', zIndex: 0,
          }}
        />
        <div style={{
          position: 'absolute', inset: 0,
          background: 'linear-gradient(180deg, rgba(0,0,0,0.2) 0%, rgba(0,0,0,0.55) 65%, rgba(0,0,0,0.85) 100%)',
          zIndex: 1,
        }} />
        <div style={{
          position: 'relative', zIndex: 2, maxWidth: '1160px', margin: '0 auto', padding: '0 5%',
          minHeight: '82vh', display: 'flex', flexDirection: 'column', justifyContent: 'flex-end', alignItems: 'center', textAlign: 'center', paddingBottom: '90px', gap: '26px',
        }}>
          <div>
            <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', background: 'rgba(7, 5, 0, 0.18)', border: '1px solid rgba(201,168,76,0.35)', color: '#f1f90bff', fontSize: '11.5px', fontWeight: 600, letterSpacing: '1.5px', textTransform: 'uppercase', padding: '8px 16px', borderRadius: '100px', marginBottom: '22px' }}>
              {t('hero_badge')}
            </div>
            <h1 style={{ fontFamily: "'Playfair Display',serif", fontSize: 'clamp(38px,4.5vw,64px)', fontWeight: 900, lineHeight: 1.12, color: '#fff', marginBottom: '18px', textAlign: 'center' }}>
              {t('hero_title_1')}<em style={{ color: '#C9A84C', fontStyle: 'italic' }}>{t('hero_title_em')}</em>{t('hero_title_line1_end') ? <span> {t('hero_title_line1_end')}</span> : null}
              <br />
              {t('hero_title_line2')}
            </h1>
            <p style={{ fontSize: '16.5px', lineHeight: 1.75, color: 'rgba(255,255,255,0.75)', marginBottom: '34px', maxWidth: '640px', marginLeft: 'auto', marginRight: 'auto' }}>
              {t('hero_subtitle')}
            </p>
          </div>
          <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap', justifyContent: 'center' }}>
            <button className="btn-gold" onClick={() => navigate('courses')}>{t('view_courses')}</button>
            <button className="btn-rose-outline" onClick={() => navigate('ladies')}>{t('ladies_program_btn')}</button>
          </div>
        </div>
      </section>

      {/* ── ABOUT ── */}
      <section style={{ background: '#fff', padding: '90px 5%' }}>
        <div className="about-inner" style={{ maxWidth: '1160px', margin: '0 auto', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '70px', alignItems: 'center' }}>
          <div className="reveal">
            <span style={{ display: 'inline-block', background: '#FDF4DC', color: '#7A5200', fontSize: '11px', fontWeight: 700, letterSpacing: '2px', textTransform: 'uppercase', padding: '7px 15px', borderRadius: '100px', border: '1px solid rgba(201,168,76,0.4)', marginBottom: '18px' }}>{t('about_badge')}</span>
            <h2 style={{ fontFamily: "'Playfair Display',serif", fontSize: 'clamp(26px,3.2vw,42px)', fontWeight: 900, color: '#0B1F3A', lineHeight: 1.18, marginBottom: '16px' }}>{t('about_title')}</h2>
            <p style={{ fontSize: '15.5px', color: '#888880', lineHeight: 1.8, marginBottom: '14px' }}>{t('about_desc1')}</p>
            <p style={{ fontSize: '15.5px', color: '#888880', lineHeight: 1.8, marginBottom: '14px' }}>{t('about_desc2')}</p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', marginTop: '24px' }}>
              {certRows.map(c => (
                <div className="cert-row" key={c.titleKey}>
                  <div style={{ fontSize: '20px', flexShrink: 0 }}>{c.icon}</div>
                  <div>
                    <strong style={{ fontSize: '13.5px', color: '#0B1F3A', fontWeight: 600 }}>{t(c.titleKey)}</strong>
                    <span style={{ fontSize: '12px', color: '#888880', display: 'block', marginTop: '1px' }}>{t(c.descKey)}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="about-visual-cards reveal" style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            <div style={{ background: '#0B1F3A', borderRadius: '18px', padding: '28px', color: '#fff' }}>
              <div style={{ fontFamily: "'Bebas Neue',sans-serif", fontSize: '52px', color: '#C9A84C', lineHeight: 1 }}>{t('about_stat_1_val')}</div>
              <p style={{ color: 'rgba(255,255,255,0.6)', fontSize: '13.5px', marginTop: '4px' }}>{t('about_stat_1_lbl')}</p>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '14px' }}>
              {statRows.map(s => (
                <div key={s.valKey} style={{ background: '#F5F5F0', border: '1px solid #E8E8E0', borderRadius: '14px', padding: '20px' }}>
                  <div style={{ fontFamily: "'Bebas Neue',sans-serif", fontSize: '34px', color: '#0B1F3A', lineHeight: 1 }}>{t(s.valKey)}</div>
                  <p style={{ fontSize: '12px', color: '#888880', marginTop: '4px' }}>{t(s.lblKey)}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── WHY US ── */}
      <section style={{ background: '#0B1F3A', padding: '90px 5%' }}>
        <div style={{ textAlign: 'center', marginBottom: '56px' }} className="reveal">
          <div style={{ display: 'inline-block', background: 'rgba(201,168,76,0.15)', color: '#C9A84C', fontSize: '11px', fontWeight: 700, letterSpacing: '2px', textTransform: 'uppercase', padding: '7px 15px', borderRadius: '100px', border: '1px solid rgba(201,168,76,0.3)', marginBottom: '16px' }}>{t('why_badge')}</div>
          <h2 style={{ fontFamily: "'Playfair Display',serif", fontSize: 'clamp(26px,3.5vw,44px)', fontWeight: 900, color: '#fff', lineHeight: 1.15, marginBottom: '12px' }}>{t('why_title')}</h2>
          <p style={{ fontSize: '16px', color: 'rgba(255,255,255,0.5)', maxWidth: '560px', margin: '0 auto', lineHeight: 1.7 }}>{t('why_desc')}</p>
        </div>
        <div className="why-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(230px,1fr))', gap: '18px', maxWidth: '1160px', margin: '0 auto' }}>
          {whyCards.map(c => (
            <div className="why-card reveal" key={c.titleKey}>
              <div style={{ fontSize: '30px', marginBottom: '16px' }}>{c.icon}</div>
              <h3 style={{ color: '#fff', fontSize: '17px', fontWeight: 600, marginBottom: '9px' }}>{t(c.titleKey)}</h3>
              <p style={{ color: 'rgba(255,255,255,0.52)', fontSize: '13.5px', lineHeight: 1.7 }}>{t(c.textKey)}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ── LADIES STRIP ── */}
      <section id="ladies-section" style={{ background: 'linear-gradient(135deg,#2A0818 0%,#430E28 50%,#2A0818 100%)', padding: '80px 5%', position: 'relative', overflow: 'hidden', scrollMarginTop: '110px' }}>
        <div className="ls-inner" style={{ maxWidth: '1100px', margin: '0 auto', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '60px', alignItems: 'center' }}>
          <div className="reveal">
            <div style={{ display: 'inline-flex', alignItems: 'center', gap: '9px', background: 'rgba(214,51,132,0.18)', border: '1.5px solid #D63384', color: '#D63384', fontSize: '11px', fontWeight: 700, letterSpacing: '2px', textTransform: 'uppercase', padding: '9px 18px', borderRadius: '100px', marginBottom: '24px' }}>{t('ladies_strip_badge')}</div>
            <h2 style={{ fontFamily: "'Playfair Display',serif", fontSize: 'clamp(28px,3.8vw,50px)', fontWeight: 900, color: '#fff', lineHeight: 1.12, marginBottom: '16px' }}>
              {t('ladies_strip_title')}<span style={{ color: '#FF6BB0', fontStyle: 'italic' }}>{t('ladies_strip_title_em')}</span>{t('ladies_strip_title_end')}
            </h2>
            <p style={{ fontSize: '15.5px', lineHeight: 1.8, color: 'rgba(255,255,255,0.68)', marginBottom: '28px' }}>{t('ladies_strip_desc')}</p>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px', marginBottom: '32px' }}>
              {ladiesBadges.map(k => (
                <span key={k} style={{ background: 'rgba(255,107,176,0.12)', border: '1px solid rgba(255,107,176,0.25)', color: '#FF9ED4', fontSize: '12.5px', fontWeight: 600, padding: '8px 16px', borderRadius: '100px' }}>{t(k)}</span>
              ))}
            </div>
            <button className="btn-rose" onClick={() => navigate('ladies')}>{t('ladies_program_btn')} →</button>
          </div>
          <div className="ls-right reveal" style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
            <div style={{ background: 'rgba(255,107,176,0.1)', border: '1px solid rgba(255,107,176,0.22)', borderRadius: '16px', padding: '28px' }}>
              <div style={{ fontFamily: "'Bebas Neue',sans-serif", fontSize: '56px', color: '#FF6BB0', lineHeight: 1 }}>{t('ladies_strip_stat_val')}</div>
              <div style={{ color: 'rgba(255,255,255,0.55)', fontSize: '13.5px', marginTop: '5px' }}>{t('ladies_strip_stat_lbl')}</div>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
              {ladiesMiniFeats.map(m => (
                <div className="ls-mini" key={m.titleKey}>
                  <div style={{ fontSize: '22px', marginBottom: '8px' }}>{m.icon}</div>
                  <h4 style={{ color: '#FF9ED4', fontSize: '13px', fontWeight: 600, marginBottom: '3px' }}>{t(m.titleKey)}</h4>
                  <p style={{ color: 'rgba(255,255,255,0.45)', fontSize: '11.5px', lineHeight: 1.5 }}>{t(m.descKey)}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── REVIEWS ── */}
      <section id="reviews-section" style={{ background: '#F5F5F0', padding: '90px 5%', scrollMarginTop: '110px' }}>
        <div style={{ textAlign: 'center', marginBottom: '56px' }} className="reveal">
          <span style={{ display: 'inline-block', background: '#FDF4DC', color: '#7A5200', fontSize: '11px', fontWeight: 700, letterSpacing: '2px', textTransform: 'uppercase', padding: '7px 15px', borderRadius: '100px', border: '1px solid rgba(201,168,76,0.4)', marginBottom: '16px' }}>{t('reviews_badge')}</span>
          <h2 style={{ fontFamily: "'Playfair Display',serif", fontSize: 'clamp(26px,3.5vw,44px)', fontWeight: 900, color: '#0B1F3A', lineHeight: 1.15, marginBottom: '12px' }}>{t('reviews_title')}</h2>
          <p style={{ fontSize: '16px', color: '#888880', maxWidth: '560px', margin: '0 auto', lineHeight: 1.7 }}>{t('reviews_desc')}</p>
        </div>
        <div className="reviews-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(300px,1fr))', gap: '22px', maxWidth: '1160px', margin: '0 auto' }}>
          {reviews.map(r => (
            <div className="review-card reveal" key={r.nameKey}>
              <div style={{ color: '#C9A84C', fontSize: '15px', letterSpacing: '2px', marginBottom: '14px' }}>{'★'.repeat(r.stars)}</div>
              <p style={{ fontSize: '14.5px', lineHeight: 1.75, color: '#444440', marginBottom: '20px', fontStyle: 'italic' }}>{t(r.textKey)}</p>
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                <div style={{ width: '40px', height: '40px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '15px', fontWeight: 700, flexShrink: 0, background: r.bg, color: r.color }}>{r.initials}</div>
                <div>
                  <div className="review-card-name" style={{ fontWeight: 600, fontSize: '13.5px', color: '#0B1F3A' }}>{t(r.nameKey)}</div>
                  <div className="review-card-tag" style={{ fontSize: '11.5px', color: '#888880' }}>{t(r.tagKey)}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ── CTA STRIP ── */}
      <section style={{ background: '#C9A84C', padding: '70px 5%', textAlign: 'center' }}>
        <h2 className="reveal" style={{ fontFamily: "'Playfair Display',serif", fontSize: 'clamp(26px,3.5vw,44px)', fontWeight: 900, color: '#0B1F3A', marginBottom: '12px' }}>{t('cta_title')}</h2>
        <p className="reveal" style={{ fontSize: '16px', color: 'rgba(11,31,58,0.65)', marginBottom: '32px' }}>{t('cta_desc')}</p>
        <div className="cta-btns reveal" style={{ display: 'flex', gap: '14px', justifyContent: 'center', flexWrap: 'wrap' }}>
          <button className="btn-navy" onClick={() => navigate('courses')}>{t('view_courses')}</button>
          <button className="btn-navy-outline" onClick={() => navigate('ladies')}>{t('ladies_program_btn')}</button>
          <button className="btn-navy-outline" onClick={() => navigate('contact')}>{t('contact_us_btn')}</button>
          <button className="btn-navy" onClick={() => navigate('enroll')}>{t('enroll_now_btn')}</button>
        </div>
      </section>

      <section id="enroll-section" style={{ background: '#fff', padding: '90px 5%', scrollMarginTop: '110px' }}>
        <div style={{ maxWidth: '980px', margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: '42px' }}>
            <span style={{ display: 'inline-block', background: '#F9F0CE', color: '#7A5200', fontSize: '11px', fontWeight: 700, letterSpacing: '2px', textTransform: 'uppercase', padding: '8px 16px', borderRadius: '100px', border: '1px solid rgba(201,168,76,0.4)', marginBottom: '16px' }}>{t('enroll_badge')}</span>
            <h2 style={{ fontFamily: "'Playfair Display',serif", fontSize: 'clamp(28px,3.8vw,44px)', fontWeight: 900, color: '#0B1F3A', marginBottom: '12px' }}>{t('enroll_title')}</h2>
            <p style={{ fontSize: '16px', color: '#6F6F6F', maxWidth: '660px', margin: '0 auto', lineHeight: 1.75 }}>{t('enroll_desc')}</p>
          </div>

          <div className="enroll-form-wrap">
            {!enrollSubmitted ? (
              <>
                <div className="enroll-form-row">
                  <div className="enroll-form-group">
                    <label>{t('form_fullname')}</label>
                    <input style={inputStyle('name')} type="text" placeholder={t('form_fullname_ph')} value={enroll.name} onChange={e => updateEnroll('name', e.target.value)} />
                  </div>
                  <div className="enroll-form-group">
                    <label>{t('form_mobile')}</label>
                    <input style={inputStyle('phone')} type="tel" placeholder={t('form_mobile_ph')} value={enroll.phone} onChange={e => updateEnroll('phone', e.target.value)} />
                  </div>
                </div>
                <div className="enroll-form-row">
                  <div className="enroll-form-group">
                    <label>{t('form_email')}</label>
                    <input style={inputStyle('email')} type="email" placeholder={t('form_email_ph')} value={enroll.email} onChange={e => updateEnroll('email', e.target.value)} />
                  </div>
                  <div className="enroll-form-group">
                    <label>{t('form_course_label')}</label>
                    <select style={inputStyle('course')} value={enroll.course} onChange={e => updateEnroll('course', e.target.value)}>
                      <option value="">{t('form_course_select')}</option>
                      <option>{t('form_course_opt1')}</option>
                      <option>{t('form_course_opt2')}</option>
                      <option>{t('form_course_opt3')}</option>
                      <option>{t('form_course_opt4')}</option>
                    </select>
                  </div>
                </div>
                <div className="enroll-form-row single">
                  <div className="enroll-form-group">
                    <label>{t('form_comments_label')}</label>
                    <textarea style={inputStyle('notes')} placeholder={t('form_comments_ph')} value={enroll.notes || ''} onChange={e => updateEnroll('notes', e.target.value)} />
                  </div>
                </div>
                <button className="enroll-submit-btn" onClick={submitEnroll}>{t('submit_request')}</button>
              </>
            ) : (
              <div className="enroll-success">
                <div style={{ fontSize: '44px', marginBottom: '18px' }}>✅</div>
                <h3 style={{ fontFamily: "'Playfair Display',serif", fontSize: '28px', color: '#0B1F3A', marginBottom: '12px' }}>{t('form_success_title')}</h3>
                <p style={{ fontSize: '15px', color: '#5A5A5A', lineHeight: 1.8, marginBottom: '24px' }}>{t('form_success_desc')}</p>
                <button className="btn-navy" onClick={() => navigate('landing')}>{t('back_to_home')}</button>
              </div>
            )}
          </div>
        </div>
      </section>

      <Footer navigate={navigate} />
    </div>
  );
}
