import '@fortawesome/fontawesome-free/css/all.min.css';
import React from 'react';
import './Footer.css';
/**
 * Footer component that displays the footer section of the webpage.
 * @component
 */
export default class Footer extends React.Component {
    /**
     * Renders the Footer component.
     * @returns {JSX.Element} The JSX element representing the Footer component.
     */
    render() {
        return (
            <footer>
                <div className="footer">
                    <div className="row">
                        <a href="https://www.facebook.com/ritcroatia/" target='_blank'><i className="fab fa-facebook"></i></a>
                        <a href="https://www.instagram.com/rit_croatia/" target='_blank'><i className="fab fa-instagram"></i></a>
                        <a href="https://www.youtube.com/channel/UC37ArmUsdasXOeY5lylV_8g" target='_blank'><i className="fab fa-youtube"></i></a>
                        <a href="https://twitter.com/ritcroatia" target='_blank'><i className="fab fa-twitter"></i></a>
                    </div>

                    <div className="row">
                        <ul>
                            <li><a href="mailto:admissions@croatia.rit.edu">Contact us</a></li>
                            <li><a href="https://www.rit.edu/croatia/services-and-support" target='_blank'>Our Services</a></li>
                            <li><a href="https://www.rit.edu/privacy-statement#:~:text=We%20will%20collect%20your%20personal,whom%20RIT%20contracts%20for%20services." target='_blank'>Privacy Policy</a></li>
                            <li><a href="https://www.rit.edu/croatia/sites/rit.edu.croatia/files/docs/Student%20Handbook%202023-24.pdf" target='_blank'>Terms & Conditions</a></li>
                            <li><a href="https://www.rit.edu/croatia/careers-rit-croatia" target='_blank'>Career</a></li>
                        </ul>
                    </div>

                    <div className="row">
                        RIT Copyright © 2024 Janko Leskovac - All rights reserved
                    </div>
                </div>
            </footer>
        );
    }
}
