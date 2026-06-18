import React, { useState, useEffect, useRef } from 'react';
import Footer from '../components/Footer';
import { useLanguage } from '../context/LanguageContext';

const css = `
.lf-card { background: rgba(214,51,132,0.06); border: 1px solid rgba(214,51,132,0.18); border-radius: 16px; padding: 28px; }
.ladies-form-wrap { background: linear-gradient(135deg,#2A0818,#430E28); border-radius: 24px; padding: 48px; max-width: 780px; margin: 0 auto; }
.form-group { display: flex; flex-direction: column; gap: 7px; }
.form-group label { font-size: 12.5px; font-weight: 600; color: rgba(255,255,255,0.65); letter-spacing: .5px; }
.form-group input, .form-group select, .form-group textarea {
  background: rgba(255,255,255,0.08); border: 1px solid rgba(255,255,255,0.18);
  border-radius: 10px; padding: 12px 15px; color: #fff;
  font-family: 'DM Sans',sans-serif; font-size: 14px; width: 100%;
  transition: border-color .2s; outline: none; appearance: none;
}
.form-group input::placeholder { color: rgba(255,255,255,0.32); }
.form-group select option { background: #2A0818; color: #fff; }
.form-group input:focus, .form-group select:focus { border-color: #FF6BB0; }
.form-group textarea { resize: vertical; min-height: 90px; }
.ladies-agree { display: flex; align-items: flex-start; gap: 12px; background: rgba(255,107,176,0.08); border: 1px solid rgba(255,107,176,0.25); border-radius: 12px; padding: 14px 18px; margin-bottom: 22px; cursor: pointer; }
.ladies-agree input[type=checkbox] { width: 17px; height: 17px; accent-color: #D63384; flex-shrink: 0; margin-top: 2px; }
.ladies-agree span { color: rgba(255,255,255,0.75); font-size: 13.5px; line-height: 1.5; }
.btn-submit-ladies { width: 100%; padding: 15px; background: linear-gradient(135deg,#D63384,#A01860); color: #fff; font-weight: 700; font-size: 16px; border: none; border-radius: 12px; cursor: pointer; font-family: 'DM Sans',sans-serif; letter-spacing: .4px; transition: all .2s; }
.btn-submit-ladies:hover { transform: translateY(-1px); opacity: .92; }
@media(max-width:900px){
  .ladies-form-wrap { padding: 28px 20px !important; }
  .form-row-ladies { grid-template-columns: 1fr !important; }
  .ladies-features-grid { grid-template-columns: 1fr !important; }
  .ladies-stats-row { grid-template-columns: 1fr 1fr !important; }
}
@media(max-width:600px){
  .ladies-stats-row { grid-template-columns: 1fr !important; }
}
`;

const features = [
  { icon: '👩‍🏫', titleKey: 'ladies_feat_1_title', textKey: 'ladies_feat_1_desc' },
  { icon: '🛡️', titleKey: 'ladies_feat_2_title', textKey: 'ladies_feat_2_desc' },
  { icon: '⏰', titleKey: 'ladies_feat_3_title', textKey: 'ladies_feat_3_desc' },
  { icon: '📋', titleKey: 'ladies_feat_4_title', textKey: 'ladies_feat_4_desc' },
  { icon: '🌸', titleKey: 'ladies_feat_5_title', textKey: 'ladies_feat_5_desc' },
];

export default function LadiesPage({ navigate }) {
  const [form, setForm] = useState({ name: '', phone: '', email: '', dob: '', course: '', batch: '', area: '', agree: false });
  const [submitted, setSubmitted] = useState(false);
  const [errors, setErrors] = useState({});
  const { lang, t } = useLanguage();
  const ref = useRef(null);

  useEffect(() => {
    if (!ref.current) return;
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((e, i) => { if (e.isIntersecting) { setTimeout(() => e.target.classList.add('vis'), i * 75); observer.unobserve(e.target); } });
    }, { threshold: 0.08 });
    ref.current.querySelectorAll('.reveal').forEach(el => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  const update = (k, v) => setForm(f => ({ ...f, [k]: v }));

  const submit = () => {
    const errs = {};
    if (!form.name.trim()) errs.name = true;
    if (!form.phone.trim()) errs.phone = true;
    if (!form.course) errs.course = true;
    if (!form.agree) errs.agree = true;
    setErrors(errs);
    if (Object.keys(errs).length) return;

    const text = `New Ladies Program Enrollment!%0A%0A*Name:* ${form.name}%0A*Phone:* ${form.phone}%0A*Email:* ${form.email || 'N/A'}%0A*DOB:* ${form.dob || 'N/A'}%0A*Course:* ${form.course}%0A*Batch:* ${form.batch || 'N/A'}%0A*Area:* ${form.area || 'N/A'}`;
    window.open(`https://wa.me/919884770583?text=${text}`, '_blank');

    setSubmitted(true);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const inputStyle = (k) => ({
    background: 'rgba(255,255,255,0.08)', border: `1px solid ${errors[k] ? '#FF6BB0' : 'rgba(255,255,255,0.18)'}`,
    borderRadius: '10px', padding: '12px 15px', color: '#fff',
    fontFamily: "'DM Sans',sans-serif", fontSize: '14px', width: '100%',
    outline: 'none', appearance: 'none',
  });

  return (
    <div ref={ref}>
      <style>{css}</style>
      {/* Hero */}
      <div style={{ background: 'linear-gradient(135deg,#280715 0%,#420C26 55%,#280715 100%)', padding: '70px 5% 60px', position: 'relative', overflow: 'hidden', marginTop: '72px' }}>
        <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(circle at 80% 50%,rgba(214,51,132,0.1),transparent 60%)', pointerEvents: 'none' }} />
        <div style={{ maxWidth: '1160px', margin: '0 auto', position: 'relative', zIndex: 1 }}>
          <div style={{ fontSize: '12px', color: 'rgba(255,255,255,0.45)', marginBottom: '14px', cursor: 'pointer' }} onClick={() => navigate('landing')}>
            ← {t('home')} / {t('ladies_hero_bread')}
          </div>
          <h1 style={{ fontFamily: "'Playfair Display',serif", fontSize: 'clamp(32px,4vw,54px)', fontWeight: 900, color: '#fff', marginBottom: '12px', lineHeight: 1.1 }}>
            {t('ladies_hero_title')}<em style={{ color: '#FF6BB0', fontStyle: 'italic' }}>{t('ladies_hero_title_em')}</em>{t('ladies_hero_title_end')}
          </h1>
          <p style={{ fontSize: '16px', color: 'rgba(255,255,255,0.65)', maxWidth: '600px', lineHeight: 1.7 }}>{t('ladies_hero_subtitle')}</p>
        </div>
      </div>

      <div style={{ maxWidth: '1160px', margin: '0 auto', padding: '60px 5% 80px' }}>
        {/* Stats */}
        <div className="ladies-stats-row" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(180px,1fr))', gap: '20px', marginBottom: '60px' }}>
          {[
            ['4,200+', t('ladies_stat_1')],
            ['99%', t('ladies_stat_2')],
            ['2009', t('ladies_stat_3')]
          ].map(([n, l]) => (
            <div key={l} className="reveal" style={{ background: 'linear-gradient(135deg,#2A0818,#430E28)', borderRadius: '16px', padding: '28px', textAlign: 'center' }}>
              <div className="ladies-stat-val" style={{ fontFamily: "'Bebas Neue',sans-serif", fontSize: '52px', color: '#FF6BB0', lineHeight: 1 }}>{n}</div>
              <div className="ladies-stat-lbl" style={{ color: 'rgba(255,255,255,0.55)', fontSize: '13px', marginTop: '6px' }}>{l}</div>
            </div>
          ))}
        </div>

        {/* Features header */}
        <div style={{ textAlign: 'center', marginBottom: '36px' }} className="reveal">
          <span style={{ display: 'inline-block', background: 'rgba(214,51,132,0.1)', color: '#C01070', fontSize: '11px', fontWeight: 700, letterSpacing: '2px', textTransform: 'uppercase', padding: '7px 15px', borderRadius: '100px', border: '1px solid rgba(214,51,132,0.3)', marginBottom: '14px' }}>{t('ladies_why_badge')}</span>
          <h2 style={{ fontFamily: "'Playfair Display',serif", fontSize: 'clamp(26px,3.2vw,38px)', fontWeight: 900, color: '#0B1F3A', marginBottom: '10px' }}>{t('ladies_why_title')}</h2>
          <p style={{ fontSize: '16px', color: '#888880', maxWidth: '500px', margin: '0 auto', lineHeight: 1.7 }}>{t('ladies_why_desc')}</p>
        </div>

        {/* Features grid */}
        <div className="ladies-features-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(260px,1fr))', gap: '20px', marginBottom: '60px' }}>
          {features.map(f => (
            <div key={f.titleKey} className="lf-card reveal">
              <div style={{ fontSize: '32px', marginBottom: '16px' }}>{f.icon}</div>
              <h3 style={{ color: '#C01070', fontSize: '17px', fontWeight: 700, marginBottom: '10px' }}>{t(f.titleKey)}</h3>
              <p style={{ color: '#444440', fontSize: '14px', lineHeight: 1.7 }}>{t(f.textKey)}</p>
            </div>
          ))}
        </div>

        {/* Enrollment Form */}
        <div style={{ marginTop: '20px' }}>
          {!submitted ? (
            <div className="ladies-form-wrap">
              <h2 style={{ fontFamily: "'Playfair Display',serif", fontSize: '28px', color: '#fff', marginBottom: '6px' }}>{t('ladies_form_title')}</h2>
              <p style={{ color: 'rgba(255,255,255,0.55)', fontSize: '14.5px', marginBottom: '32px' }}>{t('ladies_form_desc')}</p>

              <div className="form-row-ladies" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '18px', marginBottom: '18px' }}>
                <div className="form-group">
                  <label>{t('form_fullname')}</label>
                  <input style={inputStyle('name')} type="text" placeholder={t('form_fullname_ph')} value={form.name} onChange={e => update('name', e.target.value)} />
                </div>
                <div className="form-group">
                  <label>{t('form_mobile')}</label>
                  <input style={inputStyle('phone')} type="tel" placeholder={t('form_mobile_ph')} value={form.phone} onChange={e => update('phone', e.target.value)} />
                </div>
              </div>
              <div className="form-row-ladies" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '18px', marginBottom: '18px' }}>
                <div className="form-group">
                  <label>{t('form_email_ph')}</label>
                  <input style={inputStyle('email')} type="email" placeholder="your@email.com" value={form.email} onChange={e => update('email', e.target.value)} />
                </div>
                <div className="form-group">
                  <label>{t('ladies_form_dob')}</label>
                  <input style={inputStyle('dob')} type="date" value={form.dob} onChange={e => update('dob', e.target.value)} />
                </div>
              </div>
              <div className="form-row-ladies" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '18px', marginBottom: '18px' }}>
                <div className="form-group">
                  <label>{t('ladies_form_course')}</label>
                  <select style={inputStyle('course')} value={form.course} onChange={e => update('course', e.target.value)}>
                    <option value="">{t('ladies_form_course_select')}</option>
                    <option>{t('ladies_form_course_opt1')}</option>
                    <option>{t('ladies_form_course_opt2')}</option>
                    <option>{t('ladies_form_course_opt3')}</option>
                  </select>
                </div>
                <div className="form-group">
                  <label>{t('ladies_form_batch')}</label>
                  <select style={inputStyle('batch')} value={form.batch} onChange={e => update('batch', e.target.value)}>
                    <option value="">{t('ladies_form_batch_select')}</option>
                    <option>{t('ladies_form_batch_opt1')}</option>
                    <option>{t('ladies_form_batch_opt2')}</option>
                    <option>{t('ladies_form_batch_opt3')}</option>
                  </select>
                </div>
              </div>
              <div className="form-group" style={{ marginBottom: '18px' }}>
                <label>{t('ladies_form_area')}</label>
                <input style={inputStyle('area')} type="text" placeholder={t('ladies_form_area_ph')} value={form.area} onChange={e => update('area', e.target.value)} />
              </div>

              <label className="ladies-agree">
                <input type="checkbox" checked={form.agree} onChange={e => update('agree', e.target.checked)} style={{ border: errors.agree ? '1px solid #FF6BB0' : '' }} />
                <span>{t('enrolling_women_checkbox')}</span>
              </label>

              <button className="btn-submit-ladies" onClick={submit}>{t('submit_application')}</button>
              <p style={{ textAlign: 'center', fontSize: '11.5px', color: 'rgba(255,255,255,0.35)', marginTop: '14px' }}>{t('data_private_lock')}</p>
            </div>
          ) : (
            <div style={{ background: 'linear-gradient(135deg,#2A0818,#430E28)', borderRadius: '24px', padding: '50px 20px', textAlign: 'center', maxWidth: '780px', margin: '0 auto' }}>
              <div style={{ fontSize: '60px', marginBottom: '16px' }}>🎉</div>
              <h3 style={{ fontFamily: "'Playfair Display',serif", fontSize: '28px', color: '#fff', marginBottom: '10px' }}>{t('ladies_form_success_title')}</h3>
              <p style={{ color: 'rgba(255,255,255,0.6)', fontSize: '16px', marginBottom: '30px' }}>{t('ladies_form_success_desc')}</p>
              <button style={{ background: '#D63384', color: '#fff', fontWeight: 700, fontSize: '14px', padding: '13px 26px', borderRadius: '10px', border: 'none', cursor: 'pointer', fontFamily: "'DM Sans',sans-serif" }} onClick={() => navigate('landing')}>← {t('back_to_home')}</button>
            </div>
          )}
        </div>
      </div>
      <Footer navigate={navigate} variant="ladies" />
    </div>
  );
}
