import React, { useState, useEffect, useRef } from 'react';
import Footer from '../components/Footer';

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

const tickerItems = [
  'Government Approved Driving School',
  'Ladies Teaches Ladies — Safe & Empowering',
  '99% Passing Rate',
  'Certified Expert Instructors',
  'Morning & Evening Batches Available',
  'RTO Licence Assistance Included',
];

const whyCards = [
  { icon: '🏛️', title: 'Government Approved', text: 'Fully licensed by the Tamil Nadu Regional Transport Authority. Your certification is 100% legally valid across India.' },
  { icon: '♀', title: 'Ladies Teaches Ladies', text: 'Exclusive certified female instructors for women students — a comfortable, empowering and respectful learning experience.' },
  { icon: '🚗', title: 'Dual-Control Vehicles', text: 'All training vehicles are equipped with instructor-side dual controls — because your safety is our absolute top priority.' },
  { icon: '📊', title: '99% Passing Rate', text: 'Industry-leading pass rates through our structured curriculum, mock tests, and thorough traffic law coaching.' },
  { icon: '📅', title: 'Flexible Scheduling', text: 'Morning, afternoon and evening batches available 7 days a week. We work around your schedule.' },
  { icon: '🛡️', title: 'Insured Training', text: 'Every student and vehicle is fully insured during training sessions. Learn with complete peace of mind.' },
];

const reviews = [
  { stars: 5, text: '"I recently completed a 15-day driving class, and my instructor was Hari. He is a very patient and supportive instructor who explains everything clearly and boosts your confidence. Each day was well structured, gradually building up skills. By the end of the course, I felt comfortable and prepared to drive independently. I highly recommend this class to anyone looking for a stress-free and effective way to learn driving!"', name: 'swetha kalaiselvan', tag: '♀ Ladies Program Graduate', initials: 'AN', bg: '#F8E8F0', color: '#D63384' },
  { stars: 5, text: '"One of the best driving school have ever seen, and its cool to learn , and even their service were so polite and good."', name: 'Vikram Selvaraj', tag: 'Four Wheeler Course', initials: 'SK', bg: '#E8F0FB', color: '#1A3A8B' },
  { stars: 5, text: '"Comfortable ,helpful and friendly atmosphere... they have lady trainer for ladies.. their teaching techniques are unique and 100% recommended for beginners!"', name: 'sharon charu', tag: '♀ Ladies Program — Parent Enrolled', initials: 'MR', bg: '#FDF4DC', color: '#7A5200' },
  { stars: 5, text: '"Had a great experience with this driving class. They were very flexible with my timings, which made it really convenient for me. Madhesh and Sanjay brother taught very well and made the whole learning process smooth and comfortable. Highly recommended!"', name: 'Faiizi', tag: 'Full RTO Package', initials: 'KP', bg: '#E8F5EE', color: '#1A6B3C' },
  { stars: 5, text: '"I was trained by Mrs. Devi, who was extremely patient and ensured I learned proper driving skills step by step. Her calm and supportive guidance made a big difference in my learning experience. The last two sessions were conducted by Mr. Sanjay, who recognized my progress and focused on refining the areas where I needed improvement. His feedback was precise and very helpful."', name: 'Priya Subramani', tag: '♀ Two Wheeler — Ladies Instructor', initials: 'SV', bg: '#FAECE7', color: '#8B3A1A' },
  { stars: 5, text: '"Professional school, modern cars, friendly staff. The government certification is genuine and I had zero issues at the RTO. Highly recommend GVV to anyone in Chennai!"', name: 'Dinesh Murali', tag: 'Advanced Defensive Driving', initials: 'DM', bg: '#EDEBFE', color: '#4C3AB5' },
];

export default function LandingPage({ navigate }) {
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
          {[...tickerItems, ...tickerItems].map((t, i) => (
            <span className="ticker-item" key={i}>{t}</span>
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
            <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', background: 'rgba(201,168,76,0.18)', border: '1px solid rgba(201,168,76,0.35)', color: '#C9A84C', fontSize: '11.5px', fontWeight: 600, letterSpacing: '1.5px', textTransform: 'uppercase', padding: '8px 16px', borderRadius: '100px', marginBottom: '22px' }}>
              ✦ Government Approved &amp; Certified
            </div>
            <h1 style={{ fontFamily: "'Playfair Display',serif", fontSize: 'clamp(38px,4.5vw,64px)', fontWeight: 900, lineHeight: 1.02, color: '#fff', marginBottom: '18px' }}>
              Drive with <em style={{ color: '#C9A84C', fontStyle: 'italic' }}>Confidence.</em><br />Learn with Excellence.
            </h1>
            <p style={{ fontSize: '16.5px', lineHeight: 1.75, color: 'rgba(255,255,255,0.75)', marginBottom: '34px', maxWidth: '640px' }}>
              GVV Driving School — Chennai's most trusted government-approved driving institution, shaping safe and skilled drivers since 2009.
            </p>
          </div>
          <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap', justifyContent: 'center' }}>
            <button className="btn-gold" onClick={() => navigate('courses')}>View Courses →</button>
            <button className="btn-ghost" onClick={() => navigate('ladies')}>♀ Ladies Program</button>
          </div>
        </div>
      </section>

      {/* ── ABOUT ── */}
      <section style={{ background: '#fff', padding: '90px 5%' }}>
        <div className="about-inner" style={{ maxWidth: '1160px', margin: '0 auto', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '70px', alignItems: 'center' }}>
          <div className="reveal">
            <span style={{ display: 'inline-block', background: '#FDF4DC', color: '#7A5200', fontSize: '11px', fontWeight: 700, letterSpacing: '2px', textTransform: 'uppercase', padding: '7px 15px', borderRadius: '100px', border: '1px solid rgba(201,168,76,0.4)', marginBottom: '18px' }}>About GVV</span>
            <h2 style={{ fontFamily: "'Playfair Display',serif", fontSize: 'clamp(26px,3.2vw,42px)', fontWeight: 900, color: '#0B1F3A', lineHeight: 1.18, marginBottom: '16px' }}>Chennai's Premier Government-Approved Driving School</h2>
            <p style={{ fontSize: '15.5px', color: '#888880', lineHeight: 1.8, marginBottom: '14px' }}>Founded in 2009, GVV Driving School has grown into one of Tamil Nadu's most respected and trusted driver training institutions. We are fully licensed under the Tamil Nadu Regional Transport Authority and committed to producing safe, skilled, and responsible drivers.</p>
            <p style={{ fontSize: '15.5px', color: '#888880', lineHeight: 1.8, marginBottom: '14px' }}>Our philosophy is simple: every driver deserves world-class training in a safe, supportive environment. That's why we offer specialized programs — including our landmark <strong>Ladies Teaches Ladies</strong> initiative.</p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', marginTop: '24px' }}>
              {[['🏛️','Tamil Nadu RTA Certified','Reg. No: TN/DS/2005/0412 · Issued by Regional Transport Authority, Chennai'],
                ['🛡️','Fully Insured Training Sessions','All students and vehicles covered during every driving session'],
                ['♀','Certified Female Instructors','Government-licensed women instructors for our Ladies Program'],
                ['🚗','Dual-Control Training Vehicles','Modern dual-control cars for maximum learner safety at all times']].map(([ci,strong,span])=>(
                <div className="cert-row" key={strong}>
                  <div style={{ fontSize: '20px', flexShrink: 0 }}>{ci}</div>
                  <div><strong style={{ fontSize: '13.5px', color: '#0B1F3A', fontWeight: 600 }}>{strong}</strong><span style={{ fontSize: '12px', color: '#888880', display: 'block', marginTop: '1px' }}>{span}</span></div>
                </div>
              ))}
            </div>
          </div>
          <div className="about-visual-cards reveal" style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            <div style={{ background: '#0B1F3A', borderRadius: '18px', padding: '28px', color: '#fff' }}>
              <div style={{ fontFamily: "'Bebas Neue',sans-serif", fontSize: '52px', color: '#C9A84C', lineHeight: 1 }}>15,000+</div>
              <p style={{ color: 'rgba(255,255,255,0.6)', fontSize: '13.5px', marginTop: '4px' }}>Licensed drivers successfully trained and certified since 2009</p>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '14px' }}>
              {[['4,200+','Women trained through Ladies Program'],['99%','First-attempt RTO pass rate'],['15+','Years of trusted service']].map(([n,l])=>(
                <div key={l} style={{ background: '#F5F5F0', border: '1px solid #E8E8E0', borderRadius: '14px', padding: '20px' }}>
                  <div style={{ fontFamily: "'Bebas Neue',sans-serif", fontSize: '34px', color: '#0B1F3A', lineHeight: 1 }}>{n}</div>
                  <p style={{ fontSize: '12px', color: '#888880', marginTop: '4px' }}>{l}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── WHY US ── */}
      <section style={{ background: '#0B1F3A', padding: '90px 5%' }}>
        <div style={{ textAlign: 'center', marginBottom: '56px' }} className="reveal">
          <div style={{ display: 'inline-block', background: 'rgba(201,168,76,0.15)', color: '#C9A84C', fontSize: '11px', fontWeight: 700, letterSpacing: '2px', textTransform: 'uppercase', padding: '7px 15px', borderRadius: '100px', border: '1px solid rgba(201,168,76,0.3)', marginBottom: '16px' }}>Why Choose GVV</div>
          <h2 style={{ fontFamily: "'Playfair Display',serif", fontSize: 'clamp(26px,3.5vw,44px)', fontWeight: 900, color: '#fff', lineHeight: 1.15, marginBottom: '12px' }}>The GVV Difference</h2>
          <p style={{ fontSize: '16px', color: 'rgba(255,255,255,0.5)', maxWidth: '560px', margin: '0 auto', lineHeight: 1.7 }}>We don't just teach driving. We build responsible, confident, and safe drivers for life.</p>
        </div>
        <div className="why-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(230px,1fr))', gap: '18px', maxWidth: '1160px', margin: '0 auto' }}>
          {whyCards.map(c => (
            <div className="why-card reveal" key={c.title}>
              <div style={{ fontSize: '30px', marginBottom: '16px' }}>{c.icon}</div>
              <h3 style={{ color: '#fff', fontSize: '17px', fontWeight: 600, marginBottom: '9px' }}>{c.title}</h3>
              <p style={{ color: 'rgba(255,255,255,0.52)', fontSize: '13.5px', lineHeight: 1.7 }}>{c.text}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ── LADIES STRIP ── */}
      <section id="ladies-section" style={{ background: 'linear-gradient(135deg,#2A0818 0%,#430E28 50%,#2A0818 100%)', padding: '80px 5%', position: 'relative', overflow: 'hidden' }}>
        <div className="ls-inner" style={{ maxWidth: '1100px', margin: '0 auto', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '60px', alignItems: 'center' }}>
          <div className="reveal">
            <div style={{ display: 'inline-flex', alignItems: 'center', gap: '9px', background: 'rgba(214,51,132,0.18)', border: '1.5px solid #D63384', color: '#D63384', fontSize: '11px', fontWeight: 700, letterSpacing: '2px', textTransform: 'uppercase', padding: '9px 18px', borderRadius: '100px', marginBottom: '24px' }}>♀ Exclusively for Women</div>
            <h2 style={{ fontFamily: "'Playfair Display',serif", fontSize: 'clamp(28px,3.8vw,50px)', fontWeight: 900, color: '#fff', lineHeight: 1.12, marginBottom: '16px' }}>
              Ladies <span style={{ color: '#FF6BB0', fontStyle: 'italic' }}>Teaches</span> Ladies
            </h2>
            <p style={{ fontSize: '15.5px', lineHeight: 1.8, color: 'rgba(255,255,255,0.68)', marginBottom: '28px' }}>At GVV, we believe every woman deserves to learn driving in a comfortable, safe, and empowering environment. Our certified female instructors are specially trained to guide you with patience, care, and expertise.</p>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px', marginBottom: '32px' }}>
              {['♀ Certified Female Instructors','🛡️ Private Batches','⏰ Ladies-Only Timings','📋 RTO Support'].map(p=>(
                <span key={p} style={{ background: 'rgba(255,107,176,0.12)', border: '1px solid rgba(255,107,176,0.25)', color: '#FF9ED4', fontSize: '12.5px', fontWeight: 600, padding: '8px 16px', borderRadius: '100px' }}>{p}</span>
              ))}
            </div>
            <button className="btn-rose" onClick={() => navigate('ladies')}>♀ View Ladies Program →</button>
          </div>
          <div className="ls-right reveal" style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
            <div style={{ background: 'rgba(255,107,176,0.1)', border: '1px solid rgba(255,107,176,0.22)', borderRadius: '16px', padding: '28px' }}>
              <div style={{ fontFamily: "'Bebas Neue',sans-serif", fontSize: '56px', color: '#FF6BB0', lineHeight: 1 }}>4,200+</div>
              <div style={{ color: 'rgba(255,255,255,0.55)', fontSize: '13.5px', marginTop: '5px' }}>Women successfully trained and licensed at GVV</div>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
              {[['👩‍🏫','Female Instructors Only','No exception for women\'s sessions'],['🌸','Zero Discomfort Guarantee','Reschedule freely if ever uncomfortable'],['📱','WhatsApp Community','Join our women learners\' group'],['🏅','Govt. Certified','Female instructors govt-licenced']].map(([icon,h,p])=>(
                <div className="ls-mini" key={h}>
                  <div style={{ fontSize: '22px', marginBottom: '8px' }}>{icon}</div>
                  <h4 style={{ color: '#FF9ED4', fontSize: '13px', fontWeight: 600, marginBottom: '3px' }}>{h}</h4>
                  <p style={{ color: 'rgba(255,255,255,0.45)', fontSize: '11.5px', lineHeight: 1.5 }}>{p}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── REVIEWS ── */}
      <section id="reviews-section" style={{ background: '#F5F5F0', padding: '90px 5%', scrollMarginTop: '110px' }}>
        <div style={{ textAlign: 'center', marginBottom: '56px' }} className="reveal">
          <span style={{ display: 'inline-block', background: '#FDF4DC', color: '#7A5200', fontSize: '11px', fontWeight: 700, letterSpacing: '2px', textTransform: 'uppercase', padding: '7px 15px', borderRadius: '100px', border: '1px solid rgba(201,168,76,0.4)', marginBottom: '16px' }}>Student Reviews</span>
          <h2 style={{ fontFamily: "'Playfair Display',serif", fontSize: 'clamp(26px,3.5vw,44px)', fontWeight: 900, color: '#0B1F3A', lineHeight: 1.15, marginBottom: '12px' }}>What Our Students Say</h2>
          <p style={{ fontSize: '16px', color: '#888880', maxWidth: '560px', margin: '0 auto', lineHeight: 1.7 }}>Real words from real drivers who started their journey with GVV Driving School.</p>
        </div>
        <div className="reviews-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(300px,1fr))', gap: '22px', maxWidth: '1160px', margin: '0 auto' }}>
          {reviews.map(r => (
            <div className="review-card reveal" key={r.name}>
              <div style={{ color: '#C9A84C', fontSize: '15px', letterSpacing: '2px', marginBottom: '14px' }}>{'★'.repeat(r.stars)}</div>
              <p style={{ fontSize: '14.5px', lineHeight: 1.75, color: '#444440', marginBottom: '20px', fontStyle: 'italic' }}>{r.text}</p>
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                <div style={{ width: '40px', height: '40px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '15px', fontWeight: 700, flexShrink: 0, background: r.bg, color: r.color }}>{r.initials}</div>
                <div>
                  <div style={{ fontWeight: 600, fontSize: '13.5px', color: '#0B1F3A' }}>{r.name}</div>
                  <div style={{ fontSize: '11.5px', color: '#888880' }}>{r.tag}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ── CTA STRIP ── */}
      <section style={{ background: '#C9A84C', padding: '70px 5%', textAlign: 'center' }}>
        <h2 className="reveal" style={{ fontFamily: "'Playfair Display',serif", fontSize: 'clamp(26px,3.5vw,44px)', fontWeight: 900, color: '#0B1F3A', marginBottom: '12px' }}>Ready to Start Your Driving Journey?</h2>
        <p className="reveal" style={{ fontSize: '16px', color: 'rgba(11,31,58,0.65)', marginBottom: '32px' }}>Join 15,000+ drivers who chose GVV. Government approved, expert-led, results guaranteed.</p>
        <div className="cta-btns reveal" style={{ display: 'flex', gap: '14px', justifyContent: 'center', flexWrap: 'wrap' }}>
          <button className="btn-navy" onClick={() => navigate('courses')}>🚗 View All Courses</button>
          <button className="btn-navy-outline" onClick={() => navigate('ladies')}>♀ Ladies Program</button>
          <button className="btn-navy-outline" onClick={() => navigate('contact')}>📞 Contact Us</button>
          <button className="btn-navy" onClick={() => navigate('enroll')}>✍️ Enroll Now</button>
        </div>
      </section>

      <section id="enroll-section" style={{ background: '#fff', padding: '90px 5%', scrollMarginTop: '110px' }}>
        <div style={{ maxWidth: '980px', margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: '42px' }}>
            <span style={{ display: 'inline-block', background: '#F9F0CE', color: '#7A5200', fontSize: '11px', fontWeight: 700, letterSpacing: '2px', textTransform: 'uppercase', padding: '8px 16px', borderRadius: '100px', border: '1px solid rgba(201,168,76,0.4)', marginBottom: '16px' }}>Enroll with GVV</span>
            <h2 style={{ fontFamily: "'Playfair Display',serif", fontSize: 'clamp(28px,3.8vw,44px)', fontWeight: 900, color: '#0B1F3A', marginBottom: '12px' }}>Submit Your Enrollment Request</h2>
            <p style={{ fontSize: '16px', color: '#6F6F6F', maxWidth: '660px', margin: '0 auto', lineHeight: 1.75 }}>Fill out the form below and our admissions team will contact you to finalize your course, batch, and training schedule.</p>
          </div>

          <div className="enroll-form-wrap">
            {!enrollSubmitted ? (
              <>
                <div className="enroll-form-row">
                  <div className="enroll-form-group">
                    <label>Full Name</label>
                    <input style={inputStyle('name')} type="text" placeholder="Your full name" value={enroll.name} onChange={e => updateEnroll('name', e.target.value)} />
                  </div>
                  <div className="enroll-form-group">
                    <label>Mobile Number</label>
                    <input style={inputStyle('phone')} type="tel" placeholder="+91 98765 43210" value={enroll.phone} onChange={e => updateEnroll('phone', e.target.value)} />
                  </div>
                </div>
                <div className="enroll-form-row">
                  <div className="enroll-form-group">
                    <label>Email Address</label>
                    <input style={inputStyle('email')} type="email" placeholder="you@example.com" value={enroll.email} onChange={e => updateEnroll('email', e.target.value)} />
                  </div>
                  <div className="enroll-form-group">
                    <label>Preferred Course</label>
                    <select style={inputStyle('course')} value={enroll.course} onChange={e => updateEnroll('course', e.target.value)}>
                      <option value="">Select a course</option>
                      <option>Two Wheeler Training</option>
                      <option>Four Wheeler Training</option>
                      <option>RTO Licence Package</option>
                      <option>Ladies Program Enrollment</option>
                    </select>
                  </div>
                </div>
                <div className="enroll-form-row single">
                  <div className="enroll-form-group">
                    <label>Comments / Preferred Timing</label>
                    <textarea style={inputStyle('notes')} placeholder="Tell us your preferred batch, area, or any questions." value={enroll.notes || ''} onChange={e => updateEnroll('notes', e.target.value)} />
                  </div>
                </div>
                <button className="enroll-submit-btn" onClick={submitEnroll}>Submit Enrollment Request</button>
              </>
            ) : (
              <div className="enroll-success">
                <div style={{ fontSize: '44px', marginBottom: '18px' }}>✅</div>
                <h3 style={{ fontFamily: "'Playfair Display',serif", fontSize: '28px', color: '#0B1F3A', marginBottom: '12px' }}>Thank you! Your enrollment request is sent.</h3>
                <p style={{ fontSize: '15px', color: '#5A5A5A', lineHeight: 1.8, marginBottom: '24px' }}>One of our team members will contact you shortly to confirm the details and schedule your first session.</p>
                <button className="btn-navy" onClick={() => navigate('landing')}>Back to Home</button>
              </div>
            )}
          </div>
        </div>
      </section>

      <Footer navigate={navigate} />
    </div>
  );
}
