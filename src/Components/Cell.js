import React, { Component } from "react";

class Cell extends Component {

  cellState = this.props.cellState

  render() {
    return <div style={{ width: 20, height: 20,
      backgroundColor: this.cellState ? 'white' : undefined }}></div>
  }
}

export default Cell;
