import React, { Component } from 'react';
import './ProgressBar.css';

/**
 * ProgressBar component representing a scroll progress bar.
 * @component
 */
export default class ProgressBar extends Component {
  /**
   * Initializes the scroll progress state and adds scroll event listener.
   */
  componentDidMount() {
    window.addEventListener('scroll', this.handleScroll);
  }

  /**
   * Removes scroll event listener on component unmount.
   */
  componentWillUnmount() {
    window.removeEventListener('scroll', this.handleScroll);
  }

  /**
   * Updates the scroll progress state based on the scroll position.
   */
  handleScroll = () => {
    const windowHeight = window.innerHeight;
    const scrollHeight = document.documentElement.scrollHeight - windowHeight;
    const scrollTop = window.scrollY || document.documentElement.scrollTop;
    const progress = (scrollTop / scrollHeight) * 100;
    this.setState({ scrollProgress: progress });
  };

  /**
   * Renders the ProgressBar component.
   * @returns {JSX.Element} The JSX element representing the ProgressBar component.
   */
  render() {
    const { scrollProgress } = this.state;
    return (
      <div className="progress-container">
        <div className="progress-bar" style={{ width: `${scrollProgress}%` }}></div>
      </div>
    );
  }
}
