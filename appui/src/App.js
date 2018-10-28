import React, { Component } from 'react';
import './App.css';
import ListPlaces from './Components/ListPlaces';


class App extends Component {
  render() {
    return (
      <div className="App">
        <h2>Vizag Blocks</h2>
        <ListPlaces />
      </div>
    );
  }
}

export default App;
