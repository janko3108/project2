import React from 'react';
import './Navbar.css';
import ProgressBar from './ProgressBar';

/**
 * Navbar component representing the navigation bar of the webpage.
 * @component
 */
export default class Navbar extends React.Component {
  /**
   * Adds event listeners for burger click and link click on component mount.
   */
  componentDidMount() {
    this.navSlide();
  }

  /**
   * Removes event listeners and resets styles on component unmount.
   */
  componentWillUnmount() {
    const burger = document.querySelector('.burger');
    const navLinks = document.querySelectorAll('.nav-links a');

    burger.removeEventListener('click', this.handleBurgerClick);

    navLinks.forEach(link => {
      link.removeEventListener('click', this.handleLinkClick);
    });

    document.body.classList.remove('nav-open');
    document.documentElement.style.overflow = 'auto';
  }

  /**
   * Toggles the navigation menu visibility and animates the burger icon.
   */
  handleBurgerClick = () => {
    const nav = document.querySelector('.nav-links');
    const navLinks = document.querySelectorAll('.nav-links li');
    const burger = document.querySelector('.burger');

    nav.classList.toggle('nav-active');

    navLinks.forEach((link, index) => {
      if (link.style.animation) {
        link.style.animation = '';
      } else {
        link.style.animation = `navLinkFade 0.5s ease forwards ${index / 7 + 0.5}s`;
      }
    });

    burger.classList.toggle('toggle');

    if (window.innerWidth <= 768) {
      document.body.classList.toggle('nav-open');
      if (document.body.classList.contains('nav-open')) {
        document.documentElement.style.overflow = 'hidden';
      } else {
        document.documentElement.style.overflow = 'auto';
      }
    }
  };

  /**
   * Handles click event for links in the navigation menu.
   */
  handleLinkClick = () => {
    this.handleBurgerClick();
  };

  /**
   * Initializes navigation menu animation and click event handling.
   */
  navSlide = () => {
    const burger = document.querySelector('.burger');
    const navLinks = document.querySelectorAll('.nav-links a');

    burger.addEventListener('click', this.handleBurgerClick);

    navLinks.forEach(link => {
      link.addEventListener('click', this.handleLinkClick);
    });
  };

  /**
   * Renders the Navbar component.
   * @returns {JSX.Element} The JSX element representing the Navbar component.
   */
  render() {
    return (
      <div>
        <ProgressBar />
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
      </div>
    );
  }
}
