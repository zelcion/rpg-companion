import React from "react";
import { store } from "../../../store";
import { observer } from "mobx-react";

class CAComponent extends React.Component {
  constructor (props) {
    super(props);

    this.increaseValue = this.increaseValue.bind(this);
    this.decreaseValue = this.decreaseValue.bind(this);
  }

  increaseValue() {
    store.activeValues.increaseValue("armorClass", 1);
  }

  decreaseValue() {
    if (store.activeValues.armorClass === 0) return;

    store.activeValues.decreaseValue("armorClass", 1);
  }

  render () {
    return (
      <div className="ca-container">
        <p className="title"> C.A. </p>
        <p className="current"> {store.activeValues.armorClass} </p>
        <div className="bottom-buttons">
        <div className="decrease" onClick={this.decreaseValue}>
          <div className="symbol-left"> - </div>
        </div>
        <div className="increase" onClick={this.increaseValue}>
          <div className="symbol-right"> + </div>
        </div>
      </div>
      </div>
    )
  }
}

export const CA = observer(CAComponent);