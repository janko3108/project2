import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowUp } from '@fortawesome/free-solid-svg-icons';

const BackToTopButton = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 300) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  return (
    <div style={{
      position: 'fixed',
      bottom: '30px',
      right: '30px',
      opacity: isVisible ? 1 : 0,
      transition: 'opacity 0.3s',
      zIndex: 1000
    }}>
      <button
        onClick={scrollToTop}
        style={{
          backgroundColor: '#F76902',
          width: '50px',
          height: '50px',
          borderRadius: '4px',
          textAlign: 'center',
          cursor: 'pointer'
        }}>
        <FontAwesomeIcon icon={faArrowUp} style={{ color: '#fff', fontSize: '2em', lineHeight: '50px' }} />
      </button>
    </div>
  );
};

export default BackToTopButton;
