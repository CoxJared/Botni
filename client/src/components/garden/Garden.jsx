import React, { Component } from 'react';

import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import withStyles from '@material-ui/core/styles/withStyles';

const styles = (theme) => ({
  ...theme.styleSpreading,
  card: {
    margin: '0px 0 10px',
    height: 300
  }
});

export class Garden extends Component {
  render() {
    const { classes } = this.props;
    return (
      <div>
        <Card className={classes.card}>
          hi
          <CardContent>yo</CardContent>
          <CardContent>yo</CardContent>
        </Card>
      </div>
    );
  }
}

export default withStyles(styles)(Garden);
