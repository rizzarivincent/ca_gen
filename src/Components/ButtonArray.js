import React, { Component } from "react";

class ButtonArray extends Component {

  render() {
    return (<div>
      {
      [...Array(this.props.numButtons)].map(
        (_, i) => <button type="button"
                          onClick={() => this.props.buttonHandler(i, this.props.mode)}
                          style={{backgroundColor: this.props.currArray[i] ? 'white' : 'grey'}}
                          key={i}>{i}</button>
      )
      }
    </div>)
  }
}

export default ButtonArray;