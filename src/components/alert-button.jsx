import React from "react";

export class AlertButton extends React.Component {
  render () {
    return <button className={this.props.buttonStyle} onClick={() => window.alert(this.props.alertText)}> {this.props.text} </button>
  }
}
