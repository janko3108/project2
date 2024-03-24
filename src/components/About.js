import React from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import gearsLoading from "./gears.gif";
import axios from "axios";
import "./About.css";

export default class About extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      about: {},
      loaded: false,
    };
  }

  componentDidMount() {
    axios
      .get("https://people.rit.edu/~dsbics/proxy/https://ischool.gccis.rit.edu/api/about")
      .then((response) => {
        this.setState({ about: response.data, loaded: true });
      });
  }

  render() {
    const { about, loaded } = this.state;

    let content;
    if (!loaded) {
      content = <img src={gearsLoading} alt="loading" className="loading-img" />;
    } else {
      content = (
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
      );
    }

    return (
      <Box className="about-container">
        <Box className="about-box">
          <Typography variant="h1" gutterBottom>
            About
          </Typography>
          {content}
        </Box>
      </Box>
    );
  }
}
