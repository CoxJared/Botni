import React, { Component, Fragment } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import MyButton from '../../util/MyButton';
import PostPost from '../post/PostPost';
import Notifications from './Notifications';
import appLogo from '../../images/logo-white.png';

// Material UI
import withStyles from '@material-ui/core/styles/withStyles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Button from '@material-ui/core/Button';

import HomeIcon from '@material-ui/icons/Home';

const styles = (theme) => ({
  ...theme.styleSpreading,
  appTitle: {
    margin: ' 0 400px 0 10px',
    fontSize: '30px;'
  },
  appLogo: {
    width: 35
  }
});
export class NavBar extends Component {
  render() {
    const { authenticated, classes } = this.props;
    return (
      <AppBar>
        <Toolbar className="nav-container">
          {authenticated ? (
            <Fragment>
              <img className={classes.appLogo} src={appLogo} alt="App Logo" />
              <div className={classes.appTitle}>Botni</div>
              <PostPost />
              <Link to="/">
                <MyButton tip="home">
                  <HomeIcon />
                </MyButton>
              </Link>
              <Notifications />
            </Fragment>
          ) : (
            <Fragment>
              <img className={classes.appLogo} src={appLogo} alt="App Logo" />
              <div className={classes.appTitle}>Botni</div>
              <Button color="inherit" component={Link} to="/login">
                login
              </Button>
            </Fragment>
          )}
        </Toolbar>
      </AppBar>
    );
  }
}

NavBar.propTypes = {
  authenticated: PropTypes.bool.isRequired,
  classes: PropTypes.object.isRequired
};

const mapStateToProps = (state) => ({
  authenticated: state.user.authenticated
});

export default connect(mapStateToProps)(withStyles(styles)(NavBar));
