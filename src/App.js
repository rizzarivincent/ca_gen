import React, { Component } from 'react';
import './App.css';
import './Components/Grid';
import Grid from './Components/Grid';

const numRows = 25;
const numCols = 60;
const pRandomLive = 0.5;

const gameOfLifeBirths =   [false, false, false, true,  false, false, false, false, false]
const gameOfLifeSurvives = [false, false, true,  true,  false, false, false, false, false]

class App extends Component {

  constructor(props) {
    super(props)
    this.handleClick = this.handleClick.bind(this)
    this.handlePauseButton = this.handlePauseButton.bind(this)
  }

  createGridZeros = () => {
    return Array(numRows).fill(0).map(x => Array(numCols).fill(0))
  }

  createGridRandom = () => {
    return Array(numRows).fill(0).map(x => Array(numCols).fill(0).map(x => (Math.random() <= pRandomLive) ? 1 : 0))
  }

  handleClick = (i, j) => {
    let newGrid = JSON.parse(JSON.stringify(this.state.grid))
    newGrid[i][j] = this.state.grid[i][j] ? 0 : 1
    console.log("Updating the grid!")
    this.setState({grid: newGrid})
  }

  handlePauseButton = () => {
    let running = this.state.running
    this.setState({running: !running})
  }

  neighbors = (x, y, grid) => {
    let count = 0
    for (let i = -1; i <= 1; i++) {
      for (let j = -1; j <= 1; j++) {
        count += grid[(x + i) % numRows][(y + j) % numCols]
      }
    }
    count -= grid[x][y]
    return count
  }

  birthCheck = (n) => {
    return this.state.birthArray[n] ? 1 : 0
  }

  surviveCheck = (n) => {
    return this.state.surviveArray[n] ? 1 : 0
  }

  simulate = (grid) => {
    let newGrid = Array(numRows).fill(0).map(x => Array(numCols).fill(0))
    let neighbors = 0
    for (let i = 0; i < numRows; i++) {
      for (let j = 0; j < numCols; j++) {
        neighbors = this.neighbors(i, j, grid)
        if (grid[i][j] === 0) {
          newGrid[i][j] = this.birthCheck(neighbors)
        } else {
          newGrid[i][j] = this.surviveCheck(neighbors)
        }
      }
    }
    return newGrid
  }

  state = {
    running:      false,
    generation:   0,
    grid:         this.createGridRandom(),
    birthArray:   [...gameOfLifeBirths],
    surviveArray: [...gameOfLifeSurvives]
  }

  render() {
    return (
      <div style={{ justifyContent: 'center', alignContent: 'center', textAlign: 'center' }}>
        <h1>The Game of Life by John H. Conway</h1>
        <p>BUTTONS HERE</p>
        <button onClick={this.handlePauseButton}>{this.state.running ? "Pause" : "Play"}</button>
        <Grid grid={this.state.grid} clickHandler={this.handleClick} />
      </div>
    )
  }
}

export default App
