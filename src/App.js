import React, { useState, useEffect } from 'react';
import './index.css';
import Navbar from './components/Navbar';
import FloatingButtons from './components/FloatingButtons';
import LandingPage from './pages/LandingPage';
import CoursesPage from './pages/CoursesPage';
import LadiesPage from './pages/LadiesPage';
import ContactPage from './pages/ContactPage';

export default function App() {
  const [page, setPage] = useState('landing');
  const [scrollY, setScrollY] = useState(0);
  const [activeSection, setActiveSection] = useState('landing');

  const navigate = (p) => {
    if (p === 'reviews' || p === 'enroll') {
      setPage(p);
      return;
    }

    setPage(p);
    window.scrollTo({ top: 0, behavior: 'instant' });
  };

  useEffect(() => {
    if (page === 'reviews' || page === 'enroll') {
      const target = document.getElementById(page === 'reviews' ? 'reviews-section' : 'enroll-section');
      if (target) {
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }
  }, [page]);

  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY;
      setScrollY(y);

      if (page !== 'landing') return;

      // determine which landing section should be highlighted
      const offset = 120; // account for fixed header height
      let found = 'landing';
      const sections = [
        { id: 'reviews-section', key: 'reviews' },
        { id: 'ladies-section', key: 'ladies' },
        { id: 'enroll-section', key: 'enroll' },
      ];
      for (const s of sections) {
        const el = document.getElementById(s.id);
        if (!el) continue;
        const top = el.getBoundingClientRect().top - offset;
        if (top <= 0) {
          found = s.key;
        }
      }
      setActiveSection(found);
    };

    window.addEventListener('scroll', onScroll);
    // run once to set initial state
    onScroll();
    return () => window.removeEventListener('scroll', onScroll);
  }, [page]);

  return (
    <>
      <Navbar currentPage={page} navigate={navigate} activeSection={activeSection} />
      {(page === 'landing' || page === 'reviews' || page === 'enroll') && <LandingPage navigate={navigate} />}
      {page === 'courses' && <CoursesPage navigate={navigate} />}
      {page === 'ladies' && <LadiesPage navigate={navigate} />}
      {page === 'contact' && <ContactPage navigate={navigate} />}
      <FloatingButtons navigate={navigate} scrollY={scrollY} />
    </>
  );
}
