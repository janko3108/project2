import React from 'react';
import './Employment.css';

export default class Employment extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      employmentData: [],
      coopData: [],
      employmentCurrentPageNum: 1,
      employmentTotalPages: 0,
      coopCurrentPageNum: 1,
      coopTotalPages: 0,
      loadingEmployment: true,
      loadingCoop: true,
    };
  }

  componentDidMount() {
    this.fetchEmploymentData();
    this.fetchCoopData();
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevState.employmentCurrentPageNum !== this.state.employmentCurrentPageNum) {
      this.fetchEmploymentData();
    }
    if (prevState.coopCurrentPageNum !== this.state.coopCurrentPageNum) {
      this.fetchCoopData();
    }
  }

  fetchEmploymentData = async () => {
    try {
      const response = await fetch("https://people.rit.edu/~dsbics/proxy/https://ischool.gccis.rit.edu/api/employment/employmentTable");
      const data = await response.json();

      if (data && data.employmentTable && data.employmentTable.professionalEmploymentInformation) {
        const employmentTableData = data.employmentTable.professionalEmploymentInformation;
        this.setState({ employmentData: employmentTableData, loadingEmployment: false });

        // Calculate total pages based on the length of the data array
        const total = Math.ceil(employmentTableData.length / this.entriesPerPage);
        this.setState({ employmentTotalPages: total });
      } else {
        console.error("Invalid API response structure for Employment Table. Check the API response format.");
      }
    } catch (error) {
      console.error("Error fetching employment data:", error);
      this.setState({ loadingEmployment: false });
    }
  };

  fetchCoopData = async () => {
    try {
      const response = await fetch("https://people.rit.edu/~dsbics/proxy/https://ischool.gccis.rit.edu/api/employment/coopTable/coopInformation");
      const data = await response.json();
  
      if (data && data.coopInformation) {
        this.setState({ coopData: data.coopInformation, loadingCoop: false });

        // Calculate total pages based on the length of the data array
        const total = Math.ceil(data.coopInformation.length / this.entriesPerPage);
        this.setState({ coopTotalPages: total });
      } else {
        throw new Error("Invalid API response format for Co-op Table. Check the API response format.");
      }
    } catch (error) {
      console.error("Error fetching co-op data:", error);
      this.setState({ loadingCoop: false });
    }
  };
  
  
  

  entriesPerPage = 5; // Set the number of entries to display per page

  renderEmploymentTableHeading() {
    const { employmentData } = this.state;

    if (employmentData.length === 0) return null;

    return (
      <thead className="table-head">
        <tr>
          {Object.keys(employmentData[0]).map(key => (
            <th key={key}>{key.toUpperCase()}</th>
          ))}
        </tr>
      </thead>
    );
  }

  renderEmploymentTableRows() {
    const { employmentData, employmentCurrentPageNum } = this.state;
    const startIndex = (employmentCurrentPageNum - 1) * this.entriesPerPage;
    const endIndex = Math.min(startIndex + this.entriesPerPage, employmentData.length);
  
    return (
      <tbody>
        {employmentData.slice(startIndex, endIndex).map((entry, index) => (
          <tr key={`${entry.employer}_${index}`}>
            {Object.values(entry).map((value, index) => (
              <td key={index}>{value}</td>
            ))}
          </tr>
        ))}
      </tbody>
    );
  }

  renderCoopTableHeading() {
    const { coopData } = this.state;

    if (coopData.length === 0) return null;

    return (
      <thead className="table-head">
        <tr>
          {Object.keys(coopData[0]).map(key => (
            <th key={key}>{key.toUpperCase()}</th>
          ))}
        </tr>
      </thead>
    );
  }

  renderCoopTableRows() {
    const { coopData, coopCurrentPageNum } = this.state;
    const startIndex = (coopCurrentPageNum - 1) * this.entriesPerPage;
    const endIndex = Math.min(startIndex + this.entriesPerPage, coopData.length);
  
    return (
      <tbody>
        {coopData.slice(startIndex, endIndex).map((entry, index) => (
          <tr key={`${entry.employer}_${index}`}>
            {Object.values(entry).map((value, index) => (
              <td key={index}>{value}</td>
            ))}
          </tr>
        ))}
      </tbody>
    );
  }
  

  handleEmploymentPageChange = newPage => {
    this.setState({ employmentCurrentPageNum: newPage });
  };

  handleCoopPageChange = newPage => {
    this.setState({ coopCurrentPageNum: newPage });
  };

  render() {
    const { employmentCurrentPageNum, employmentTotalPages, coopCurrentPageNum, coopTotalPages, loadingEmployment, loadingCoop } = this.state;

    return (
      <div>
        <div className="employment-table-container">
          <h2>Professional Employment Information</h2>
          {loadingEmployment ? (
            <div>Loading employment data...</div>
          ) : (
            <table>
              {this.renderEmploymentTableHeading()}
              {this.renderEmploymentTableRows()}
            </table>
          )}

          <div className="pagination">
            <button disabled={employmentCurrentPageNum === 1} onClick={() => this.handleEmploymentPageChange(employmentCurrentPageNum - 1)}>
              Prev
            </button>
            <span>Page {employmentCurrentPageNum} of {employmentTotalPages}</span>
            <button disabled={employmentCurrentPageNum === employmentTotalPages} onClick={() => this.handleEmploymentPageChange(employmentCurrentPageNum + 1)}>
              Next
            </button>
          </div>
        </div>

        <div className="coop-table-container">
          <h2>Co-op Table</h2>
          {loadingCoop ? (
            <div>Loading co-op data...</div>
          ) : (
            <table>
              {this.renderCoopTableHeading()}
              {this.renderCoopTableRows()}
            </table>
          )}

          <div className="pagination">
            <button disabled={coopCurrentPageNum === 1} onClick={() => this.handleCoopPageChange(coopCurrentPageNum - 1)}>
              Prev
            </button>
            <span>Page {coopCurrentPageNum} of {coopTotalPages}</span>
            <button disabled={coopCurrentPageNum === coopTotalPages} onClick={() => this.handleCoopPageChange(coopCurrentPageNum + 1)}>
              Next
            </button>
          </div>
        </div>
      </div>
    );
  }
}

