import React, { Component } from "react";
import Cell from './Cell.js'

class Grid extends Component {

  grid = this.props.grid

  render() {
    return (
      <div style={{ display: 'grid', gridTemplateColumns: `repeat(${this.grid[0].length}, 21px)`, justifyContent: 'center' }}>
        {this.grid.map((row, i) => row.map((col, j) => 
          <Cell cellState={this.grid[i][j]} cellRow={i} cellCol={j} key={`${i}-${j}`} clickHandler={this.props.clickHandler} />
        ))}
      </div>
    )
  }
}

export default Grid
