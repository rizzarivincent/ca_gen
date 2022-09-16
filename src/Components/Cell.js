import React, { Component } from "react";

class Cell extends Component {

  cellState = this.props.cellState
  cellRow = this.props.cellRow
  cellCol = this.props.cellCol

  cellColor = this.cellState ? 'pink' : 'white'

  render() {
    // if (this.cellRow === 0 && this.cellCol === 0) {
    //   console.log("RERENDERING CELL")
    //   console.log(this.cellState)
    //   console.log(this.cellColor)
    // }
    return <div style={{ width: 20, height: 20,
      backgroundColor: this.cellState ? 'pink' : undefined,
      border: "solid 1px black" }}
      onClick={() => this.props.clickHandler(this.cellRow, this.cellCol)}></div>
  }
}

export default Cell;
