import React from "react";
import { store } from "../../../store";
import { observer } from "mobx-react";
import { FieldPrompt } from "../../common/field-prompt";
import { EditableFieldToggle } from "../../common/editable-field-toggle";

class HealthComponent extends React.Component {
  constructor (props) {
    super(props);

    this.increasePrompt = React.createRef();
    this.decreasePrompt = React.createRef();

    this.decreaseValue = this.decreaseValue.bind(this);
    this.increaseValue = this.increaseValue.bind(this);
  }

  decreaseValue () {
    this.decreasePrompt.current.begin(
      (value) => store.activeValues.decreaseValue("currentLife", Number(value))
    );
  }

  increaseValue () {
    this.increasePrompt.current.begin(
      (value) => store.activeValues.increaseValue("currentLife", Number(value))
    );
  }

  render () {
    return (
      <div className="health">
        <FieldPrompt type="number" defaultValue={1} ref={this.decreasePrompt} title="Pontos de vida Perdidos"/>
        <FieldPrompt type="number" defaultValue={1} ref={this.increasePrompt} title="Pontos de vida Ganhos"/>
        <p className="title"> Vida </p>
        <p className="current"> {store.activeValues.currentLife}Hp </p>
        <EditableFieldToggle
          containerStyle="edit-max-attribute"
          textStyle="maximum-value"
          formatting={(maxLife) => `(${maxLife} max.)`}
          value={store.activeValues.maxLife}
          updateInstructions={(result) => { store.activeValues.maxLife = Number(result); }}
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

export const Health = observer(HealthComponent);