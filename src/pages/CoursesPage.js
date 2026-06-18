import React, { useState, useEffect, useRef } from 'react';
import InnerPageHero from '../components/InnerPageHero';
import Footer from '../components/Footer';
import { useLanguage } from '../context/LanguageContext';

const css = `
.course-card { background: #fff; border: 1px solid #E8E8E0; border-radius: 18px; overflow: hidden; transition: all .3s; position: relative; }
.course-card:hover { transform: translateY(-4px); box-shadow: 0 18px 46px rgba(11,31,58,0.12); border-color: #C9A84C; }
.course-card.ladies-card { border: 2px solid rgba(214,51,132,0.4); }
.course-card.ladies-card:hover { border-color: #D63384; }
.filter-btn { background: #fff; border: 1.5px solid #E8E8E0; color: #444440; font-size: 13px; font-weight: 600; padding: 9px 18px; border-radius: 100px; cursor: pointer; transition: all .2s; font-family: 'DM Sans',sans-serif; }
.filter-btn:hover, .filter-btn.active { background: #0B1F3A; border-color: #0B1F3A; color: #fff; }
.filter-btn.ladies-f.active { background: #D63384; border-color: #D63384; }
.btn-enroll-sm { background: #C9A84C; color: #0B1F3A; font-weight: 700; font-size: 13px; padding: 9px 18px; border-radius: 8px; border: none; cursor: pointer; display: inline-flex; align-items: center; gap: 6px; transition: all .2s; font-family: 'DM Sans',sans-serif; }
.btn-enroll-sm:hover { background: #E8C96C; }
.btn-enroll-ladies { background: #D63384; color: #fff; font-weight: 700; font-size: 13px; padding: 9px 18px; border-radius: 8px; border: none; cursor: pointer; display: inline-flex; align-items: center; gap: 6px; transition: all .2s; font-family: 'DM Sans',sans-serif; }
.btn-enroll-ladies:hover { opacity: .88; }
@media(max-width:600px){
  .courses-grid { grid-template-columns: 1fr !important; }
  .courses-filter { gap: 8px !important; }
}
`;

const courses = [
  { cat: 'car', ladies: false, icon: '🚗', iconBg: '#E8F0FB', badgeBg: '#E8F0FB', badgeColor: '#1A3A8B', badge: 'Beginner', title: 'Car Training with License', desc: 'Start your driving journey from zero. Learn vehicle controls, road rules, traffic signs, and confidence-building maneuvers in real city traffic. Its included the Full RTO Licnese Package ', price: '₹10,500', per: '/ full course', dur: '15 days class · 30 mins/day' },
  { cat: 'bike', ladies: false, icon: '🏍️', iconBg: '#FDF4DC', badgeBg: '#FDF4DC', badgeColor: '#7A5200', badge: 'Two Wheeler', title: 'Two Wheeler License', desc: 'Master two-wheeler riding with confidence. Includes balance training, city riding, highway basics, and traffic navigation techniques.', price: '₹2,500', per: '/ full course', dur: '2 Months  ' },
  { cat: 'ladies', ladies: true, icon: '♀️', iconBg: '#F8E8F0', badgeBg: '#F8E8F0', badgeColor: '#8B1A4A', badge: 'Ladies Exclusive', title: 'Car Training with License For Ladies', desc: 'Taught entirely by certified female instructors. Private batches, comfortable pace, and a nurturing learning environment exclusively for women.', price: '₹10,500', per: '/ full course', dur: '25 days · 2 hrs/day' },
  { cat: 'ladies bike', ladies: true, icon: '🛵', iconBg: '#F8E8F0', badgeBg: '#F8E8F0', badgeColor: '#8B1A4A', badge: 'Ladies Two Wheeler', title: 'Two Wheeler License for Ladies', desc: 'Bike and scooter training conducted by our certified female instructors. Safe, private batches designed specifically for women learners.', price: '₹2,500', per: '/ full course', dur: '2 Months' },
  { cat: 'heavy', ladies: false, icon: '🚛', iconBg: '#E8F5EE', badgeBg: '#E8F5EE', badgeColor: '#1A6B3C', badge: 'Heavy Vehicle', title: 'Heavy Vehicle / LMV Course', desc: 'Specialized training for trucks, buses, and heavy motor vehicles. Includes hill driving, reverse parking, industrial routes, and commercial lane rules.', price: '₹8,500', per: '/ full course', dur: '30 days · 3 hrs/day' },
  { cat: 'advanced car', ladies: false, icon: '⚡', iconBg: '#EDEBFE', badgeBg: '#EDEBFE', badgeColor: '#4C3AB5', badge: 'Advanced', title: 'Advanced Defensive Driving', desc: 'For already-licensed drivers wanting to upgrade — highway driving, emergency braking, night driving, fuel efficiency, and advanced hazard perception.', price: '₹5000', per: '/ full course', dur: '10 days · 2 hrs/day' },
  { cat: 'car advanced', ladies: false, icon: '📜', iconBg: '#FCEBEB', badgeBg: '#FCEBEB', badgeColor: '#8B1A1A', badge: 'RTO Package', title: 'Full RTO Licence Package for Car', desc: "All-inclusive package: learner's licence test prep, permanent licence application, school certificate, and RTO escort on your test day.", price: '₹6,500', per: '/ complete', dur: '30 days · end-to-end' },
];

const filters = [
  { key: 'all', labelKey: 'filter_all', ladies: false },
  { key: 'car', labelKey: 'filter_four', ladies: false },
  { key: 'bike', labelKey: 'filter_two', ladies: false },
  { key: 'ladies', labelKey: 'filter_ladies', ladies: true },
  { key: 'heavy', labelKey: 'filter_heavy', ladies: false },
  { key: 'advanced', labelKey: 'filter_advanced', ladies: false },
];

// Mapping for dynamic course translations
const courseKeys = {
  'Car Training with License': {
    title: 'course_car_title',
    desc: 'course_car_desc',
    badge: 'Beginner', // Will translate Beginner
  },
  'Two Wheeler License': {
    title: 'course_bike_title',
    desc: 'course_bike_desc',
    badge: 'filter_two',
  },
  'Car Training with License For Ladies': {
    title: 'course_car_ladies_title',
    desc: 'course_car_ladies_desc',
    badge: 'Ladies Exclusive',
  },
  'Two Wheeler License for Ladies': {
    title: 'course_bike_ladies_title',
    desc: 'course_bike_ladies_desc',
    badge: 'Ladies Two Wheeler',
  },
  'Heavy Vehicle / LMV Course': {
    title: 'course_heavy_title',
    desc: 'course_heavy_desc',
    badge: 'filter_heavy',
  },
  'Advanced Defensive Driving': {
    title: 'course_adv_car_title',
    desc: 'course_adv_car_desc',
    badge: 'filter_advanced',
  },
  'Full RTO Licence Package for Car': {
    title: 'course_rto_car_title',
    desc: 'course_rto_car_desc',
    badge: 'RTO Package',
  }
};

export default function CoursesPage({ navigate }) {
  const [activeFilter, setActiveFilter] = useState('all');
  const { lang, t } = useLanguage();
  const ref = useRef(null);

  useEffect(() => {
    if (!ref.current) return;
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((e, i) => {
        if (e.isIntersecting) { setTimeout(() => e.target.classList.add('vis'), i * 60); observer.unobserve(e.target); }
      });
    }, { threshold: 0.05 });
    ref.current.querySelectorAll('.reveal').forEach(el => observer.observe(el));
    return () => observer.disconnect();
  }, [activeFilter]);

  const visible = courses.filter(c => activeFilter === 'ladies' ? c.ladies : !c.ladies && (activeFilter === 'all' || c.cat.includes(activeFilter)));

  const getBadgeTranslation = (badge) => {
    const map = {
      'Beginner': lang === 'en' ? 'Beginner' : 'தொடக்கநிலை',
      'Two Wheeler': t('filter_two'),
      'Ladies Exclusive': lang === 'en' ? 'Ladies Exclusive' : 'மகளிர் பிரத்தியேகப் பிரிவு',
      'Ladies Two Wheeler': lang === 'en' ? 'Ladies Two Wheeler' : 'மகளிர் இரு சக்கர வாகனம்',
      'Heavy Vehicle': t('filter_heavy'),
      'Advanced': t('filter_advanced'),
      'RTO Package': lang === 'en' ? 'RTO Package' : 'RTO பேக்கேஜ்'
    };
    return map[badge] || badge;
  };

  const translateDuration = (dur) => {
    if (lang === 'en') return dur;
    return dur
      .replace('days class', 'நாட்கள் வகுப்பு')
      .replace('days', 'நாட்கள்')
      .replace('mins/day', 'நிமிடங்கள்/நாள்')
      .replace('Months', 'மாதங்கள்')
      .replace('hrs/day', 'மணிநேரம்/நாள்')
      .replace('complete', 'முழுவதும்')
      .replace('end-to-end', 'ஆரம்பம் முதல் முடிவு வரை');
  };

  const translatePer = (per) => {
    if (lang === 'en') return per;
    return per
      .replace('/ full course', '/ முழு வகுப்பு')
      .replace('/ complete', '/ முழுவதும்');
  };

  return (
    <div ref={ref}>
      <style>{css}</style>
      <InnerPageHero
        breadcrumb={t('courses_hero_bread')}
        title={t('courses_hero_title')}
        titleEm={t('courses_hero_title_em')}
        subtitle={t('courses_hero_subtitle')}
        navigate={navigate}
      />
      <div style={{ maxWidth: '1160px', margin: '0 auto', padding: '60px 5% 80px' }}>

        {/* Filter bar */}
        <div className="courses-filter" style={{ display: 'flex', gap: '10px', flexWrap: 'wrap', marginBottom: '40px' }}>
          {filters.map(f => (
            <button
              key={f.key}
              className={`filter-btn${f.ladies ? ' ladies-f' : ''}${activeFilter === f.key ? ' active' : ''}`}
              onClick={() => setActiveFilter(f.key)}
            >{t(f.labelKey)}</button>
          ))}
        </div>

        {/* Course grid */}
        <div className="courses-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill,minmax(300px,1fr))', gap: '24px' }}>
          {visible.map(c => {
            const keys = courseKeys[c.title] || { title: '', desc: '', badge: c.badge };
            return (
              <div key={c.title} className={`course-card reveal${c.ladies ? ' ladies-card' : ''}`}>
                <span style={{
                  position: 'absolute', top: '16px', right: '16px',
                  background: c.ladies ? '#D63384' : '#1A6B3C',
                  color: '#fff', fontSize: '10px', fontWeight: 700, letterSpacing: '.8px',
                  textTransform: 'uppercase', padding: '5px 10px', borderRadius: '6px',
                }}>{c.ladies ? t('course_ladies_badge') : t('course_govt_badge')}</span>

                <div style={{ padding: '26px 26px 18px' }}>
                  <div style={{ width: '50px', height: '50px', background: c.iconBg, borderRadius: '13px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '22px', marginBottom: '16px' }}>{c.icon}</div>
                  <div style={{ fontSize: '10.5px', fontWeight: 700, letterSpacing: '1.5px', textTransform: 'uppercase', padding: '4px 10px', borderRadius: '100px', display: 'inline-block', marginBottom: '11px', background: c.badgeBg, color: c.badgeColor }}>{getBadgeTranslation(keys.badge)}</div>
                  <h3 style={{ fontFamily: "'Playfair Display',serif", fontSize: '19px', fontWeight: 700, color: '#0B1F3A', marginBottom: '9px', lineHeight: 1.25 }}>{t(keys.title, c.title)}</h3>
                  <p style={{ fontSize: '13.5px', color: '#888880', lineHeight: 1.65 }}>{t(keys.desc, c.desc)}</p>
                </div>

                <div style={{ borderTop: '1px solid #E8E8E0', padding: '16px 26px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                  <div>
                    <div className="course-price" style={{ fontFamily: "'Bebas Neue',sans-serif", fontSize: '28px', color: '#0B1F3A', lineHeight: 1 }}>
                      {c.price} <span style={{ fontSize: '12px', fontFamily: "'DM Sans',sans-serif", fontWeight: 400, color: '#888880' }}>{translatePer(c.per)}</span>
                    </div>
                    <div className="course-dur" style={{ fontSize: '11.5px', color: '#888880', marginTop: '3px' }}>⏱ {translateDuration(c.dur)}</div>
                  </div>
                  {c.ladies
                    ? <button className="btn-enroll-ladies" onClick={() => navigate('ladies')}>{t('course_enroll_ladies_btn')}</button>
                    : <button className="btn-enroll-sm" onClick={() => navigate('contact')}>{t('course_enroll_btn')}</button>
                  }
                </div>
              </div>
            );
          })}
          {activeFilter !== 'ladies' && (
            <div 
              className="course-card ladies-card reveal" 
              style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', textAlign: 'center', padding: '30px 26px', cursor: 'pointer', border: '1.5px solid #D63384', backgroundColor: '#FDF4F8' }}
              onClick={() => setActiveFilter('ladies')}
            >
              <div style={{ width: '60px', height: '60px', background: '#F8E8F0', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '28px', marginBottom: '16px' }}>♀️</div>
              <h3 style={{ fontFamily: "'Playfair Display',serif", fontSize: '20px', fontWeight: 700, color: '#0B1F3A', marginBottom: '12px', lineHeight: 1.25 }}>{t('course_ladies_card_title')}</h3>
              <p style={{ fontSize: '13.5px', color: '#888880', lineHeight: 1.65, marginBottom: '24px' }}>{t('course_ladies_card_desc')}</p>
              <button className="btn-enroll-ladies" style={{ width: '100%', justifyContent: 'center' }} onClick={(e) => { e.stopPropagation(); setActiveFilter('ladies'); }}>{t('course_ladies_card_btn')}</button>
            </div>
          )}
        </div>
      </div>
      <Footer navigate={navigate} />
    </div>
  );
}
