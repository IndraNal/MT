import React, {Component} from "react";
import Wrapper from "../Components/Wrapper/index"
import {Welcome} from "../Components/Banner/index"
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import "./style.css";
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import API from '../utils/API'
import  { List, ListItem } from "../Components/List/List";
import TPList, { TPItem } from "../Components/Dropdowns/index"
import TripLog from "../Components/Trip Log/index"

    const styles = theme => ({
      root: {
        flexGrow: 1,
      },
      paper: {
        padding: theme.spacing.unit * 2,
        textAlign: 'center',
        color: theme.palette.text.secondary,
      },
    });


class UserPage extends Component {

  state = {
    open: false,
    open1: false,
    nickname: "",
    model: "", 
    year: "",
    plate: "",
    initialMileage: "",
    oilMileage: "",
    filterMileage: "",
    tireMileage: "", 
    batMileage: "",
    brakeMileage: "",
    startingMileage: "",
    startingAddress: "",
    endAddress: "",
    totalmiles: "",
    mileageType: "",
    CarName: [],
    TripType: []
  };

  componentDidMount() {
    this.loadCars();
    this.loadTripTypes();
  }

  loadCars = () => {
    API.getCarName()
    .then(res => this.setState({CarName: res.data}))
    .catch(err => console.log(err));
  }

  loadTripTypes = () => {
    API.getTripType()
    .then(res => this.setState({TripType: res.data}))
    .catch(err => console.log(err));
  }

  handleClickOpen = () => {
    this.setState({ open: true });
  };

  handleClose = () => {
    this.setState({ open: false });
  };

  handleClickOpen1 = () => {
    this.setState({ open1: true });
  };

  handleClose1 = () => {
    this.setState({ open1: false });
  };

  handleInputChange = event => {
    const { name, value } = event.target;
    this.setState({
      [name]: value
    });
  };

  handleFormSubmit = event => {
    event.preventDefault();
        this.setState({ open: false });
      API.saveCar({
        nickname: this.state.nickname,
        plate: this.state.plate,
        initialMileage: this.state.initialMileage,
        oilMileage: this.state.oilMileage,
        filterMileage: this.state.filterMileage,
        tireMileage: this.state.tireMileage, 
        batMileage: this.state.batMileage,
        brakeMileage: this.state.brakeMileage
      })
        .then(res => this.loadCars())
        .catch(err => console.log(err));
  };
  handleFormSubmit2 = event => {
    event.preventDefault();
        this.setState({ open1: false });
      API.saveTrip({
        date: this.state.date,
        totalmiles: this.state.totalmiles
      })
        .then(res => this.loadTripTypes())
        .catch(err => console.log(err));
  };

  // When this component mounts, grab the book with the _id of this.props.match.params.id
  // e.g. localhost:3000/books/599dcb67f0f16317844583fc

render() {    

    const { classes } = this.props;
  return (

<div>
        <Wrapper>
        <Welcome />
        {this.state.CarName.length ? (
        <List> 
      {this.state.CarName.map(car => (
        <ListItem className="pure-menu-item pure-menu-selected pure-menu-link" key={car.id}>{car.nickname} </ListItem> 
     ))}       
          <Button variant="outlined" className="addCar" color="primary" onClick={this.handleClickOpen}>
          Add a Car 
        </Button>   
  </List>
  ) : (
    <div>
    <h3> Add a car to your Account: </h3>
    <Button className="addCar" variant="outlined" color="primary" onClick={this.handleClickOpen}>
        Add a Car 
      </Button>
    </div> )
}
     
        
        {/* Add a Car dialog */}

        <Dialog
          open={this.state.open}
          onClose={this.handleClose}
          aria-labelledby="form-dialog-title"
        >


          <DialogTitle id="form-dialog-title">Car</DialogTitle>

          <DialogContent >
            <DialogContentText>
             Add a Car to your profile
            </DialogContentText> 
            <Grid container spacing={24}>
            <Grid item xs={6}>
             <TextField
              autoFocus
              onChange={this.handleInputChange}
              margin="dense"
              id="nickname"
              label="Car Name"
              name="nickname"
              value={this.state.nickname}
              type="text"
              fullWidth
              required
            />
              <TextField
              autoFocus
              onChange={this.handleInputChange}
              margin="dense"
              id="plate"
              label="Plate"
              name="plate"
              value={this.state.plate}
              type="text"
              fullWidth
              required
            />

              <TextField
              autoFocus
              onChange={this.handleInputChange}
              margin="dense"
              id="initial-mileage"
              label="Initial Mileage"
              name="initialMileage"
              value={this.state.initialMileage}
              type="number"
              fullWidth
              required
            />   


              <TextField
              autoFocus
              onChange={this.handleInputChange}
              margin="dense"
              id="Mileage at last oil change"
              label="Mileage at last oil change"
              name="oilMileage"
              value={this.state.oilMileage}
              type="number"
              fullWidth
              required
            /> 
            </Grid>
           <Grid item xs={6}>
          <TextField
              autoFocus
              onChange={this.handleInputChange}
              margin="dense"
              id="Mileage at last air filter change"
              label="Mileage at last air filter change"
              name="filterMileage"
              value={this.state.filterMileage}
              type="number"
              fullWidth
            />
            <TextField
              autoFocus
              onChange={this.handleInputChange}
              margin="dense"
              id="Mileage at last tire rotation"
              label="Mileage at last tire rotation"
              name="tireMileage"
              value={this.state.tireMileage}
              type="number"
              fullWidth
            />
            <TextField
              autoFocus
              onChange={this.handleInputChange}
              margin="dense"
              id="Mileage at last battery change"
              label="Mileage at last battery change"
              name="batMileage"
              value={this.state.batMileage}
              type="number"
              fullWidth
            />
             <TextField
              autoFocus
              onChange={this.handleInputChange}
              margin="dense"
              id="Mileage at last break check"
              label="Mileage at last break check"
              name="brakeMileage"
              value={this.state.brakeMileage}
              type="number"
              fullWidth
            /> 
       </Grid>
       </Grid>
       <h6>* is a required field</h6>
          </DialogContent> 
         <DialogActions>   
            <Button onClick={this.handleClose} color="primary">
              Cancel
            </Button>
            <Button className="addCar" onClick={this.handleFormSubmit} color="primary">
              Add Car
            </Button>
          </DialogActions>
        </Dialog>
        <br></br><br></br><br></br>
        <TripLog>

        </TripLog> 
               <Button variant="outlined" color="primary" onClick={this.handleClickOpen1}>
          Add a Trip 
        </Button>
        {/* Add a Trip dialog */}

        <Dialog
          open={this.state.open1}
          onClose={this.handleClose1}
          aria-labelledby="form-dialog-title"
        >
          <DialogTitle id="form-dialog-title">Trip</DialogTitle>
          <DialogContent>
            <DialogContentText>
              Add a Trip for your Car
            </DialogContentText>
            <br></br>
              <TextField
                id="date"
                onChange={this.handleInputChange}
                label="Date of trip"
                type="date"
                name="date"
                value={this.state.date}
                defaultValue="date"
                InputLabelProps={{
                  shrink: true,
                }}
              />
              {/* <TextField
              autoFocus
              margin="dense"
              id="name"
              label="Starting Mileage"
              name="startingMileage"
              onChange={this.handleInputChange}
              value={this.state.startingMileage}
              type="text"
              fullWidth
              required
            />
             <TextField
              autoFocus
              margin="dense"
              id="name"
              label="Starting Address"
              name="startingAddress"
              onChange={this.handleInputChange}
              value={this.state.startingAddress}
              type="text"
              fullWidth
              required
            />
            <TextField
              autoFocus
              margin="dense"
              id="name"
              label="Ending Address"
              name="endingAddress"
              onChange={this.handleInputChange}
              value={this.state.endingAddress}
              type="text"
              fullWidth
              required
            /> */}
            <TextField
              autoFocus
              margin="dense"
              id="name"
              label="Total Mileage"
              name="totalmiles"
              onChange={this.handleInputChange}
              value={this.state.totalmiles}
              type="number"
              fullWidth
              required
            />
            <p>Trip Type:</p>
              {this.state.TripType.length ? (
                <TPList> 
              {this.state.TripType.map(trip => (
                <TPItem key={trip.id}>{trip.purpose}
                  
            </TPItem> 
            ))}      
          </TPList>
          ) : (<h6> null </h6>)}
           {/* <h6>Mileage Type:   
            <select id="user-list" sty required>
          
            <option label="Select Trip Type"></option>
              <option value="Personal" name="" >Personal</option>
              <option value="Work" name="" >Work</option>
            </select>
            </h6> 
            <h6>* is a required field</h6> */}
          </DialogContent>
          <DialogActions>
            <Button onClick={this.handleClose1} color="primary">
              Cancel
            </Button>
            <Button onClick={this.handleFormSubmit2} color="primary">
              Add Trip
            </Button>
          </DialogActions>
        </Dialog>

        </Wrapper>
        </div>

    
 );
         
   
}

      };
      UserPage.propTypes = {
        classes: PropTypes.object.isRequired
      }



export default withStyles(styles)(UserPage);








 