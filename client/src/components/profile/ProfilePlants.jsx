import React, { Component } from 'react';
import plantLibrary from '../../util/PlantLibrary';
import PropTypes from 'prop-types';

import { withStyles } from '@material-ui/styles';

//MUI
import {
  Button,
  TextField,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle
} from '@material-ui/core';
import AddIcon from '@material-ui/icons/Add';

//redux
import { connect } from 'react-redux';
import MyButton from '../../util/MyButton';

const styles = (theme) => ({
  ...theme.styleSpread,
  plantLibrary: {
    display: 'flex',
    flexWrap: 'wrap'
  },
  plantIconContainer: {
    width: 100,
    height: 40,
    margin: 5,
    display: 'flex',
    border: '1px solid red',
    borderRadius: '15px',
    backgroundColor: 'rgb(250,250,250)'
  },
  plantIcon: {
    width: 40,
    marginRight: 2
  },
  textContainer: {
    width: 40,
    margin: 0,
    padding: 0
  },
  plantName: {
    fontSize: 12,
    paddingTop: 5
  },
  amount: {
    fontSize: 10,
    fontWeight: '300'
  },
  plantSearchIcons: {
    height: 200
  }
});

export class ProfilePlants extends Component {
  state = {
    plants: [],
    openDialog: false,
    plantSearchField: ''
  };

  mapAvailablePlantsToState = (currentPlants) => {
    let plants = [];
    for (let plant in plantLibrary) {
      console.log(plant);
      if (!currentPlants.some((currentPlant) => currentPlant.name === plant)) {
        plants.push(plant);
      }
    }
    this.setState({ plants });
  };

  handleOpen = () => {
    this.setState({
      openDialog: true
    });
    this.mapAvailablePlantsToState(this.props.user.credentials.plants);
  };

  handleClose = () => {
    this.setState({
      openDialog: false
    });
  };

  render() {
    const {
      classes,
      user: {
        credentials: { plants }
      }
    } = this.props;
    const { openDialog, plantSearchField } = this.state;

    const plantIcons = plants.map((plant) => {
      let { color: plantBorderColor, image } = plantLibrary[plant.name];
      return (
        <div className={classes.plantIconContainer}>
          <img src={image} alt="plant" className={classes.plantIcon} />
          <div className={classes.textContainer}>
            <h3 className={classes.plantName}>{plant.name}</h3>
            <h3 className={classes.amount}>{plant.amount}</h3>
          </div>
        </div>
      );
    });

    return (
      <div className={classes.plantLibrary}>
        {plantIcons}
        <MyButton tip="Add Plants" onClick={this.handleOpen}>
          <AddIcon />
        </MyButton>

        <Dialog
          open={openDialog}
          onClose={this.handleClose}
          // fullWidthmaxWidth="300px"
        >
          <DialogTitle>Add a plant to your garden</DialogTitle>
          <DialogContent style={{ width: 500 }}>
            <form>
              <TextField
                name="search"
                type="text"
                label="Search"
                placeholder="search for plant"
                className={classes.textfield}
                value={plantSearchField}
                onChange={this.handlechange}
                fullWidth
              />
            </form>
            <div className={classes.plantSearchIcons}>
              {this.state.plants.map((plant) => {
                console.log(plant);
                return (
                  <div className={classes.plantIconContainer}>
                    <img
                      src={plantLibrary[plant].image}
                      alt="plant"
                      className={classes.plantIcon}
                    />
                    <div className={classes.textContainer}>
                      <h3 className={classes.plantName}>{plant}</h3>
                    </div>
                  </div>
                );
              })}
            </div>
          </DialogContent>
          <DialogActions>
            <Button onClick={this.handleClose} color="primary">
              Cancel
            </Button>
            <Button onClick={this.handleSubmit} color="primary">
              Save
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  user: state.user
});

ProfilePlants.propTypes = {
  user: PropTypes.object.isRequired,
  classes: PropTypes.object.isRequired
};
export default connect(mapStateToProps)(withStyles(styles)(ProfilePlants));
