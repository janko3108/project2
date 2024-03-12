import React from "react";
import loading from "./gears.gif";
import "./Degrees.css";

export default class Degrees extends React.Component {
  
  constructor(props) {
    super(props);
    this.state = {
      undergraduateDegrees: [],
      graduateDegrees: [],
      loadingDegrees: true,
      currentPage: 1,
      totalPages: 1,
      selectedDegree: null, // To track the selected degree
    };
    this.dialogRef = React.createRef(); // Create a reference to the dialog element
  }

  componentDidMount() {
    this.fetchUndergraduateDegrees(this.state.currentPage);
    this.fetchGraduateDegrees();
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevState.currentPage !== this.state.currentPage) {
      this.fetchUndergraduateDegrees(this.state.currentPage);
    }
  }

  fetchUndergraduateDegrees = async (page) => {
    try {
      const response = await fetch(
        `https://people.rit.edu/~dsbics/proxy/https://ischool.gccis.rit.edu/api/degrees/undergraduate?page=${page}`
      );
      const data = await response.json();
      // Get only the first 5 entries
      const first5UndergraduateDegrees = data.undergraduate.slice(0, 5);
      this.setState({
        undergraduateDegrees: first5UndergraduateDegrees,
        totalPages: data.total_pages,
        loadingDegrees: false,
      });
    } catch (error) {
      console.error("Error fetching undergraduate degrees:", error);
      this.setState({ loadingDegrees: false });
    }
  };

  fetchGraduateDegrees = async () => {
    try {
      const response = await fetch(
        `https://people.rit.edu/~dsbics/proxy/https://ischool.gccis.rit.edu/api/degrees/graduate`
      );
      const data = await response.json();
      const first3GraduateDegrees = data.graduate.slice(0, 3);
      this.setState({
        graduateDegrees: first3GraduateDegrees,
        loadingDegrees: false,
      });
    } catch (error) {
      console.error("Error fetching graduate degrees:", error);
      this.setState({ loadingDegrees: false });
    }
  };

  handlePageChange = (newPage) => {
    this.setState({ currentPage: newPage });
  };

  handleReadFull = (degree) => {
    this.setState({ selectedDegree: degree });
    this.dialogRef.current.showModal(); // Open the dialog when a degree is selected
  };

  handleClose = () => {
    this.setState({ selectedDegree: null });
    this.dialogRef.current.close(); 
  };

  render() {
    const { undergraduateDegrees, graduateDegrees, loadingDegrees, currentPage, totalPages, selectedDegree } = this.state;

    return (
      <div className="degrees-container">
        <h1>Undergraduate Degrees</h1>
        {loadingDegrees ? (
          <div className="loading-container">
            <img src={loading} alt="loading" />
          </div>
        ) : (
          <>
            <div className="card-category-1">
              {undergraduateDegrees.map((degree, index) => (
                <div key={index} className={`basic-card basic-card-${index % 4 === 0 ? 'aqua' : (index % 4 === 1 ? 'lips' : (index % 4 === 2 ? 'light' : 'dark'))}`}>
                  <div className="card-content">
                    <span className="card-title">{degree.title}</span>
                    <p className="card-text">{degree.description}</p>
                  </div>
                  <div className="card-link">
                    <button onClick={() => this.handleReadFull(degree)}>Read Full</button>
                  </div>
                </div>
              ))}
            </div>

            <h1>Graduate Degrees</h1>
            <div className="card-category-1">
              {graduateDegrees.map((degree, index) => (
                <div key={index} className={`basic-card basic-card-${index % 4 === 0 ? 'aqua' : (index % 4 === 1 ? 'lips' : (index % 4 === 2 ? 'light' : 'dark'))}`}>
                  <div className="card-content">
                    <span className="card-title">{degree.title}</span>
                    <p className="card-text">{degree.description}</p>
                  </div>
                  <div className="card-link">
                    <button onClick={() => this.handleReadFull(degree)}>Read Full</button>
                  </div>
                </div>
              ))}
            </div>
            
            <dialog ref={this.dialogRef} id="dialog">
              {selectedDegree && (
                <>
                  <h2>{selectedDegree.title} Concentrations</h2>
                  <ul>
                    {selectedDegree.concentrations.map((concentration, index) => (
                      <li key={index}>{concentration}</li>
                    ))}
                  </ul>
                  <button onClick={this.handleClose}>Close</button>
                </>
              )}
            </dialog>
          </>
        )}
      </div>
    );
  }
}

