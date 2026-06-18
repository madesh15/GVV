import React, { createContext, useContext, useState, useEffect } from 'react';
import { translations } from '../utils/translations';

const LanguageContext = createContext();

export function LanguageProvider({ children }) {
  const [lang, setLang] = useState(() => {
    // Load persisted language preference if available, default to English
    const saved = localStorage.getItem('gvv_lang');
    return saved === 'ta' || saved === 'en' ? saved : 'en';
  });

  useEffect(() => {
    localStorage.setItem('gvv_lang', lang);
    document.documentElement.setAttribute('lang', lang);
  }, [lang]);

  const toggleLang = () => {
    setLang(l => (l === 'en' ? 'ta' : 'en'));
  };

  const t = (key, fallback = '') => {
    if (translations[lang] && translations[lang][key]) {
      return translations[lang][key];
    }
    // Fallback to English if translation is missing in the current language
    if (translations['en'] && translations['en'][key]) {
      return translations['en'][key];
    }
    return fallback || key;
  };

  return (
    <LanguageContext.Provider value={{ lang, setLang, toggleLang, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
}
