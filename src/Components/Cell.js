import React, { Component } from "react";

class Cell extends Component {

  cellState = this.props.cellState
  cellRow = this.props.cellRow
  cellCol = this.props.cellCol

  render() {
    return <div style={{ width: 20, height: 20,
      backgroundColor: this.cellState ? 'pink' : undefined,
      border: "solid 1px black" }}
      key={`${this.cellRow}-${this.cellCol}`}
      onClick={this.props.clickHandler(this.cellRow, this.cellCol)}></div>
  }
}

export default Cell;
