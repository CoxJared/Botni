import React, { Component } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import './App.css';
import createMuiTheme from '@material-ui/core/styles/createMuiTheme';
import createTheme from '@material-ui/core/styles/createMuiTheme';

//pages
import home from './pages/home';
import login from './pages/login';
import signup from './pages/signup';
import NavBar from './components/NavBar';
import { MuiThemeProvider } from '@material-ui/core';

const theme = createMuiTheme({
  palette: {
    primary: {
      // light: '#81c784',
      main: '#4caf50',
      // dark: '#388e3c',
      contrastText: '#fff'
    },
    secondary: {
      light: '#ff6333',
      main: '#ff3d00',
      dark: '#b22a00',
      contrastText: '#fff'
    }
  },
  typography: {
    useNextVariants: true
  }
});
class App extends Component {
  render() {
    return (
      <MuiThemeProvider theme={theme}>
        <div className="App">
          <Router>
            <NavBar />
            <div className="container">
              <Switch>
                <Route exact path="/" component={home} />
                <Route path="/login" component={login} />
                <Route path="/signup" component={signup} />
              </Switch>
            </div>
          </Router>
        </div>
      </MuiThemeProvider>
    );
  }
}

export default App;
