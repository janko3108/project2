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

/**
 * Styled dialog component with customized styles.
 * @type {import('@mui/material').StyledComponent<typeof Dialog>}
 */
const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  '& .MuiDialogContent-root': {
    padding: theme.spacing(2),
  },
  '& .MuiDialogActions-root': {
    padding: theme.spacing(1),
  },
}));

/**
 * Styled card content component with limited height and overflow.
 * @type {import('@mui/material').StyledComponent<typeof CardContent>}
 */
const LimitedCardContent = styled(CardContent)({
  height: '150px',
  overflow: 'auto',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'center',
  textAlign: 'center',
});

/**
 * Styled typography component with reduced font size for small screens.
 * @type {import('@mui/material').StyledComponent<typeof Typography>}
 */
const SmallTypography = styled(Typography)(({ theme }) => ({
  [theme.breakpoints.down('sm')]: {
    fontSize: '0.60rem',
  },
}));

/**
 * Class component representing the Degrees section of the application.
 * @extends React.Component
 */
export default class Degrees extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      undergraduateDegrees: [],
      graduateDegrees: [],
      loadingDegrees: true,
      selectedDegree: null,
      dialogOpen: false
    };
    /**
     * Reference to the dialog component.
     * @type {React.MutableRefObject<null>}
     */
    this.dialogRef = React.createRef();
  }

  componentDidMount() {
    this.fetchDegrees();
  }

  /**
   * Fetches undergraduate and graduate degrees data from the API.
   * @async
   */
  fetchDegrees = async () => {
    try {
      const [undergraduateResponse, graduateResponse] = await Promise.all([
        axios.get(`https://people.rit.edu/~dsbics/proxy/https://ischool.gccis.rit.edu/api/degrees/undergraduate`),
        axios.get(`https://people.rit.edu/~dsbics/proxy/https://ischool.gccis.rit.edu/api/degrees/graduate`)
      ]);
      const undergraduateData = undergraduateResponse.data;
      const graduateData = graduateResponse.data;

      const first5UndergraduateDegrees = undergraduateData.undergraduate.slice(0, 3);
      const graduateDegrees = graduateData.graduate.filter(degree => degree.degreeName !== 'graduate advanced certificates');

      const certificates = graduateData.graduate.find(degree => degree.degreeName === 'graduate advanced certificates');
      if (certificates) {
        graduateDegrees.push(certificates);
      }

      this.setState({
        undergraduateDegrees: first5UndergraduateDegrees,
        graduateDegrees: graduateDegrees,
        loadingDegrees: false,
      });
    } catch (error) {
      console.error("Error fetching degrees:", error);
      this.setState({ loadingDegrees: false });
    }
  };

  /**
   * Handles the action when clicking the "Learn More" button.
   * @param {object} degree - The degree object.
   */
  handleReadFull = (degree) => {
    this.setState({ selectedDegree: degree, dialogOpen: true });
  };

  /**
   * Closes the dialog.
   */
  handleClose = () => {
    this.setState({ selectedDegree: null, dialogOpen: false });
  };

  /**
   * Handles the action when clicking the funny button.
   */
  handleFunny = () => {
    window.location.href = 'https://www.youtube.com/watch?v=dQw4w9WgXcQ';
  };

  render() {
    const { undergraduateDegrees, graduateDegrees, loadingDegrees, selectedDegree, dialogOpen } = this.state;
    return (
      <Grid container spacing={2} columns={{ xs: 12, sm: 12, md: 12 }} sx={{ flexGrow: 1 }} >
        {loadingDegrees ? (
          <Grid item xs={12}>
            <div>
              <img src={loading} alt="loading" />
            </div>
          </Grid>
        ) : (
          <>
            <Grid item xs={12} sx={{ textAlign: 'center' }}>
              <Typography variant="h6" color="black" fontWeight="bold">Undergraduate Degrees</Typography>
            </Grid>
            {undergraduateDegrees.map((degree, index) => (
              <Grid item xs={4} sm={4} md={4} lg={12} key={index} sx={{ display: 'flex', justifyContent: 'center' }}>
                <Card sx={{ maxWidth: 600, margin: 'auto', height: '100%' }}>
                  <LimitedCardContent>
                    <Typography variant="h6" sx={{
                      fontSize: '0.95rem',
                    }} component="div">
                      {degree.title}
                    </Typography>
                    <SmallTypography variant="body2" color="text.secondary" sx={{
                      fontSize: '0.95rem',
                    }}>
                      {degree.description}
                    </SmallTypography>
                  </LimitedCardContent>
                  <CardActions>
                    <Button size="small" sx={{
                      minWidth: 0,
                      padding: '0px 0px',
                      fontSize: '0.65rem',
                    }} onClick={() => this.handleReadFull(degree)}>Learn More</Button>
                  </CardActions>
                </Card>
              </Grid>
            ))}

            < Grid item xs={12} sx={{ textAlign: 'center' }}>
              <Typography variant="h6" color="black" fontWeight="bold">Graduate Degrees</Typography>
            </Grid>
            {graduateDegrees.map((degree, index) => (
              <Grid item xs={3} sm={6} md={6} lg={6} key={index} sx={{}}>
                <Card sx={{ maxWidth: 600, margin: 'auto', maxHeight: '100%', overflow: 'auto' }}>
                  <LimitedCardContent>
                    <Typography variant="h6" sx={{
                      fontSize: '0.65rem',
                    }} component="div">
                      {degree.title}
                    </Typography>
                    <SmallTypography variant="body2" color="text.secondary" >
                      {degree.description}
                    </SmallTypography>
                    {degree.degreeName === "graduate advanced certificates" && (
                      <>
                        <Typography variant="h6" sx={{
                          fontSize: '0.65rem',
                        }} component="div">
                          Available Certificates:
                        </Typography>
                        {degree.availableCertificates.map((certificate, idx) => (
                          <Typography key={idx} variant="body2" color="text.secondary" sx={{ fontSize: '0.5rem' }}>
                            {certificate}
                          </Typography>
                        ))}
                      </>
                    )}
                  </LimitedCardContent>
                  <CardActions>
                    {degree.degreeName !== "graduate advanced certificates" && ( // Exclude certificates
                      <Button size="small" sx={{ minWidth: 0, padding: '0px 0px', fontSize: '0.65rem' }} onClick={() => this.handleReadFull(degree)}>Learn More</Button>
                    )}
                    {degree.degreeName === "graduate advanced certificates" && ( // For certificates
                      <Button size="small" sx={{ minWidth: 0, padding: '0px 0px', fontSize: '0.65rem' }} onClick={this.handleFunny}>Click me!</Button>
                    )}
                  </CardActions>
                </Card>
              </Grid>
            ))}
          </>
        )
        }

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
      </Grid >
    );
  }
}
