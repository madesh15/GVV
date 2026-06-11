import React, { useState, useEffect, useRef } from 'react';
import Footer from '../components/Footer';

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
  { icon: '👩‍🏫', title: 'Certified Female Instructors Only', text: 'Every women\'s session — without exception — is conducted by our government-certified female driving instructors. No male instructors in ladies batches.' },
  { icon: '🛡️', title: 'Private & Safe Batches', text: 'Dedicated ladies-only time slots on routes chosen for comfort and privacy. No mixed sessions.' },
  { icon: '⏰', title: 'Ladies-Only Flexible Timings', text: 'Special morning (7–9 AM) and evening (6–8 PM) batches designed around your family schedule and daily routine.' },
  { icon: '📋', title: 'End-to-End RTO Support', text: "From learner's licence prep to permanent licence — our team accompanies and assists women students at every step of the RTO process." },
  { icon: '🌸', title: 'Zero Discomfort Guarantee', text: 'If you ever feel uncomfortable for any reason, reschedule freely. No questions asked, full flexibility — because your comfort matters most.' },
  { icon: '📱', title: "Women Learners' WhatsApp Group", text: 'Join our active community of women learners for tips, schedule updates, peer support, and encouragement throughout your journey.' },
];

export default function LadiesPage({ navigate }) {
  const [form, setForm] = useState({ name: '', phone: '', email: '', dob: '', course: '', batch: '', area: '', agree: false });
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
    if (!form.course) errs.course = true;
    if (!form.agree) errs.agree = true;
    setErrors(errs);
    if (Object.keys(errs).length) return;
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
          <div style={{ fontSize: '12px', color: 'rgba(255,255,255,0.45)', marginBottom: '14px', cursor: 'pointer' }} onClick={() => navigate('landing')}>← Home / Ladies Program</div>
          <h1 style={{ fontFamily: "'Playfair Display',serif", fontSize: 'clamp(32px,4vw,54px)', fontWeight: 900, color: '#fff', marginBottom: '12px', lineHeight: 1.1 }}>
            Ladies <em style={{ color: '#FF6BB0', fontStyle: 'italic' }}>Teaches</em> Ladies
          </h1>
          <p style={{ fontSize: '16px', color: 'rgba(255,255,255,0.65)', maxWidth: '600px', lineHeight: 1.7 }}>Chennai's most trusted exclusive women's driving program — certified female instructors, private batches, and a safe, empowering learning experience.</p>
        </div>
      </div>

      <div style={{ maxWidth: '1160px', margin: '0 auto', padding: '60px 5% 80px' }}>
        {/* Stats */}
        <div className="ladies-stats-row" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(180px,1fr))', gap: '20px', marginBottom: '60px' }}>
          {[['4,200+','Women licensed through GVV'],['98%','First-attempt pass rate for women'],['6+','Certified female instructors'],['2005','Ladies program since']].map(([n,l])=>(
            <div key={l} className="reveal" style={{ background: 'linear-gradient(135deg,#2A0818,#430E28)', borderRadius: '16px', padding: '28px', textAlign: 'center' }}>
              <div style={{ fontFamily: "'Bebas Neue',sans-serif", fontSize: '52px', color: '#FF6BB0', lineHeight: 1 }}>{n}</div>
              <div style={{ color: 'rgba(255,255,255,0.55)', fontSize: '13px', marginTop: '6px' }}>{l}</div>
            </div>
          ))}
        </div>

        {/* Features header */}
        <div style={{ textAlign: 'center', marginBottom: '36px' }} className="reveal">
          <span style={{ display: 'inline-block', background: 'rgba(214,51,132,0.1)', color: '#C01070', fontSize: '11px', fontWeight: 700, letterSpacing: '2px', textTransform: 'uppercase', padding: '7px 15px', borderRadius: '100px', border: '1px solid rgba(214,51,132,0.3)', marginBottom: '14px' }}>Why Our Ladies Program</span>
          <h2 style={{ fontFamily: "'Playfair Display',serif", fontSize: 'clamp(26px,3.2vw,38px)', fontWeight: 900, color: '#0B1F3A', marginBottom: '10px' }}>Everything Designed for Women</h2>
          <p style={{ fontSize: '16px', color: '#888880', maxWidth: '500px', margin: '0 auto', lineHeight: 1.7 }}>A safe, private, and empowering environment where women learn from women.</p>
        </div>

        {/* Features grid */}
        <div className="ladies-features-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(260px,1fr))', gap: '20px', marginBottom: '60px' }}>
          {features.map(f => (
            <div key={f.title} className="lf-card reveal">
              <div style={{ fontSize: '32px', marginBottom: '16px' }}>{f.icon}</div>
              <h3 style={{ color: '#C01070', fontSize: '17px', fontWeight: 700, marginBottom: '10px' }}>{f.title}</h3>
              <p style={{ color: '#444440', fontSize: '14px', lineHeight: 1.7 }}>{f.text}</p>
            </div>
          ))}
        </div>

        {/* Enrollment Form */}
        <div style={{ marginTop: '20px' }}>
          {!submitted ? (
            <div className="ladies-form-wrap">
              <h2 style={{ fontFamily: "'Playfair Display',serif", fontSize: '28px', color: '#fff', marginBottom: '6px' }}>♀ Enroll in Ladies Program</h2>
              <p style={{ color: 'rgba(255,255,255,0.55)', fontSize: '14.5px', marginBottom: '32px' }}>Fill in your details and our ladies team will call you within 24 hours to confirm your batch.</p>

              <div className="form-row-ladies" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '18px', marginBottom: '18px' }}>
                <div className="form-group">
                  <label>Full Name</label>
                  <input style={inputStyle('name')} type="text" placeholder="Your full name" value={form.name} onChange={e => update('name', e.target.value)} />
                </div>
                <div className="form-group">
                  <label>Mobile Number</label>
                  <input style={inputStyle('phone')} type="tel" placeholder="+91 98765 43210" value={form.phone} onChange={e => update('phone', e.target.value)} />
                </div>
              </div>
              <div className="form-row-ladies" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '18px', marginBottom: '18px' }}>
                <div className="form-group">
                  <label>Email Address</label>
                  <input style={inputStyle('email')} type="email" placeholder="your@email.com" value={form.email} onChange={e => update('email', e.target.value)} />
                </div>
                <div className="form-group">
                  <label>Date of Birth</label>
                  <input style={inputStyle('dob')} type="date" value={form.dob} onChange={e => update('dob', e.target.value)} />
                </div>
              </div>
              <div className="form-row-ladies" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '18px', marginBottom: '18px' }}>
                <div className="form-group">
                  <label>Select Course</label>
                  <select style={inputStyle('course')} value={form.course} onChange={e => update('course', e.target.value)}>
                    <option value="">— Choose a Course —</option>
                    <option>♀ Ladies Exclusive Four Wheeler</option>
                    <option>♀ Ladies Two Wheeler / Scooter</option>
                    <option>♀ Full RTO Package (Ladies)</option>
                  </select>
                </div>
                <div className="form-group">
                  <label>Preferred Batch Time</label>
                  <select style={inputStyle('batch')} value={form.batch} onChange={e => update('batch', e.target.value)}>
                    <option value="">— Choose Timing —</option>
                    <option>Morning Batch (7:00 AM – 9:00 AM)</option>
                    <option>Morning Batch (9:00 AM – 11:00 AM)</option>
                    <option>Evening Batch (6:00 PM – 8:00 PM)</option>
                  </select>
                </div>
              </div>
              <div className="form-group" style={{ marginBottom: '18px' }}>
                <label>Address / Area (Chennai)</label>
                <input style={inputStyle('area')} type="text" placeholder="Your area or locality in Chennai" value={form.area} onChange={e => update('area', e.target.value)} />
              </div>

              <label className="ladies-agree">
                <input type="checkbox" checked={form.agree} onChange={e => update('agree', e.target.checked)} style={{ border: errors.agree ? '1px solid #FF6BB0' : '' }} />
                <span>I confirm I am enrolling for the <strong style={{ color: '#FF9ED4' }}>♀ Ladies Teaches Ladies Program</strong> and request a certified female instructor for all my driving sessions.</span>
              </label>

              <button className="btn-submit-ladies" onClick={submit}>♀ Submit Enrollment Application</button>
              <p style={{ textAlign: 'center', fontSize: '11.5px', color: 'rgba(255,255,255,0.35)', marginTop: '14px' }}>🔒 Your data is 100% private and shared only with our ladies enrollment team.</p>
            </div>
          ) : (
            <div style={{ background: 'linear-gradient(135deg,#2A0818,#430E28)', borderRadius: '24px', padding: '50px 20px', textAlign: 'center', maxWidth: '780px', margin: '0 auto' }}>
              <div style={{ fontSize: '60px', marginBottom: '16px' }}>🎉</div>
              <h3 style={{ fontFamily: "'Playfair Display',serif", fontSize: '28px', color: '#fff', marginBottom: '10px' }}>Enrollment Received!</h3>
              <p style={{ color: 'rgba(255,255,255,0.6)', fontSize: '16px', marginBottom: '30px' }}>Thank you! Our ladies team will call you within 24 hours to confirm your batch and instructor details.</p>
              <button style={{ background: '#D63384', color: '#fff', fontWeight: 700, fontSize: '14px', padding: '13px 26px', borderRadius: '10px', border: 'none', cursor: 'pointer', fontFamily: "'DM Sans',sans-serif" }} onClick={() => navigate('landing')}>← Back to Home</button>
            </div>
          )}
        </div>
      </div>
      <Footer navigate={navigate} variant="ladies" />
    </div>
  );
}
