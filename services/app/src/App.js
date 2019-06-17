import React, { Component } from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

import NavBar from './components/navbar/NavBar';
import SearchDevice from './components/device/SearchDevice';
import PostDevice from './components/device/PostDeviceForm';
import Navigation from './components/navigation/Navigation';

import './App.css';

class App extends Component {
  state = {
    writers: []
  };

  render() {
    return (
      <MuiThemeProvider>
        <div>
          <Navigation />
          <NavBar />
          <SearchDevice />
          <PostDevice />
        </div>
      </MuiThemeProvider>
    );
  }
}
export default App;
