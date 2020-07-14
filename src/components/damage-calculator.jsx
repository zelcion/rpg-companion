import { observer } from "mobx-react";
import React from "react";
import { AlertButton } from "./alert-button";

export const DamageCalculator = observer(
  class DamageCalculator extends React.Component {
    constructor(props) {
      super(props);

      this.state = {
        baseDamage: 0,
        numberOfTargets: 1,
      };

      this.updateProperty = this.updateProperty.bind(this);
    }

    updateProperty(propName) {
      return ev => {
        const newState = {};
        console.log(ev.target.value);
        newState[propName] = ev.target.value;

        this.setState(newState);
      };
    }

    render() {
      return (
        <div className={"calculator"}>
          Calcular Dano:
          <label>
            <p>Resultados do dado</p>
            <input
              type="number"
              value={this.state.baseDamage}
              onChange={this.updateProperty("baseDamage")}
            />
          </label>
          <label>
            <p> Número de Alvos </p>
            <input
              type="number"
              value={this.state.numberOfTargets}
              onChange={this.updateProperty("numberOfTargets")}
            />
          </label>
          <AlertButton
            buttonStyle="main-button spacer"
            text="Calcular"
            alertText={
              `Dano realizado: ${this.props.skill.calculateDamage(
                this.state.baseDamage,
                this.state.numberOfTargets,
                false,
              )}\n` +
              `Se inimigo estiver Vulnerável: ${this.props.skill.calculateDamage(
                this.state.baseDamage,
                this.state.numberOfTargets,
                true,
              )}`
            }
          />
        </div>
      );
    }
  },
);
