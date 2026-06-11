import React, { useState, useEffect, useRef } from 'react';
import InnerPageHero from '../components/InnerPageHero';
import Footer from '../components/Footer';

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
`;

export default function ContactPage({ navigate }) {
  const [form, setForm] = useState({ name: '', phone: '', email: '', type: '', msg: '' });
  const [submitted, setSubmitted] = useState(false);
  const [errors, setErrors] = useState({});
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

  return (
    <div ref={ref}>
      <style>{css}</style>
      <InnerPageHero
        breadcrumb="Contact Us" title="Contact" titleEm="Us"
        subtitle="We're here to answer every question about courses, enrollments, schedules, and our special ladies program. Reach us anytime."
        navigate={navigate}
      />
      <div style={{ maxWidth: '1160px', margin: '0 auto', padding: '60px 5% 80px' }}>
        <div className="contact-grid" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '50px', alignItems: 'start' }}>

          {/* LEFT COLUMN */}
          <div>
            {/* Contact Info */}
            <div className="contact-card reveal">
              <h3 style={{ fontFamily: "'Playfair Display',serif", fontSize: '20px', color: '#0B1F3A', marginBottom: '22px' }}>GVV Driving School — Chennai</h3>
              {[
                { icon: '📍', label: 'Address', content: 'No 6, Sai Nagar, 6th Street, Virugambakkam, Chennai-600092, Tamil Nadu' },
                { icon: '📞', label: 'Phone Numbers', content: null },
                { icon: '📧', label: 'Email', content: null },
                { icon: '🕐', label: 'Working Hours', content: 'Mon–Sat: 6:00 AM – 8:00 PM\nSunday: 7:00 AM – 1:00 PM' },
              ].map((row, i) => (
                <div key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: '15px', marginBottom: i < 3 ? '20px' : 0 }}>
                  <div style={{ width: '42px', height: '42px', background: '#0B1F3A', borderRadius: '11px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '17px', flexShrink: 0 }}>{row.icon}</div>
                  <div>
                    <div style={{ fontSize: '11.5px', color: '#BBBBB0', textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '4px' }}>{row.label}</div>
                    {row.label === 'Phone Numbers' ? (
                      <p style={{ fontSize: '14.5px', color: '#0B1F3A', fontWeight: 500, lineHeight: 1.55 }}>
                        <a href="tel:+919884772048" style={{ color: '#0B1F3A', textDecoration: 'none', display: 'block' }}>+91 9884772048 — General</a>
                        <a href="tel:+919884770583" style={{ color: '#0B1F3A', textDecoration: 'none', display: 'block' }}>+91 9884770583 — Ladies Enquiry</a>
                      </p>
                    ) : row.label === 'Email' ? (
                      <p style={{ fontSize: '14.5px', color: '#0B1F3A', fontWeight: 500, lineHeight: 1.55 }}>
                        <a href="mailto:info@gvvdrivingschool.in" style={{ color: '#0B1F3A', textDecoration: 'none', display: 'block' }}>info@gvvdrivingschool.in</a>
                        <a href="mailto:ladies@gvvdrivingschool.in" style={{ color: '#0B1F3A', textDecoration: 'none', display: 'block' }}>ladies@gvvdrivingschool.in</a>
                      </p>
                    ) : (
                      <p style={{ fontSize: '14.5px', color: '#0B1F3A', fontWeight: 500, lineHeight: 1.55 }}>{row.content.split('\n').map((l, j) => <span key={j} style={{ display: 'block' }}>{l}</span>)}</p>
                    )}
                  </div>
                </div>
              ))}
            </div>

            {/* Hours */}
            <div className="hours-card reveal">
              <h3 style={{ fontFamily: "'Playfair Display',serif", fontSize: '20px', color: '#0B1F3A', marginBottom: '20px' }}>Training Schedule</h3>
              {[
                ['Monday – Friday','6:00 AM – 8:00 PM','open'],
                ['Saturday','6:00 AM – 7:00 PM','open'],
                ['Sunday','7:00 AM – 1:00 PM','open'],
                ['Public Holidays','Closed','closed'],
                ['♀ Ladies Morning Batch','7:00 AM – 9:00 AM','open'],
                ['♀ Ladies Evening Batch','6:00 PM – 8:00 PM','open'],
              ].map(([day, time, status]) => (
                <div className="hours-row" key={day}>
                  <span style={{ color: '#888880' }}>{day}</span>
                  <span style={{ color: status === 'open' ? '#1A6B3C' : '#C0392B', fontWeight: 600 }}>{time}</span>
                </div>
              ))}
            </div>

            {/* WhatsApp */}
            <a href="https://wa.me/919884772048" className="whatsapp-box reveal" target="_blank" rel="noreferrer">
              <div style={{ fontSize: '32px', flexShrink: 0 }}>💬</div>
              <div>
                <h4 style={{ color: '#fff', fontSize: '16px', fontWeight: 700, marginBottom: '3px' }}>Chat on WhatsApp</h4>
                <p style={{ color: 'rgba(255,255,255,0.7)', fontSize: '13px' }}>+91 9884772048 · Replies within 15 mins</p>
              </div>
            </a>

            {/* Ladies line */}
            <div className="reveal" style={{ background: 'linear-gradient(135deg,#2A0818,#430E28)', borderRadius: '16px', padding: '24px', marginBottom: '20px' }}>
              <h4 style={{ color: '#FF9ED4', fontSize: '15px', fontWeight: 700, marginBottom: '6px' }}>♀ Ladies Dedicated Enquiry Line</h4>
              <p style={{ color: 'rgba(255,255,255,0.6)', fontSize: '13.5px', marginBottom: '12px' }}>For women's program enquiries, speak directly to our ladies enrollment team:</p>
              <div style={{ color: '#fff', fontSize: '18px', fontWeight: 700, display: 'flex', alignItems: 'center', gap: '8px' }}>📞 +91 9884770583</div>
            </div>

            {/* Govt reg */}
            <div className="reveal" style={{ background: '#E8F5EE', border: '1px solid rgba(26,107,60,0.3)', borderRadius: '14px', padding: '20px 22px', display: 'flex', alignItems: 'center', gap: '15px', marginBottom: '20px' }}>
              <div style={{ fontSize: '32px', flexShrink: 0 }}>🏛️</div>
              <div>
                <h4 style={{ fontSize: '11px', fontWeight: 700, color: '#1A6B3C', textTransform: 'uppercase', letterSpacing: '1.5px', marginBottom: '5px' }}>Government Registration</h4>
                <p style={{ fontSize: '14.5px', fontWeight: 700, color: '#0B1F3A' }}>Reg. No: TN/DS/2005/0412</p>
                <span style={{ fontSize: '11.5px', color: '#888880', display: 'block', marginTop: '2px' }}>Tamil Nadu Regional Transport Authority, Chennai</span>
              </div>
            </div>

            {/* Map placeholder */}
            <div className="reveal" style={{ background: '#0B1F3A', borderRadius: '16px', height: '220px', display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column', gap: '10px', color: '#C9A84C' }}>
              <span style={{ fontSize: '40px' }}>📍</span>
              <p style={{ fontSize: '13px', color: 'rgba(255,255,255,0.45)' }}>GVV Driving School — Virugambakkam, Chennai</p>
            </div>
          </div>

          {/* RIGHT COLUMN: Form */}
          <div>
            <div className="contact-form-card reveal">
              <h3 style={{ fontFamily: "'Playfair Display',serif", fontSize: '20px', color: '#0B1F3A', marginBottom: '6px' }}>Send Us a Message</h3>
              <p style={{ fontSize: '13.5px', color: '#888880', marginBottom: '24px' }}>Fill in the form below and we'll get back to you within a few hours.</p>

              <div className="form-row-contact" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px', marginBottom: '16px' }}>
                <div className="form-group-light">
                  <label>Full Name</label>
                  <input style={iStyle('name')} type="text" placeholder="Your name" value={form.name} onChange={e => update('name', e.target.value)} />
                </div>
                <div className="form-group-light">
                  <label>Phone Number</label>
                  <input style={iStyle('phone')} type="tel" placeholder="+91 98765 43210" value={form.phone} onChange={e => update('phone', e.target.value)} />
                </div>
              </div>
              <div className="form-row-contact" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px', marginBottom: '16px' }}>
                <div className="form-group-light">
                  <label>Email Address</label>
                  <input style={iStyle('email')} type="email" placeholder="your@email.com" value={form.email} onChange={e => update('email', e.target.value)} />
                </div>
                <div className="form-group-light">
                  <label>Enquiry Type</label>
                  <select style={iStyle('type')} value={form.type} onChange={e => update('type', e.target.value)}>
                    <option value="">— Select Type —</option>
                    <option>General Course Enquiry</option>
                    <option>♀ Ladies Program Enquiry</option>
                    <option>Fee &amp; Payment Enquiry</option>
                    <option>RTO Licence Help</option>
                    <option>Schedule &amp; Batch Timing</option>
                    <option>Other</option>
                  </select>
                </div>
              </div>
              <div className="form-group-light" style={{ marginBottom: '16px' }}>
                <label>Your Message</label>
                <textarea style={iStyle('msg')} placeholder="Write your question or message here…" value={form.msg} onChange={e => update('msg', e.target.value)} />
              </div>

              <button className="btn-submit-contact" onClick={submit} disabled={submitted}>
                {submitted ? 'Sent ✓' : 'Send Message →'}
              </button>

              {submitted && (
                <div style={{ background: '#E8F5EE', border: '1px solid rgba(26,107,60,0.3)', borderRadius: '16px', padding: '30px', textAlign: 'center', marginTop: '20px' }}>
                  <div style={{ fontSize: '40px', marginBottom: '12px' }}>✅</div>
                  <h3 style={{ color: '#0B1F3A', fontFamily: "'Playfair Display',serif", fontSize: '22px', marginBottom: '8px' }}>Message Sent!</h3>
                  <p style={{ color: '#444440', fontSize: '14px' }}>We'll get back to you within a few hours. Thank you for reaching out to GVV Driving School.</p>
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
