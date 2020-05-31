import React from "react";
import { store } from "../../../store";
import { observer } from "mobx-react";
import { FieldPrompt } from "../../common/field-prompt";

class MoneyComponent extends React.Component {
  constructor (props) {
    super(props);

    this.increasePrompt = React.createRef();
    this.decreasePrompt = React.createRef();

    this.increaseValue = this.increaseValue.bind(this);
    this.decreaseValue = this.decreaseValue.bind(this);
  }

  increaseValue () {
    this.increasePrompt.current.begin(
      (value) => store.activeValues.increaseValue("currentMoney", Number(value))
    );
  }

  decreaseValue () {
    this.decreasePrompt.current.begin(
      (value) => store.activeValues.decreaseValue("currentMoney", Number(value))
    );
  }

  render () {
    return (
      <div className="money-container">
        <FieldPrompt type="number" defaultValue={1} ref={this.decreasePrompt} title="Berens gastos"/>
        <FieldPrompt type="number" defaultValue={1} ref={this.increasePrompt} title="Berens Ganhos"/>
        <p className="title"> Berens </p>
        <p className="current"> {store.activeValues.currentMoney} </p>
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

export const Money = observer(MoneyComponent);