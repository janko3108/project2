import React, { Component } from 'react';
import axios from 'axios';
import './Employment.css';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import TablePagination from '@mui/material/TablePagination';
import TablePaginationActions from './TablePaginationActions'; // Import your TablePaginationActions component

/**
 * Component for displaying employment and co-op data.
 * @extends React.Component
 */
export default class Employment extends Component {
  /**
   * Constructs a new Employment component.
   * @param {object} props - The component's props.
   */
  constructor(props) {
    super(props);
    this.state = {
      employmentData: [],
      coopData: [],
      employmentCurrentPageNum: 0,
      employmentRowsPerPage: 5,
      coopCurrentPageNum: 0,
      coopRowsPerPage: 5,
      employmentTotalPages: 0,
      coopTotalPages: 0,
      loadingEmployment: true,
      loadingCoop: true,
      isMobile: window.innerWidth <= 768,
    };
    this.entriesPerPage = 5;
    this.debouncedResize = this.debounce(this.handleWindowSizeChange, 300);
  }

  componentDidMount() {
    this.fetchEmploymentData();
    this.fetchCoopData();
    window.addEventListener('resize', this.debouncedResize);
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.debouncedResize);
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevState.employmentCurrentPageNum !== this.state.employmentCurrentPageNum || prevState.employmentRowsPerPage !== this.state.employmentRowsPerPage) {
      this.fetchEmploymentData();
    }
    if (prevState.coopCurrentPageNum !== this.state.coopCurrentPageNum || prevState.coopRowsPerPage !== this.state.coopRowsPerPage) {
      this.fetchCoopData();
    }
  }

  /**
   * Handles changes in window size.
   */
  handleWindowSizeChange = () => {
    this.setState({ isMobile: window.innerWidth <= 768 });
  };

  /**
   * Debounces a function.
   * @param {Function} func - The function to be debounced.
   * @param {number} delay - The delay in milliseconds.
   * @returns {Function} - The debounced function.
   */
  debounce = (func, delay) => {
    let timeoutId;
    return function (...args) {
      clearTimeout(timeoutId);
      timeoutId = setTimeout(() => {
        func.apply(this, args);
      }, delay);
    };
  };

  /**
   * Fetches employment data from the API.
   */
  fetchEmploymentData = async () => {
    try {
      const response = await axios.get("https://people.rit.edu/~dsbics/proxy/https://ischool.gccis.rit.edu/api/employment/employmentTable");
      const data = response.data;

      if (data && data.employmentTable && data.employmentTable.professionalEmploymentInformation) {
        const employmentTableData = data.employmentTable.professionalEmploymentInformation;
        const total = Math.ceil(employmentTableData.length / this.state.employmentRowsPerPage);
        this.setState({ employmentData: employmentTableData, employmentTotalPages: total, loadingEmployment: false });
      } else {
        console.error("Invalid API response structure for Employment Table. Check the API response format.");
      }
    } catch (error) {
      console.error("Error fetching employment data:", error);
      this.setState({ loadingEmployment: false });
    }
  };

  /**
   * Fetches co-op data from the API.
   */
  fetchCoopData = async () => {
    try {
      const response = await axios.get("https://people.rit.edu/~dsbics/proxy/https://ischool.gccis.rit.edu/api/employment/coopTable/coopInformation");
      const data = response.data;

      if (data && data.coopInformation) {
        const total = Math.ceil(data.coopInformation.length / this.state.coopRowsPerPage);
        this.setState({ coopData: data.coopInformation, coopTotalPages: total, loadingCoop: false });
      } else {
        throw new Error("Invalid API response format for Co-op Table. Check the API response format.");
      }
    } catch (error) {
      console.error("Error fetching co-op data:", error);
      this.setState({ loadingCoop: false });
    }
  };

  /**
   * Handles page change for employment table pagination.
   * @param {object} event - The event object.
   * @param {number} newPage - The new page number.
   */
  handleEmploymentPageChange = (event, newPage) => {
    this.setState({ employmentCurrentPageNum: newPage });
  };

  /**
   * Handles page change for co-op table pagination.
   * @param {object} event - The event object.
   * @param {number} newPage - The new page number.
   */
  handleCoopPageChange = (event, newPage) => {
    this.setState({ coopCurrentPageNum: newPage });
  };

  /**
   * Handles rows per page change for employment table.
   * @param {object} event - The event object.
   */
  handleEmploymentRowsPerPageChange = (event) => {
    this.setState({ employmentRowsPerPage: parseInt(event.target.value, 10), employmentCurrentPageNum: 0 });
  };

  /**
   * Handles rows per page change for co-op table.
   * @param {object} event - The event object.
   */
  handleCoopRowsPerPageChange = (event) => {
    this.setState({ coopRowsPerPage: parseInt(event.target.value, 10), coopCurrentPageNum: 0 });
  };

  /**
   * Renders the table heading.
   * @param {Array} data - The data array.
   * @returns {JSX.Element|null} - The JSX element representing the table heading, or null if data is empty.
   */
  renderTableHeading = (data) => {
    if (data.length === 0) return null;

    return (
      <TableHead className="table-head">
        <TableRow>
          {Object.keys(data[0]).map((key, index) => (
            <TableCell key={index}>{key.toUpperCase()}</TableCell>
          ))}
        </TableRow>
      </TableHead>
    );
  };

  /**
   * Renders the table rows.
   * @param {Array} data - The data array.
   * @param {number} currentPageNum - The current page number.
   * @param {number} rowsPerPage - The number of rows per page.
   * @returns {JSX.Element} - The JSX element representing the table rows.
   */
  renderTableRows = (data, currentPageNum, rowsPerPage) => {
    const startIndex = currentPageNum * rowsPerPage;
    const endIndex = Math.min(startIndex + rowsPerPage, data.length);

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

  /**
   * Renders the Employment component.
   * @returns {JSX.Element} - The JSX element representing the Employment component.
   */
  render() {
    const { employmentData, coopData, employmentCurrentPageNum, employmentRowsPerPage, coopCurrentPageNum, coopRowsPerPage, loadingEmployment, loadingCoop, isMobile } = this.state;

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
                  {this.renderTableRows(employmentData, employmentCurrentPageNum, employmentRowsPerPage)}
                </Table>
              </TableContainer>
            )}
          </div>
          <div className="pagination">
            <TablePagination className='pagination'
              rowsPerPageOptions={[5, 10, 25, { label: 'All', value: -1 }]}
              component="div"
              count={employmentData.length}
              rowsPerPage={employmentRowsPerPage}
              page={employmentCurrentPageNum}
              onPageChange={this.handleEmploymentPageChange}
              onRowsPerPageChange={this.handleEmploymentRowsPerPageChange}
              ActionsComponent={TablePaginationActions}
              labelRowsPerPage={<span style={{ color: 'white' }}>Rows per page:</span>}
              slotProps={{
                select: {
                  inputProps: {
                    'aria-label': 'rows per page',
                    style: { color: 'black' },
                  },
                  native: true,
                },
                caption: {
                  style: { color: 'white' },
                },
              }}
            />
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
                  {this.renderTableRows(coopData, coopCurrentPageNum, coopRowsPerPage)}
                </Table>
              </TableContainer>
            )}
          </div>
          <div className="pagination">
            <TablePagination className='pagination'
              rowsPerPageOptions={[5, 10, 25, { label: 'All', value: -1 }]}
              component="div"
              count={employmentData.length}
              rowsPerPage={employmentRowsPerPage}
              page={employmentCurrentPageNum}
              onPageChange={this.handleEmploymentPageChange}
              onRowsPerPageChange={this.handleEmploymentRowsPerPageChange}
              ActionsComponent={TablePaginationActions}
              labelRowsPerPage={<span style={{ color: 'white' }}>Rows per page:</span>}
              slotProps={{
                select: {
                  inputProps: {
                    'aria-label': 'rows per page',
                    style: { color: 'black' },
                  },
                  native: true,
                },
                caption: {
                  style: { color: 'white' },
                },
              }}
            />
          </div>
        </div>
      </div>
    );
  }
}

