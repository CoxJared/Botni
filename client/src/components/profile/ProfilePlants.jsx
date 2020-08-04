import React, { Component } from 'react';
// import plantLibrary from '../../util/PlantLibrary';

import plantLibrary from '../../util/PlantLibrary';
import { withStyles, mergeClasses } from '@material-ui/styles';
import PropTypes from 'prop-types';

const styles = (theme) => ({
  ...theme.styleSpread,
  plantIconContainer: {
    width: 100,
    height: 40,
    display: 'flex',
    border: '2px solid red',
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
  }
});

export class ProfilePlants extends Component {
  state = { plants: [] };

  render() {
    const plant = 'tomato';
    const { classes, user } = this.props;
    let { color: plantBorderColor, image } = plantLibrary[plant];

    console.log(user.plants);
    return (
      <div className={classes.plantIconContainer}>
        <img src={image} alt="plant" className={classes.plantIcon} />
        <div className={classes.textContainer}>
          <h3 className={classes.plantName}>Tomatos</h3>
          <h3 className={classes.amount}>3 Trees</h3>
        </div>
      </div>
    );
  }
}

ProfilePlants.protoTypes = {
  user: PropTypes.object.isRequired,
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(ProfilePlants);
