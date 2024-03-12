import React from 'react';
import './ResponsiveNavbar.css';

class ResponsiveNavbar extends React.Component {
  componentDidMount() {
    this.navSlide();
  }

  componentWillUnmount() {
    const burger = document.querySelector('.burger');
    const navLinks = document.querySelectorAll('.nav-links a');
    
    burger.removeEventListener('click', this.handleBurgerClick);
    
    navLinks.forEach(link => {
      link.removeEventListener('click', this.handleLinkClick);
    });
  }

  handleBurgerClick = () => {
    const nav = document.querySelector('.nav-links');
    const navLinks = document.querySelectorAll('.nav-links li');
    const burger = document.querySelector('.burger');

    // Toggle Nav
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

    // Toggle body class to disable scrolling
    document.body.classList.toggle('nav-open');
  };

  handleLinkClick = () => {
    // Close the burger menu when a link is clicked
    this.handleBurgerClick();
  };

  navSlide = () => {
    const burger = document.querySelector('.burger');
    const navLinks = document.querySelectorAll('.nav-links a');
    
    burger.addEventListener('click', this.handleBurgerClick);
    
    navLinks.forEach(link => {
      link.addEventListener('click', this.handleLinkClick);
    });
  };

  render() {
    return (
      <div className="App">
        <nav>
          <div className="logo">
            <img className='logo-img' src={require("../assets/images/rit.png")} alt="Tiger logo" />
            <h4 className='logo-text'>Rochester Institute of Technology</h4>
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
  }
}

export default ResponsiveNavbar;
