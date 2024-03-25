import React, { Component } from 'react';
import './ProgressBar.css';

class ProgressBar extends Component {
  state = {
    scrollProgress: 0
  };

  componentDidMount() {
    window.addEventListener('scroll', this.handleScroll);
  }

  componentWillUnmount() {
    window.removeEventListener('scroll', this.handleScroll);
  }

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

export default ProgressBar;
