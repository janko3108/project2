import React from "react";
import axios from 'axios';
import loading from "./gears.gif";
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
import Grid from '@mui/material/Grid';

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  '& .MuiDialogContent-root': {
    padding: theme.spacing(2),
  },
  '& .MuiDialogActions-root': {
    padding: theme.spacing(1),
  },
}));

const LimitedCardContent = styled(CardContent)({
  height: '150px', 
  overflow: 'auto', 
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'center',
  textAlign: 'center',
});

const SmallTypography = styled(Typography)(({ theme }) => ({
  [theme.breakpoints.down('sm')]: {
    fontSize: '0.60rem', 
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
      selectedDegree: null,
      dialogOpen: false
    };
    this.dialogRef = React.createRef();
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

  fetchUndergraduateDegrees = async () => {
    try {
      const response = await axios.get(
        `https://people.rit.edu/~dsbics/proxy/https://ischool.gccis.rit.edu/api/degrees/undergraduate`
      );
      const data = response.data;
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
      <Grid container spacing={{ xs: 2, md: 3 }} columns={{ xs: 4, sm: 8, md: 12 }} sx={{ flexGrow: 1 }}>
        {loadingDegrees ? (
          <Grid item xs={12}>
            <div>
              <img src={loading} alt="loading" />
            </div>
          </Grid>
        ) : (
          <>
            <Grid item xs={12} sx={{ textAlign: 'center', backgroundColor: '#ffffff', padding: '20px' }}>
              <Typography variant="h4" color="black" fontWeight="bold">Degrees</Typography>
              
            </Grid>

            
            {undergraduateDegrees.map((degree, index) => (
              <Grid item xs={2} sm={4} md={4} key={index}>
                <Card>
                  <LimitedCardContent>
                    <Typography variant="h6" component="div">
                      {degree.title}
                    </Typography>
                    <SmallTypography variant="body2" color="text.secondary">
                      {degree.description}
                    </SmallTypography>
                  </LimitedCardContent>
                  <CardActions>
                    <Button size="small" onClick={() => this.handleReadFull(degree)}>Learn More</Button>
                  </CardActions>
                </Card>
              </Grid>
            ))}

            {graduateDegrees.map((degree, index) => (
              <Grid item xs={2} sm={4} md={4} key={index}>
                <Card>
                  <LimitedCardContent>
                    <Typography variant="h6" component="div">
                      {degree.title}
                    </Typography>
                    <SmallTypography variant="body2" color="text.secondary">
                      {degree.description}
                    </SmallTypography>
                  </LimitedCardContent>
                  <CardActions>
                    <Button size="small" onClick={() => this.handleReadFull(degree)}>Learn More</Button>
                  </CardActions>
                </Card>
              </Grid>
            ))}
          </>
        )}

        <BootstrapDialog
          onClose={this.handleClose}
          aria-labelledby="customized-dialog-title"
          open={dialogOpen}
        >
          <DialogTitle id="customized-dialog-title">
            {selectedDegree && selectedDegree.title} Concentrations
          </DialogTitle>
          <DialogContent>
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
      </Grid>
    );
  }
}

