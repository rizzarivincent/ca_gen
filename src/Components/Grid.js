import React, { Component } from "react";
import Cell from './Cell.js'

class Grid extends Component {

  grid = this.props.grid

  render() {
    return (
      <div>
        {this.grid.map((row, i) => row.map((col, j) => <Cell cellState={grid[i][j]} cellRow={i} cellCol={j} />))}
      </div>
    )
  }
}

export default Grid
