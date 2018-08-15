import React, { Component } from 'react';
import './App.css';
import LandingPage from './components/LandingPage';
import MenuBar from './components/MenuBar';
import './components/MenuBar.css';
import LeaderBoard from './components/LeaderBoard';

class App extends Component {
  render() {
    return (
      <div className="App">
        <LandingPage />
        <MenuBar className="Menu-Bar"/>
      </div>
    );
  }
}

export default App;
