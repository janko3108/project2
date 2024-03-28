import React from 'react';
import './Header.css';

/**
 * Header component that displays the header section of the webpage.
 * @component
 */
export default class Header extends React.Component {
    /**
     * Renders the Header component.
     * @returns {JSX.Element} The JSX element representing the Header component.
     */
    render() {
        return (
            <header id="home" className="indexHeader">
                <h2>Rochester Institute of Technology</h2>
                <p>The making of a living and the living of a life</p>
            </header>
        );
    }
}
