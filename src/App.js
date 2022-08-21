import React, { Component } from 'react';
import './App.css';
import './Components/Grid';
import Grid from './Components/Grid';

const numRows = 30;
const numCols = 30;
const pRandomLive = 0.5;

class App extends Component {

  createGridZeros = () => {
    return Array(numRows).fill(0).map(x => Array(numCols).fill(0))
  }

  createGridRandom = () => {
    return Array(numRows).fill(0).map(x => Array(numCols).fill(0).map(x => (Math.random() <= pRandomLive) ? 1 : 0))
  }

  state = {
    generation: 0,
    grid: this.createGridZeros()
  }

  render() {
    return (
      <div style={{display: 'flex', justifyContent:'center', alignItems:'center'}}>
        <h1>The Game of Life by John H. Conway</h1>
        <Grid grid={this.state.grid} />
      </div>
    )
  }
}

export default App
