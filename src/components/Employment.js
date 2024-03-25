import React from 'react';
import axios from 'axios';
import './Employment.css';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

class Employment extends React.Component {
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
      isMobile: window.innerWidth <= 768
    };
    this.entriesPerPage = 5;
  }

  componentDidMount() {
    this.fetchEmploymentData();
    this.fetchCoopData();
    window.addEventListener("resize", this.handleWindowSizeChange);
  }

  componentWillUnmount() {
    window.removeEventListener("resize", this.handleWindowSizeChange);
  }

  handleWindowSizeChange = () => {
    this.setState({ isMobile: window.innerWidth <= 768 });
  };

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
      const response = await axios.get("https://people.rit.edu/~dsbics/proxy/https://ischool.gccis.rit.edu/api/employment/employmentTable");
      const data = response.data;

      if (data && data.employmentTable && data.employmentTable.professionalEmploymentInformation) {
        const employmentTableData = data.employmentTable.professionalEmploymentInformation;
        this.setState({ employmentData: employmentTableData, loadingEmployment: false });

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
      const response = await axios.get("https://people.rit.edu/~dsbics/proxy/https://ischool.gccis.rit.edu/api/employment/coopTable/coopInformation");
      const data = response.data;

      if (data && data.coopInformation) {
        this.setState({ coopData: data.coopInformation, loadingCoop: false });

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

  handleEmploymentPageChange = newPage => {
    this.setState({ employmentCurrentPageNum: newPage });
  };

  handleCoopPageChange = newPage => {
    this.setState({ coopCurrentPageNum: newPage });
  };

  renderTableHeading = (data) => {
    if (data.length === 0) return null;

    return (
      <TableHead className="table-head">
        <TableRow>
          {Object.keys(data[0]).map(key => (
            <TableCell key={key}>{key.toUpperCase()}</TableCell>
          ))}
        </TableRow>
      </TableHead>
    );
  };

  renderTableRows = (data, currentPageNum) => {
    const startIndex = (currentPageNum - 1) * this.entriesPerPage;
    const endIndex = Math.min(startIndex + this.entriesPerPage, data.length);

    return (
      <TableBody>
        {data.slice(startIndex, endIndex).map((entry, index) => (
          <TableRow key={`${entry.employer}_${index}`}>
            {Object.values(entry).map((value, index) => (
              <TableCell key={index}>{value}</TableCell>
            ))}
          </TableRow>
        ))}
      </TableBody>
    );
  };

  render() {
    const { employmentData, coopData, employmentCurrentPageNum, employmentTotalPages, coopCurrentPageNum, coopTotalPages, loadingEmployment, loadingCoop, isMobile } = this.state;

    return (
      <div>
        <div className="employment-table-container">
          <h2 className='header'>Professional Employment Information</h2>
          <div style={{ marginLeft: isMobile ? '10px' : '0', marginRight: isMobile ? '10px' : '0' }}>
            {loadingEmployment ? (
              <div>Loading employment data...</div>
            ) : (
              <TableContainer component={Paper}>
                <Table size={isMobile ? 'small' : 'medium'}>
                  {this.renderTableHeading(employmentData)}
                  {this.renderTableRows(employmentData, employmentCurrentPageNum)}
                </Table>
              </TableContainer>
            )}
          </div>
          <div className="pagination">
            <button disabled={employmentCurrentPageNum === 1} onClick={() => this.handleEmploymentPageChange(employmentCurrentPageNum - 1)}>
              Prev
            </button>
            <span className='margin'>Page {employmentCurrentPageNum} of {employmentTotalPages}</span>
            <button disabled={employmentCurrentPageNum === employmentTotalPages} onClick={() => this.handleEmploymentPageChange(employmentCurrentPageNum + 1)}>
              Next
            </button>
          </div>
        </div>

        <div className="coop-table-container">
          <h2 className='header'>Co-op Table</h2>
          <div style={{ marginLeft: isMobile ? '10px' : '0', marginRight: isMobile ? '10px' : '0' }}>
            {loadingCoop ? (
              <div>Loading co-op data...</div>
            ) : (
              <TableContainer component={Paper}>
                <Table size={isMobile ? 'small' : 'medium'}>
                  {this.renderTableHeading(coopData)}
                  {this.renderTableRows(coopData, coopCurrentPageNum)}
                </Table>
              </TableContainer>
            )}
          </div>
          <div className="pagination">
            <button disabled={coopCurrentPageNum === 1} onClick={() => this.handleCoopPageChange(coopCurrentPageNum - 1)}>
              Prev
            </button>
            <span className='margin'>Page {coopCurrentPageNum} of {coopTotalPages}</span>
            <button disabled={coopCurrentPageNum === coopTotalPages} onClick={() => this.handleCoopPageChange(coopCurrentPageNum + 1)}>
              Next
            </button>
          </div>
        </div>
      </div>
    );
  }
}

export default Employment;
