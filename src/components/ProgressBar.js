import React, { Component } from 'react';
import './ProgressBar.css';

/**
 * ProgressBar component displays a progress bar indicating the scroll progress of the page.
 */
export default class ProgressBar extends Component {
  state = {
    scrollProgress: 0
  };

  componentDidMount() {
    window.addEventListener('scroll', this.handleScroll);
  }

  componentWillUnmount() {
    window.removeEventListener('scroll', this.handleScroll);
  }

  /**
   * Event handler for the scroll event.
   * Calculates the scroll progress and updates the state.
   */
  handleScroll = () => {
    const windowHeight = window.innerHeight;
    const scrollHeight = document.documentElement.scrollHeight - windowHeight;
    const scrollTop = window.scrollY || document.documentElement.scrollTop;
    const progress = (scrollTop / scrollHeight) * 100;
    this.setState({ scrollProgress: progress });
  };

  render() {
    const { scrollProgress } = this.state;
    return (
      <div className="progress-container">
        <div className="progress-bar" style={{ width: `${scrollProgress}%` }}></div>
      </div>
    );
  }
}
