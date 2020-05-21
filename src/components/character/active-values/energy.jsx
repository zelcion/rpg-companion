import React from "react";
import { store } from "../../../store";
import { observer } from "mobx-react";
import { FieldPrompt } from "../../common/field-prompt";
import { EditableFieldToggle } from "../../common/editable-field-toggle";

class EnergyComponent extends React.Component {constructor (props) {
  super(props);

  this.increasePrompt = React.createRef();
  this.decreasePrompt = React.createRef();

  this.decreaseValue = this.decreaseValue.bind(this);
  this.increaseValue = this.increaseValue.bind(this);
}

decreaseValue () {
  this.decreasePrompt.current.begin(
    (value) => store.activeValues.decreaseValue("currentEnergy", Number(value))
  );
}

increaseValue () {
  this.increasePrompt.current.begin(
    (value) => store.activeValues.increaseValue("currentEnergy", Number(value))
  );
}

render () {
  return (
    <div className="energy">
      <FieldPrompt type="number" defaultValue={1} ref={this.decreasePrompt} title="Pontos de energia Perdidos"/>
      <FieldPrompt type="number" defaultValue={1} ref={this.increasePrompt} title="Pontos de energia Ganhos"/>
      <p className="title"> Energia </p>
      <p className="current"> {store.activeValues.currentEnergy}Ep </p>
      <EditableFieldToggle
          containerStyle="edit-max-attribute"
          textStyle="maximum-value"
          formatting={(maxEnergy) => `(${maxEnergy} max.)`}
          value={store.activeValues.maxEnergy}
          updateInstructions={(result) => { store.activeValues.maxEnergy = Number(result); }}
        />
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

export const Energy = observer(EnergyComponent);