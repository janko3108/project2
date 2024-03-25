import React from "react";
import axios from 'axios';
import loading from "./gears.gif";
import "./Faculty.css";
import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';
import ImageListItemBar from '@mui/material/ImageListItemBar';
import ListSubheader from '@mui/material/ListSubheader';
import IconButton from '@mui/material/IconButton';
import InfoIcon from '@mui/icons-material/Info';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import Button from '@mui/material/Button';
import CloseIcon from '@mui/icons-material/Close';
import Typography from '@mui/material/Typography';

export default class Faculty extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      facultyMembers: [],
      loadingFaculty: true,
      selectedMember: null,
      isMobile: false
    };
  }

  componentDidMount() {
    this.fetchFacultyMembers();
    window.addEventListener('resize', this.handleResize);
    this.handleResize();
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.handleResize);
  }

  handleResize = () => {
    const isMobile = window.innerWidth < 600;
    this.setState({ isMobile });
  }

  fetchFacultyMembers = async () => {
    try {
      const response = await axios.get(
        `https://people.rit.edu/~dsbics/proxy/https://ischool.gccis.rit.edu/api/people/faculty`
      );
      const data = response.data;
      const first32FacultyMembers = data.faculty.slice(0, 32);
      this.setState({
        facultyMembers: first32FacultyMembers,
        loadingFaculty: false,
      });
    } catch (error) {
      console.error("Error fetching faculty members:", error);
      this.setState({ loadingFaculty: false });
    }
  };

  handleReadMore = (member) => {
    this.setState({ selectedMember: member });
  };

  handleClose = () => {
    this.setState({ selectedMember: null });
  };

  render() {
    const { facultyMembers, loadingFaculty, selectedMember, isMobile } = this.state;

    return (
      <div className="faculty-container">
        <h1 className="styledHeader">Faculty Members</h1>
        {loadingFaculty ? (
          <div className="loading-container">
            <img src={loading} alt="loading" />
          </div>
        ) : (
          <>
            <ImageList
              sx={{ width: '100%', height: isMobile ? 700 : 600 }} 
              cols={isMobile ? 2 : 4} 
              rowHeight={isMobile ? 200 : 300} 
              gap={20}
            >
              {facultyMembers.map((member, index) => (
                <ImageListItem key={index}>
                  <img
                    src={member.imagePath}
                    alt={member.name}
                    loading="lazy"
                    style={{ height: '100%', width: '100%', objectFit: 'cover' }} 
                  />
                  <ImageListItemBar
                    title={member.name}
                    subtitle={member.title}
                    actionIcon={
                      <IconButton
                        sx={{ color: 'rgba(255, 255, 255, 0.54)' }}
                        aria-label={`info about ${member.name}`}
                        onClick={() => this.handleReadMore(member)}
                      >
                        <InfoIcon />
                      </IconButton>
                    }
                  />
                </ImageListItem>
              ))}
            </ImageList>
          </>
        )}

        <Dialog open={selectedMember !== null} onClose={this.handleClose}>
          <DialogTitle>{selectedMember && selectedMember.name}</DialogTitle>
          <DialogContent>
            {selectedMember && (
              <>
                <Typography gutterBottom>Title: {selectedMember.title}</Typography>
                <Typography gutterBottom>Interest Area: {selectedMember.interestArea}</Typography>
                <Typography gutterBottom>Office: {selectedMember.office}</Typography>
                <Typography gutterBottom>Website: {selectedMember.website}</Typography>
                <Typography gutterBottom>Phone: {selectedMember.phone}</Typography>
                <Typography gutterBottom>Email: {selectedMember.email}</Typography>
              </>
            )}
          </DialogContent>
          <DialogActions>
            <Button onClick={this.handleClose} autoFocus>
              Close
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    );
  }
}
