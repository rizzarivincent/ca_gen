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
      backgroundColor: this.cellState ? 'white' : 'gray',
      border: "solid 1px black", borderRadius: "3px" }}
      onClick={() => this.props.clickHandler(this.cellRow, this.cellCol)}
      className={"Cell" + (this.cellState ? ' alive' : ' dead')}></div>
  }

  componentDidUpdate(prevProps) {
    if (prevProps.cellState === true && this.cellState === false) {

    }
  }
}

export default Cell;
