import React, { Component } from 'react';
import PropertyContainer from './containers/PropertyContainer';
import logo from './logo.svg';
import './App.css';

class App extends Component {
  state = {
    properties: [{
      "location": "London",
      "numberOfBeds": "4",
      "numberOfBathrooms": "1",
      "price": "750000",
      "numberOfKitchens": "5"
    },
    {
      "location": "Glasgow",
      "numberOfBeds": "2",
      "numberOfBathrooms": "2",
      "price": "400000"
    },
    {
      "location": "Manchester",
      "numberOfBeds": "8",
      "numberOfBathrooms": "1",
      "price": "200000"
    },
    {
      "location": "Edinburgh",
      "numberOfBeds": "4",
      "numberOfBathrooms": "1",
      "price": "450000",
      "gardens": "5"
    }],
  }

  render() {
    return(<PropertyContainer properties={this.state.properties} /> )
  }
}

export default App;
