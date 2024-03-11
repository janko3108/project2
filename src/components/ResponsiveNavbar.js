// ResponsiveNavbar.js

import React, { useEffect } from 'react';
import './ResponsiveNavbar.css';

const ResponsiveNavbar = () => {
  useEffect(() => {
    const navSlide = () => {
      const burger = document.querySelector('.burger');
      const nav = document.querySelector('.nav-links');
      const navLinks = document.querySelectorAll('.nav-links li');

      // Toggle Nav
      burger.addEventListener('click', () => {
        nav.classList.toggle('nav-active');

        // Animate Links
        navLinks.forEach((link, index) => {
          if (link.style.animation) {
            link.style.animation = '';
          } else {
            link.style.animation = `navLinkFade 0.5s ease forwards ${index / 7 + 0.5}s`;
          }
        });

        // Burger animation
        burger.classList.toggle('toggle');
      });
    };

    navSlide();
  }, []);

  return (
    <div className="App">
      <nav>
        <div className="logo">
          <h4>Rochester Institute of Technology</h4>
        </div>
        <ul className="nav-links">
          <li><a href="#About">About</a></li>
          <li><a href="#Degrees">Degrees</a></li>
          <li><a href="#Employment">Employment</a></li>
          <li><a href="#Faculty">Faculty</a></li>
          <li><a href="#Contact">Contact</a></li>
        </ul>
        <div className="burger">
          <div className="line1"></div>
          <div className="line2"></div>
          <div className="line3"></div>
        </div>
      </nav>
    </div>
  );
};

export default ResponsiveNavbar;
