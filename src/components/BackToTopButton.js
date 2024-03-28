import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowUp } from '@fortawesome/free-solid-svg-icons';

/**
 * Functional component representing a back to top button.
 * @returns {JSX.Element} JSX element representing the back to top button.
 */
const BackToTopButton = () => {
  /**
   * State variable to track the visibility of the button.
   * @type {[boolean, Function]} isVisible - A tuple containing the visibility state and its setter function.
   */
  const [isVisible, setIsVisible] = useState(false);

  /**
   * Effect hook to update the visibility state based on scroll position.
   */
  useEffect(() => {
    /**
     * Event listener callback function to handle scroll events.
     */
    const handleScroll = () => {
      if (window.scrollY > 300) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener('scroll', handleScroll);

    // Cleanup function to remove event listener on component unmount.
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  /**
   * Scrolls the window to the top when the button is clicked.
   */
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
