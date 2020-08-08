import React, { Component } from 'react';

import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import withStyles from '@material-ui/core/styles/withStyles';

//tempory images, replace with database pics
import tempGarden from './../../images/tempGardenPhotos/garden.jpeg';
import tomatoIcon from './../../images/plant-icons/tomato.png';
import orangeIcon from './../../images/plant-icons/orange.png';
import kaleIcon from './../../images/plant-icons/kale.png';
import { orange } from '@material-ui/core/colors';

const styles = (theme) => ({
  ...theme.styleSpreading,
  card: {
    margin: '0px 0 10px',
    height: 300
  },
  topCard: {
    display: 'flex',
    margin: 0,
    padding: 0
  },
  calendar: {
    width: '65%',
    display: 'flex',
    margin: '20px 0px 0 20px',
    height: 100,
    padding: 0
  },
  todaysDate: {
    color: '#555',
    padding: '20px 0 0 30px',
    fontSize: '30px',
    fontWeight: 300,
    margin: 0
  },
  day: {
    backgroundColor: 'rgb(250,250,250)',
    borderRadius: '15px',
    border: '2px solid rgba(0,0,1,1)',
    padding: 0,
    width: 120,
    margin: '0 5px'
  },
  dayOfWeek: {
    color: '#000',
    textAlign: 'center',
    margin: '10px 0 5px 0',
    fontSize: 15,
    fontWeight: 200
  },
  dayOfMonth: {
    color: '#222',
    textAlign: 'center',
    margin: 0,
    fontSize: 35,
    fontWeight: 200
  },
  imageContainer: {
    width: '30%',
    overFill: 'hidden'
  },
  image: {
    objectFit: 'contain',
    width: '100%'
  },
  bottomCard: {}
});

export class Garden extends Component {
  render() {
    const { classes } = this.props;

    const weekItems = [
      { dayofWeek: 'Sun', dayOfMonth: '2', watered: true, fertilized: false },
      { dayofWeek: 'Mon', dayOfMonth: '3', watered: false, fertilized: false },
      { dayofWeek: 'Tues', dayOfMonth: '4', watered: true, fertilized: false },
      { dayofWeek: 'Wed', dayOfMonth: '5', watered: true, fertilized: false },
      { dayofWeek: 'Thur', dayOfMonth: '6', watered: true, fertilized: false },
      { dayofWeek: 'Fri', dayOfMonth: '7', watered: false, fertilized: false },
      { dayofWeek: 'Sat', dayOfMonth: '8', watered: false, fertilized: false }
    ];

    const myPlants = [
      { name: 'Tomato', image: tomatoIcon },
      { name: 'Orange', image: orange },
      { name: 'Kale', image: kaleIcon }
    ];

    const weekElements = weekItems.map((day) => (
      <CardContent
        className={classes.day}
        style={{
          borderColor: day.watered ? 'rgba(80,90,255,.8)' : 'rgba(0,0,0,.05)'
        }}
      >
        <h2 className={classes.dayOfWeek}>{day.dayofWeek}</h2>
        <h2 className={classes.dayOfMonth}>{day.dayOfMonth}</h2>
      </CardContent>
    ));

    const myPlantElements = myPlants.map((plant) => (
      <CardContent className={classes.plantSelector}>
        <h2 className={classes.plantName}>{plant.name}</h2>
        <img className={classes.plantImage} src={plant.image} />
      </CardContent>
    ));

    return (
      <div>
        <Card className={classes.card}>
          <h2 className={classes.todaysDate}>August 7, 2020</h2>
          <CardContent className={classes.topCard}>
            <CardContent className={classes.calendar}>
              {weekElements}
            </CardContent>
            <CardContent className={classes.imageContainer}>
              <img src={tempGarden} className={classes.image} />
            </CardContent>
          </CardContent>
          <CardContent className={classes.bottomCard}></CardContent>
        </Card>
      </div>
    );
  }
}

export default withStyles(styles)(Garden);
