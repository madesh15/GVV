import React, { useState, useEffect, useRef } from 'react';
import { useLanguage } from '../context/LanguageContext';

export default function DraggableWhatsApp() {
  const { lang, t } = useLanguage();
  const [pos, setPos] = useState({ x: 0, y: 0 });
  const [isOpen, setIsOpen] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const isInitialized = useRef(false);
  const dragInfo = useRef({ 
    isDragging: false, 
    startX: 0, 
    startY: 0, 
    buttonX: 0, 
    buttonY: 0, 
    hasMoved: false 
  });

  // Initialize position to bottom-right (32px from bottom, 32px from right)
  useEffect(() => {
    const handleResize = () => {
      const buttonSize = 60;
      const margin = 32;
      if (!isInitialized.current) {
        setPos({
          x: window.innerWidth - buttonSize - margin,
          y: window.innerHeight - buttonSize - margin
        });
        isInitialized.current = true;
      } else {
        setPos(current => {
          const newX = Math.max(10, Math.min(window.innerWidth - buttonSize - 10, current.x));
          const newY = Math.max(10, Math.min(window.innerHeight - buttonSize - 10, current.y));
          return { x: newX, y: newY };
        });
      }
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const handleStart = (clientX, clientY) => {
    dragInfo.current = {
      isDragging: true,
      startX: clientX,
      startY: clientY,
      buttonX: pos.x,
      buttonY: pos.y,
      hasMoved: false
    };
  };

  const handleMove = (clientX, clientY) => {
    if (!dragInfo.current.isDragging) return;
    const dx = clientX - dragInfo.current.startX;
    const dy = clientY - dragInfo.current.startY;

    if (Math.abs(dx) > 4 || Math.abs(dy) > 4) {
      dragInfo.current.hasMoved = true;
    }

    const buttonSize = 60;
    const newX = Math.max(10, Math.min(window.innerWidth - buttonSize - 10, dragInfo.current.buttonX + dx));
    const newY = Math.max(10, Math.min(window.innerHeight - buttonSize - 10, dragInfo.current.buttonY + dy));

    setPos({ x: newX, y: newY });
  };

  const handleEnd = () => {
    if (!dragInfo.current.isDragging) return;
    if (!dragInfo.current.hasMoved) {
      setIsOpen(o => !o);
    }
    dragInfo.current.isDragging = false;
  };

  useEffect(() => {
    const onMouseMove = (e) => {
      if (dragInfo.current.isDragging) {
        handleMove(e.clientX, e.clientY);
      }
    };

    const onMouseUp = () => {
      handleEnd();
    };

    const onTouchMove = (e) => {
      if (dragInfo.current.isDragging && e.touches.length > 0) {
        if (e.cancelable) e.preventDefault();
        handleMove(e.touches[0].clientX, e.touches[0].clientY);
      }
    };

    const onTouchEnd = () => {
      handleEnd();
    };

    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', onMouseUp);
    document.addEventListener('touchmove', onTouchMove, { passive: false });
    document.addEventListener('touchend', onTouchEnd);

    return () => {
      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseup', onMouseUp);
      document.removeEventListener('touchmove', onTouchMove);
      document.removeEventListener('touchend', onTouchEnd);
    };
  }, [pos]);

  const isTopHalf = pos.y < 250;
  const isLeftHalf = pos.x < 250;

  const popoverStyle = {
    position: 'absolute',
    width: '270px',
    background: 'rgba(255, 255, 255, 0.95)',
    backdropFilter: 'blur(12px)',
    border: '1px solid rgba(11, 31, 58, 0.1)',
    borderRadius: '16px',
    boxShadow: '0 12px 36px rgba(0,0,0,0.15)',
    padding: '16px',
    zIndex: 1001,
    display: 'flex',
    flexDirection: 'column',
    gap: '10px',
    transition: 'opacity 0.25s ease, transform 0.25s ease',
    pointerEvents: 'auto',
    opacity: isOpen ? 1 : 0,
    transform: isOpen ? 'scale(1) translateY(0)' : 'scale(0.9) translateY(10px)',
    visibility: isOpen ? 'visible' : 'hidden',
    ...(isTopHalf ? { top: '70px' } : { bottom: '70px' }),
    ...(isLeftHalf ? { left: '0px' } : { right: '0px' }),
  };

  const buttonStyle = {
    width: '60px',
    height: '60px',
    borderRadius: '50%',
    backgroundColor: '#25D366',
    boxShadow: isOpen 
      ? '0 0 0 4px rgba(37,211,102,0.3), 0 8px 30px rgba(0,0,0,0.2)' 
      : '0 8px 24px rgba(37,211,102,0.35)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    cursor: dragInfo.current.isDragging ? 'grabbing' : 'grab',
    border: 'none',
    outline: 'none',
    transition: 'transform 0.2s, background-color 0.2s, box-shadow 0.2s',
    transform: isHovered || dragInfo.current.isDragging ? 'scale(1.08)' : 'scale(1)',
    animation: dragInfo.current.isDragging ? 'none' : 'whatsapp-pulse 2s infinite',
    pointerEvents: 'auto',
    color: '#fff',
    touchAction: 'none',
  };

  return (
    <div 
      style={{ 
        position: 'fixed', 
        left: `${pos.x}px`, 
        top: `${pos.y}px`, 
        zIndex: 1000,
        pointerEvents: 'none'
      }}
    >
      {/* Popover */}
      <div style={popoverStyle} onClick={(e) => e.stopPropagation()}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid #F0F0EE', paddingBottom: '8px', marginBottom: '4px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <span style={{ fontSize: '18px' }}>💬</span>
            <span style={{ fontWeight: 700, color: '#0B1F3A', fontSize: '14px', fontFamily: "'DM Sans', sans-serif" }}>{t('whatsapp_widget_title')}</span>
          </div>
          <button 
            onClick={() => setIsOpen(false)}
            style={{ border: 'none', background: 'none', color: '#888880', cursor: 'pointer', fontSize: '18px', fontWeight: 'bold', padding: '0 4px' }}
          >
            ×
          </button>
        </div>

        {[
          {
            title: t('whatsapp_widget_opt1_title'),
            desc: t('whatsapp_widget_opt1_desc'),
            phone: '919884772048',
            msg: 'Hi! I want to know more about GVV Driving School.',
            color: '#0B1F3A',
            bg: '#F5F5F0'
          },
          {
            title: t('whatsapp_widget_opt2_title'),
            desc: t('whatsapp_widget_opt2_desc'),
            phone: '919884770583',
            msg: 'Hi! I want to know more about the Ladies Driving Program.',
            color: '#D63384',
            bg: '#FFF0F5'
          }
        ].map((opt, i) => (
          <a
            key={i}
            href={`https://wa.me/${opt.phone}?text=${encodeURIComponent(opt.msg)}`}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => setIsOpen(false)}
            style={{
              display: 'flex',
              flexDirection: 'column',
              gap: '2px',
              padding: '12px',
              borderRadius: '12px',
              backgroundColor: opt.bg,
              textDecoration: 'none',
              transition: 'transform 0.2s, box-shadow 0.2s',
              cursor: 'pointer',
              border: '1px solid rgba(0,0,0,0.02)'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = 'scale(1.02)';
              e.currentTarget.style.boxShadow = '0 4px 12px rgba(0,0,0,0.05)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = 'none';
              e.currentTarget.style.boxShadow = 'none';
            }}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <span style={{ fontWeight: 700, fontSize: '13px', color: opt.color }}>{opt.title}</span>
              <span style={{ fontSize: '10px', color: '#1A6B3C', fontWeight: 600, display: 'flex', alignItems: 'center', gap: '3px' }}>
                <span style={{ display: 'inline-block', width: '6px', height: '6px', backgroundColor: '#25D366', borderRadius: '50%' }}></span>
                {t('whatsapp_widget_online')}
              </span>
            </div>
            <span style={{ fontSize: '11.5px', color: '#666' }}>{opt.desc}</span>
          </a>
        ))}
      </div>

      {/* WhatsApp Button */}
      <button
        style={buttonStyle}
        onMouseDown={(e) => {
          if (e.button === 0) { // left click only
            handleStart(e.clientX, e.clientY);
          }
        }}
        onTouchStart={(e) => {
          if (e.touches.length === 1) {
            handleStart(e.touches[0].clientX, e.touches[0].clientY);
          }
        }}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <svg viewBox="0 0 448 512" width="28" height="28" fill="currentColor">
          <path d="M380.9 97.1C339 55.1 283.2 32 223.9 32c-122.4 0-222 99.6-222 222 0 39.1 10.2 77.3 29.6 111L3 503l140.9-36.9c32.7 17.7 69.3 27 107.1 27 122.4 0 222-99.6 222-222 0-59.3-25.2-115-67.1-157zm-157 341.6c-33.2 0-65.7-8.9-94-25.7l-6.7-4-83.9 22 22.4-81.8-4.4-7c-18.5-29.4-28.2-63.3-28.2-98.2 0-101.7 82.8-184.5 184.6-184.5 49.3 0 95.6 19.2 130.4 54.1 34.8 34.9 56.2 81.2 56.1 130.5 0 101.8-84.9 184.6-186.6 184.6zm101.2-138.2c-5.5-2.8-32.8-16.2-37.9-18-5.1-1.9-8.8-2.8-12.5 2.8-3.7 5.6-14.3 18-17.6 21.8-3.2 3.7-6.5 4.2-12 1.4-32.6-16.3-54-29.1-75.5-66-5.7-9.8 5.7-9.1 16.3-30.3 1.8-3.7.9-6.9-.5-9.7-1.4-2.8-12.5-30.1-17.1-41.2-4.5-10.8-9.1-9.3-12.5-9.5-3.2-.2-6.9-.2-10.6-.2-3.7 0-9.7 1.4-14.8 6.9-5.1 5.6-19.4 19-19.4 46.3 0 27.3 19.9 53.7 22.6 57.4 2.8 3.7 39.1 59.7 94.8 83.8 35.2 15.2 49 16.5 66.6 13.9 10.7-1.6 32.8-13.4 37.4-26.4 4.6-13 4.6-24.1 3.2-26.4-1.3-2.5-5-3.9-10.5-6.6z"/>
        </svg>
      </button>
    </div>
  );
}

