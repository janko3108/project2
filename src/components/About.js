import React, { useEffect, useRef, useState } from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import gearsLoading from "./gears.gif";
import axios from "axios";
import "./About.css";

/**
 * Functional component representing the About section of the application.
 * @returns {JSX.Element} JSX element representing the About section.
 */
const About = () => {
  /**
   * State variable to store information about the about section.
   * @type {[object, Function]} about - A tuple containing the about data object and its setter function.
   */
  const [about, setAbout] = useState({});

  /**
   * State variable to track whether the about section is loaded.
   * @type {[boolean, Function]} loaded - A tuple containing the loading state and its setter function.
   */
  const [loaded, setLoaded] = useState(false);

  /**
   * State variable to track whether the animation is complete.
   * @type {[boolean, Function]} animationComplete - A tuple containing the animation state and its setter function.
   */
  const [animationComplete, setAnimationComplete] = useState(false);

  /**
   * Reference to the about box element.
   * @type {React.MutableRefObject<null>}
   */
  const aboutBoxRef = useRef(null);

  /**
   * Effect hook to fetch data from the API and update state.
   */
  useEffect(() => {
    axios
      .get("https://people.rit.edu/~dsbics/proxy/https://ischool.gccis.rit.edu/api/about")
      .then((response) => {
        setAbout(response.data);
        setLoaded(true);
      });
  }, []);

  /**
   * Effect hook to observe the about box for intersection and toggle classes.
   */
  useEffect(() => {
    const options = {
      root: null,
      rootMargin: "0px",
      threshold: 0,
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("show");
        } else {
          entry.target.classList.remove("show");
        }
      });
    }, options);

    observer.observe(aboutBoxRef.current);

    return () => {
      observer.disconnect();
    };
  }, []);

  /**
   * Handler function called when the animation ends.
   */
  const handleAnimationEnd = () => {
    setAnimationComplete(true);
  };

  return (
    <Box className="about-container">
      <Box className={`about-box ${!loaded || animationComplete ? "show" : "hidden"}`} ref={aboutBoxRef} onAnimationEnd={handleAnimationEnd}>
        <Typography variant="h1" gutterBottom>
          About
        </Typography>
        {loaded ? (
          <Box className="about-content">
            <Typography variant="h3" gutterBottom>
              {about.title}
            </Typography>
            <Typography variant="body1" gutterBottom>
              {about.description}
            </Typography>
            <div className="about-quote">
              <Typography variant="body2" className="quote" gutterBottom>
                "{about.quote}"
              </Typography>
              <Typography variant="body2" gutterBottom>
                --{about.quoteAuthor}
              </Typography>
            </div>
          </Box>
        ) : (
          <img src={gearsLoading} alt="loading" className="loading-img" />
        )}
      </Box>
    </Box>
  );
};

export default About;
