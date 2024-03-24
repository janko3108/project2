import React from "react";
import axios from 'axios'; // Import Axios
import loading from "./gears.gif";
import "./Degrees.css";
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { styled } from '@mui/material/styles';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  '& .MuiDialogContent-root': {
    padding: theme.spacing(2),
  },
  '& .MuiDialogActions-root': {
    padding: theme.spacing(1),
  },
}));

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
      dialogOpen: false // Track if dialog is open
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
      const response = await axios.get(
        `https://people.rit.edu/~dsbics/proxy/https://ischool.gccis.rit.edu/api/degrees/undergraduate`
      );
      const data = response.data;
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
      const response = await axios.get(
        `https://people.rit.edu/~dsbics/proxy/https://ischool.gccis.rit.edu/api/degrees/graduate`
      );
      const data = response.data;
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
    this.setState({ selectedDegree: degree, dialogOpen: true });
  };

  handleClose = () => {
    this.setState({ selectedDegree: null, dialogOpen: false });
  };

  render() {
    const { undergraduateDegrees, graduateDegrees, loadingDegrees, selectedDegree, dialogOpen } = this.state;

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
                <Card key={index} sx={{ minWidth: 275, mb: 2 }}>
                  <CardContent>
                    <Typography variant="h5" component="div">
                      {degree.title}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      {degree.description}
                    </Typography>
                  </CardContent>
                  <CardActions>
                    <Button size="small" onClick={() => this.handleReadFull(degree)}>Learn More</Button>
                  </CardActions>
                </Card>
              ))}
            </div>

            <h1>Graduate Degrees</h1>
            <div className="card-category-1">
              {graduateDegrees.map((degree, index) => (
                <Card key={index} sx={{ minWidth: 275, mb: 2 }}>
                  <CardContent>
                    <Typography variant="h5" component="div">
                      {degree.title}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      {degree.description}
                    </Typography>
                  </CardContent>
                  <CardActions>
                    <Button size="small" onClick={() => this.handleReadFull(degree)}>Learn More</Button>
                  </CardActions>
                </Card>
              ))}
            </div>
            
            <BootstrapDialog
              onClose={this.handleClose}
              aria-labelledby="customized-dialog-title"
              open={dialogOpen}
            >
              <DialogTitle sx={{ m: 0, p: 2 }} id="customized-dialog-title">
                {selectedDegree && selectedDegree.title} Concentrations
              </DialogTitle>
              <IconButton
                aria-label="close"
                onClick={this.handleClose}
                sx={{
                  position: 'absolute',
                  right: 8,
                  top: 8,
                  color: (theme) => theme.palette.grey[500],
                }}
              >
                <CloseIcon />
              </IconButton>
              <DialogContent dividers>
                {selectedDegree && selectedDegree.concentrations.map((concentration, index) => (
                  <Typography key={index} gutterBottom>{concentration}</Typography>
                ))}
              </DialogContent>
              <DialogActions>
                <Button autoFocus onClick={this.handleClose}>
                  Close
                </Button>
              </DialogActions>
            </BootstrapDialog>
          </>
        )}
      </div>
    );
  }
}
