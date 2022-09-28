import React, { Component } from 'react';
import './App.css';
import './Components/Grid';
import Grid from './Components/Grid';
import ButtonArray from './Components/ButtonArray';

const numRows = 25;
const numCols = 60;
const pRandomLive = 0.5;
const generationIntervalLength = 200;

const gameOfLifeBirths =   [false, false, false, true,  false, false, false, false, false]
const gameOfLifeSurvives = [false, false, true,  true,  false, false, false, false, false]

class App extends Component {

  constructor(props) {
    super(props)
    this.handleClick = this.handleClick.bind(this)
    this.handlePauseButton = this.handlePauseButton.bind(this)
    this.handleRuleButton = this.handleRuleButton.bind(this)
    this.handleResetRandomButton = this.handleResetRandomButton.bind(this)
    this.handleResetZeroButton = this.handleResetZeroButton.bind(this)

    this.state = {
      running:      false,
      generation:   0,
      grid:         this.createGridRandom(),
      birthArray:   [...gameOfLifeBirths],
      surviveArray: [...gameOfLifeSurvives]
    }
  }

  createGridZeros = () => {
    return Array(numRows).fill(0).map(x => Array(numCols).fill(0))
  }

  createGridRandom = () => {
    return Array(numRows).fill(0).map(x => Array(numCols).fill(0).map(x => (Math.random() <= pRandomLive) ? 1 : 0))
  }

  handleClick = (i, j) => {
    let newGrid = JSON.parse(JSON.stringify(this.state.grid))
    console.log("Before update: grid[" + i + "][" + j + "] = " + this.state.grid[i][j])
    newGrid[i][j] = this.state.grid[i][j] ? 0 : 1
    console.log("During update: newGrid[" + i + "][" + j + "] = " + newGrid[i][j])
    console.log("Is grid === newGrid? " + (this.state.grid === newGrid))
    this.setState({grid: newGrid})
  }

  handlePauseButton = () => {
    let running = this.state.running
    this.setState({running: !running})
  }

  handleRuleButton = (i, mode) => {
    console.log("Button clicked: " + i + " " + mode)
    if (mode === 'survive') {
      let newSurviveArray = [...this.state.surviveArray]
      newSurviveArray[i] = !newSurviveArray[i]
      this.setState({surviveArray: newSurviveArray})
    } else {
      let newBirthArray = [...this.state.birthArray]
      newBirthArray[i] = !newBirthArray[i]
      this.setState({birthArray: newBirthArray})
    }
  }

  handleResetRandomButton = () => {
    this.setState({grid: this.createGridRandom()})
  }

  handleResetZeroButton = () => {
    this.setState({grid: this.createGridZeros()})
  }

  moooreNeighbors = (x, y, grid) => {
    let count = 0
    let n_x = 0
    let n_y = 0
    for (let i = -1; i <= 1; i++) {
      for (let j = -1; j <= 1; j++) {
        n_x = (((x + i) % numRows) + numRows) % numRows
        n_y = (((y + j) % numCols) + numCols) % numCols
        count += grid[n_x][n_y]
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
        neighbors = this.moooreNeighbors(i, j, grid)
        if (grid[i][j] === 0) {
          newGrid[i][j] = this.birthCheck(neighbors)
        } else {
          newGrid[i][j] = this.surviveCheck(neighbors)
        }
      }
    }
    return newGrid
  }

  render() {
    // console.log("RERENDERING APP")
    // console.log(this.state.grid[0][0])
    return (
      <div style={{ justifyContent: 'center', alignContent: 'center', textAlign: 'center' }}>
        <h1>The Game of Life by John H. Conway</h1>
        <ButtonArray numButtons={9} buttonHandler={this.handleRuleButton} mode='birth' currArray={this.state.birthArray} />
        <ButtonArray numButtons={9} buttonHandler={this.handleRuleButton} mode='survive' currArray={this.state.surviveArray} />
        <div>
          <button onClick={this.handleResetRandomButton}>Random Reset</button>
          <button onClick={this.handleResetZeroButton}>Empty Reset</button>
        </div>
        <button onClick={this.handlePauseButton}>{this.state.running ? "Pause" : "Play"}</button>
        <Grid grid={this.state.grid} key={this.state.grid} clickHandler={this.handleClick} />
      </div>
    )
  }

  componentDidMount() {
    this.generationInterval = setInterval(() => {
      console.log("Tick!")
      if (this.state.running) {
        this.setState(() => ({
          grid: this.simulate(this.state.grid)
        }))
      }
    }, generationIntervalLength)
  }

  componentWillUnmount() {
    clearInterval(this.generationInterval)
  }
}

export default App
