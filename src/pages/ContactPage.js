import React, { useState, useEffect, useRef } from 'react';
import InnerPageHero from '../components/InnerPageHero';
import Footer from '../components/Footer';
import { useLanguage } from '../context/LanguageContext';

const css = `
.contact-card { background: #fff; border: 1px solid #E8E8E0; border-radius: 18px; padding: 32px; margin-bottom: 20px; }
.hours-card { background: #fff; border: 1px solid #E8E8E0; border-radius: 18px; padding: 28px; margin-bottom: 20px; }
.hours-row { display: flex; justify-content: space-between; align-items: center; padding: 9px 0; border-bottom: 1px solid #F5F5F0; font-size: 13.5px; }
.hours-row:last-child { border-bottom: none; }
.contact-form-card { background: #fff; border: 1px solid #E8E8E0; border-radius: 18px; padding: 32px; }
.form-group-light { display: flex; flex-direction: column; gap: 6px; }
.form-group-light label { font-size: 12.5px; font-weight: 600; color: #444440; letter-spacing: .4px; }
.form-group-light input, .form-group-light select, .form-group-light textarea {
  background: #F5F5F0; border: 1px solid #E8E8E0;
  border-radius: 10px; padding: 12px 14px; color: #1A1A18;
  font-family: 'DM Sans',sans-serif; font-size: 14px; width: 100%;
  transition: border-color .2s; outline: none; appearance: none;
}
.form-group-light input:focus, .form-group-light select:focus, .form-group-light textarea:focus {
  border-color: #C9A84C; background: #fff;
}
.form-group-light textarea { resize: vertical; min-height: 100px; }
.whatsapp-box { background: #1A6B3C; border-radius: 16px; padding: 24px; display: flex; align-items: center; gap: 16px; margin-bottom: 20px; cursor: pointer; transition: all .2s; text-decoration: none; }
.whatsapp-box:hover { transform: translateY(-2px); }
.btn-submit-contact { width: 100%; padding: 14px; background: #0B1F3A; color: #fff; font-weight: 700; font-size: 15px; border: none; border-radius: 10px; cursor: pointer; font-family: 'DM Sans',sans-serif; transition: all .2s; margin-top: 6px; }
.btn-submit-contact:hover { background: #162D50; transform: translateY(-1px); }
.btn-submit-contact:disabled { opacity: .6; cursor: not-allowed; transform: none; }
@media(max-width:900px){
  .contact-grid { grid-template-columns: 1fr !important; }
}
@media(max-width:600px){
  .form-row-contact { grid-template-columns: 1fr !important; }
}
.map-container-link:hover {
  transform: translateY(-4px);
  box-shadow: 0 12px 40px rgba(0,0,0,0.18) !important;
  border-color: rgba(201,168,76,0.4) !important;
}
.map-container-link:hover .map-overlay {
  background: rgba(11,31,58,0.45) !important;
  backdrop-filter: blur(2px);
}
.map-container-link:hover .map-badge {
  background: #fff !important;
  color: #0B1F3A !important;
  transform: scale(1.05);
}
`;

export default function ContactPage({ navigate }) {
  const [form, setForm] = useState({ name: '', phone: '', email: '', type: '', msg: '' });
  const [submitted, setSubmitted] = useState(false);
  const [errors, setErrors] = useState({});
  const { t } = useLanguage();
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
    if (!form.msg.trim()) errs.msg = true;
    setErrors(errs);
    if (Object.keys(errs).length) return;
    setSubmitted(true);
  };

  const iStyle = (k) => ({
    background: errors[k] ? '#FFF0F0' : '#F5F5F0',
    border: `1px solid ${errors[k] ? '#C0392B' : '#E8E8E0'}`,
    borderRadius: '10px', padding: '12px 14px', color: '#1A1A18',
    fontFamily: "'DM Sans',sans-serif", fontSize: '14px', width: '100%',
    outline: 'none', appearance: 'none',
  });

  const contactRows = [
    { icon: '📍', labelKey: 'contact_lbl_addr', content: t('footer_addr_line1') + ', Chennai-600092, Tamil Nadu' },
    { icon: '📞', labelKey: 'contact_lbl_phone', content: null },
    { icon: '📧', labelKey: 'contact_lbl_email', content: null },
    { icon: '🕐', labelKey: 'contact_lbl_hours', content: t('contact_hours_val') },
  ];

  const scheduleRows = [
    [t('contact_sched_batch1'), '6:00 AM – 8:00 PM', 'open'],
    [t('contact_sched_batch2'), '6:00 AM – 7:00 PM', 'open'],
    [t('contact_sched_batch3'), t('contact_sched_holiday'), 'closed'],
    [t('contact_sched_batch4'), t('contact_sched_closed'), 'closed'],
    [t('contact_sched_batch5'), '7:00 AM – 9:00 AM', 'open'],
    [t('contact_sched_batch6'), '6:00 PM – 8:00 PM', 'open'],
  ];

  return (
    <div ref={ref}>
      <style>{css}</style>
      <InnerPageHero
        breadcrumb={t('contact_hero_bread')}
        title={t('contact_hero_title')}
        titleEm={t('contact_hero_title_em')}
        subtitle={t('contact_hero_subtitle')}
        navigate={navigate}
      />
      <div style={{ maxWidth: '1160px', margin: '0 auto', padding: '60px 5% 80px' }}>
        <div className="contact-grid" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '50px', alignItems: 'start' }}>

          {/* LEFT COLUMN */}
          <div>
            {/* Contact Info */}
            <div className="contact-card reveal">
              <h3 style={{ fontFamily: "'Playfair Display',serif", fontSize: '20px', color: '#0B1F3A', marginBottom: '22px' }}>{t('contact_title')}</h3>
              {contactRows.map((row, i) => (
                <div key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: '15px', marginBottom: i < 3 ? '20px' : 0 }}>
                  <div style={{ width: '42px', height: '42px', background: '#0B1F3A', borderRadius: '11px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '17px', flexShrink: 0 }}>{row.icon}</div>
                  <div>
                    <div style={{ fontSize: '11.5px', color: '#BBBBB0', textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '4px' }}>{t(row.labelKey)}</div>
                    {row.labelKey === 'contact_lbl_phone' ? (
                      <p style={{ fontSize: '14.5px', color: '#0B1F3A', fontWeight: 500, lineHeight: 1.55 }}>
                        <a href="tel:+919884772048" style={{ color: '#0B1F3A', textDecoration: 'none', display: 'block' }}>+91 9884772048 {t('contact_phone_general')}</a>
                        <a href="https://wa.me/919884770583?text=Hi!%20I%20want%20to%20know%20more%20about%20the%20Ladies%20Driving%20Program." target="_blank" rel="noreferrer" style={{ color: '#0B1F3A', textDecoration: 'none', display: 'block' }}>+91 9884770583 {t('contact_phone_ladies')} (WhatsApp)</a>
                      </p>
                    ) : row.labelKey === 'contact_lbl_email' ? (
                      <p style={{ fontSize: '14.5px', color: '#0B1F3A', fontWeight: 500, lineHeight: 1.55 }}>
                        <a href="mailto:Gvvds2009@gmail.com" style={{ color: '#0B1F3A', textDecoration: 'none', display: 'block' }}>Gvvds2009@gmail.com</a>
                        <a href="mailto:Gvvds2009@gmail.com" style={{ color: '#0B1F3A', textDecoration: 'none', display: 'block' }}>Gvvds2009@gmail.com</a>
                      </p>
                    ) : (
                      <p style={{ fontSize: '14.5px', color: '#0B1F3A', fontWeight: 500, lineHeight: 1.55 }}>
                        {row.content.split('\n').map((l, j) => <span key={j} style={{ display: 'block' }}>{l}</span>)}
                      </p>
                    )}
                  </div>
                </div>
              ))}
            </div>

            {/* Hours */}
            <div className="hours-card reveal">
              <h3 style={{ fontFamily: "'Playfair Display',serif", fontSize: '20px', color: '#0B1F3A', marginBottom: '20px' }}>{t('contact_sched_title')}</h3>
              {scheduleRows.map(([day, time, status]) => (
                <div className="hours-row" key={day}>
                  <span style={{ color: '#888880' }}>{day}</span>
                  <span style={{ color: status === 'open' ? '#1A6B3C' : '#C0392B', fontWeight: 600 }}>{time}</span>
                </div>
              ))}
            </div>

            {/* WhatsApp */}
            <a href="https://wa.me/919884772048?text=Hi!%20I%20want%20to%20know%20more%20about%20GVV%20Driving%20School." className="whatsapp-box reveal" target="_blank" rel="noreferrer">
              <div style={{ fontSize: '32px', flexShrink: 0 }}>💬</div>
              <div>
                <h4 style={{ color: '#fff', fontSize: '16px', fontWeight: 700, marginBottom: '3px' }}>{t('contact_whatsapp_title')}</h4>
                <p style={{ color: 'rgba(255,255,255,0.7)', fontSize: '13px' }}>{t('contact_whatsapp_desc')}</p>
              </div>
            </a>

            {/* Ladies line */}
            <div className="reveal" style={{ background: 'linear-gradient(135deg,#2A0818,#430E28)', borderRadius: '16px', padding: '24px', marginBottom: '20px' }}>
              <h4 style={{ color: '#FF9ED4', fontSize: '15px', fontWeight: 700, marginBottom: '6px' }}>{t('contact_ladies_line_title')}</h4>
              <p style={{ color: 'rgba(255,255,255,0.6)', fontSize: '13.5px', marginBottom: '12px' }}>{t('contact_ladies_line_desc')}</p>
              <div style={{ color: '#fff', fontSize: '18px', fontWeight: 700, display: 'flex', alignItems: 'center', gap: '8px' }}>
                <span style={{ flexShrink: 0 }}>💬</span>
                <a href="https://wa.me/919884770583?text=Hi!%20I%20want%20to%20know%20more%20about%20the%20Ladies%20Driving%20Program." target="_blank" rel="noreferrer" style={{ color: '#fff', textDecoration: 'none' }}>+91 9884770583</a>
              </div>
            </div>

            {/* Map Card */}
            <div className="reveal" style={{ marginBottom: '20px' }}>
              <a
                href="https://www.google.com/maps/search/?api=1&query=GVV+Driving+School+Virugambakkam+Chennai"
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  display: 'block',
                  position: 'relative',
                  borderRadius: '16px',
                  overflow: 'hidden',
                  height: '240px',
                  boxShadow: '0 8px 30px rgba(0,0,0,0.12)',
                  border: '1px solid rgba(11,31,58,0.1)',
                  transition: 'all 0.3s ease',
                  textDecoration: 'none'
                }}
                className="map-container-link"
              >
                <iframe
                  title="GVV Driving School Location"
                  src="https://maps.google.com/maps?q=GVV%20Driving%20School,%20Virugambakkam,%20Chennai&t=&z=15&ie=UTF8&iwloc=&output=embed"
                  width="100%"
                  height="100%"
                  style={{ border: 0, pointerEvents: 'none' }}
                  allowFullScreen=""
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                ></iframe>

                <div
                  style={{
                    position: 'absolute', top: 0, left: 0, right: 0, bottom: 0,
                    background: 'linear-gradient(to top, rgba(11,31,58,0.85) 0%, rgba(11,31,58,0.1) 60%)',
                    display: 'flex', flexDirection: 'column', justifyContent: 'flex-end',
                    padding: '16px 20px', transition: 'all 0.3s ease',
                  }}
                  className="map-overlay"
                >
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', width: '100%' }}>
                    <div>
                      <p style={{ margin: 0, fontSize: '11px', color: '#C9A84C', fontWeight: 600, letterSpacing: '1px', textTransform: 'uppercase' }}>{t('contact_map_lbl')}</p>
                      <h4 style={{ margin: '4px 0 0 0', fontSize: '14px', color: '#fff', fontWeight: 600 }}>{t('contact_map_placeholder')}</h4>
                    </div>
                    <span
                      className="map-badge"
                      style={{
                        background: '#C9A84C', color: '#0B1F3A', padding: '6px 12px',
                        borderRadius: '30px', fontSize: '11px', fontWeight: 700,
                        display: 'flex', alignItems: 'center', gap: '4px',
                        boxShadow: '0 4px 12px rgba(201,168,76,0.3)',
                        transition: 'all 0.3s ease', marginLeft: 'auto'
                      }}
                    >
                      {t('contact_map_badge')}
                    </span>
                  </div>
                </div>
              </a>
            </div>
          </div>

          {/* RIGHT COLUMN: Form */}
          <div>
            <div className="contact-form-card reveal">
              <h3 style={{ fontFamily: "'Playfair Display',serif", fontSize: '20px', color: '#0B1F3A', marginBottom: '6px' }}>{t('contact_form_title')}</h3>
              <p style={{ fontSize: '13.5px', color: '#888880', marginBottom: '24px' }}>{t('contact_form_desc')}</p>

              <div className="form-row-contact" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px', marginBottom: '16px' }}>
                <div className="form-group-light">
                  <label>{t('form_fullname')}</label>
                  <input style={iStyle('name')} type="text" placeholder={t('form_fullname_ph')} value={form.name} onChange={e => update('name', e.target.value)} />
                </div>
                <div className="form-group-light">
                  <label>{t('contact_form_phone')}</label>
                  <input style={iStyle('phone')} type="tel" placeholder="+91 98765 43210" value={form.phone} onChange={e => update('phone', e.target.value)} />
                </div>
              </div>
              <div className="form-row-contact" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px', marginBottom: '16px' }}>
                <div className="form-group-light">
                  <label>{t('contact_form_email')}</label>
                  <input style={iStyle('email')} type="email" placeholder="your@email.com" value={form.email} onChange={e => update('email', e.target.value)} />
                </div>
                <div className="form-group-light">
                  <label>{t('contact_form_type')}</label>
                  <select style={iStyle('type')} value={form.type} onChange={e => update('type', e.target.value)}>
                    <option value="">{t('contact_form_type_select')}</option>
                    <option>{t('contact_form_type_opt1')}</option>
                    <option>{t('contact_form_type_opt2')}</option>
                    <option>{t('contact_form_type_opt3')}</option>
                    <option>{t('contact_form_type_opt4')}</option>
                    <option>{t('contact_form_type_opt5')}</option>
                    <option>{t('contact_form_type_opt6')}</option>
                  </select>
                </div>
              </div>
              <div className="form-group-light" style={{ marginBottom: '16px' }}>
                <label>{t('contact_form_msg')}</label>
                <textarea style={iStyle('msg')} placeholder={t('contact_form_msg_ph')} value={form.msg} onChange={e => update('msg', e.target.value)} />
              </div>

              <button className="btn-submit-contact" onClick={submit} disabled={submitted}>
                {submitted ? t('contact_form_submit_sent') : t('contact_form_submit')}
              </button>

              {submitted && (
                <div style={{ background: '#E8F5EE', border: '1px solid rgba(26,107,60,0.3)', borderRadius: '16px', padding: '30px', textAlign: 'center', marginTop: '20px' }}>
                  <div style={{ fontSize: '40px', marginBottom: '12px' }}>✅</div>
                  <h3 style={{ color: '#0B1F3A', fontFamily: "'Playfair Display',serif", fontSize: '22px', marginBottom: '8px' }}>{t('contact_form_success_title')}</h3>
                  <p style={{ color: '#444440', fontSize: '14px' }}>{t('contact_form_success_desc')}</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
      <Footer navigate={navigate} />
    </div>
  );
}
