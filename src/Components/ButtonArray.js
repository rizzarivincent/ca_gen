import React, { Component } from "react";

class ButtonArray extends Component {

  text = (this.props.mode === 'birth') ? "Birth:" : "Survive:"

  render() {
    return (<div>
      {this.text}
      {
      [...Array(this.props.numButtons)].map(
        (_, i) => <button onClick={this.props.buttonHandler(i, this.props.mode)}
                          style={{backgroundColor: this.props.currArray[i] ? 'white' : 'grey'}}
                          key={i}>{i}</button>
      )
      }
    </div>)
  }
}

export default ButtonArray;