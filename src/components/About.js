import React, { useEffect, useRef, useState } from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import gearsLoading from "./gears.gif";
import axios from "axios";
import "./About.css";

const About = () => {
  const [about, setAbout] = useState({});
  const [loaded, setLoaded] = useState(false);
  const [animationComplete, setAnimationComplete] = useState(false);
  const aboutBoxRef = useRef(null);

  useEffect(() => {
    axios
      .get("https://people.rit.edu/~dsbics/proxy/https://ischool.gccis.rit.edu/api/about")
      .then((response) => {
        setAbout(response.data);
        setLoaded(true);
      });
  }, []);

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
