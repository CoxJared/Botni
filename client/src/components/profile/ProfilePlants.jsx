import React, { Component } from 'react';
// import plantLibrary from '../../util/PlantLibrary';

import plantLibrary from '../../util/PlantLibrary';
import { withStyles, mergeClasses } from '@material-ui/styles';
import PropTypes from 'prop-types';

//redux
import { connect } from 'react-redux';

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
    const {
      classes,
      user: {
        credentials: { plants }
      }
    } = this.props;

    console.log(plants);

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

    return <div className={classes.plantLibrary}>{plantIcons}</div>;
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
