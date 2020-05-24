import React from "react";
import { observer } from "mobx-react";
import { modifierTypes, modifiableAttributes } from "../../enums/attribute-modifier-constants";

const defaultOption = <option key="_i" value="select"> Selecione ... </option>;

class ModifierEditingContainer extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      type: this.props.modifier.type,
      attribute: this.props.modifier.attribute,
      name: this.props.modifier.name,
      amount: this.props.modifier.amount,
    }

    this.handleChange = this.handleChange.bind(this);
    this.submit = this.submit.bind(this);
  }

  handleChange(field, ev) {
    const newState = {};
    newState[field] = ev.target.value;

    this.setState(newState);
  }

  typeOptions() {
    const result = [ defaultOption ];
    
    Object.values(modifierTypes).forEach((value) => {
      result.push(<option key={value}> {value} </option>)
    });

    return result;
  }

  attributeOptions() {
    const result = [ defaultOption ];
    
    Object.values(modifiableAttributes).map((attribute) => {
      result.push(<option key={attribute}> {attribute} </option>);
    });

    return result;
  }

  submit() {
    this.props.modifier.type = this.state.type;
    this.props.modifier.attribute = this.state.attribute;
    this.props.modifier.name = this.state.name;
    this.props.modifier.amount = Number(this.state.amount);

    this.props.toggleFunction()
  }

  render() {
    return (
      <div className="mods-card mods-editing">
        <label> Nome
          <input type="text" value={this.state.name} onChange={(ev) => this.handleChange("name", ev)}/>
        </label>

        <label> Valor
          <input type="number" value={this.state.amount} onChange={(ev) => this.handleChange("amount", ev)}/>
        </label>

        <label> Tipo
          <select value={this.state.type} onChange={(ev) => this.handleChange("type", ev)} default="select">
            {this.typeOptions()}
          </select>
        </label>

        <label> Atributo
          <select value={this.state.attribute} onChange={(ev) => this.handleChange("attribute", ev)} default="select">
            {this.attributeOptions()}
          </select>
        </label>

        <button className="edit" onClick={this.submit}> Ok </button>
      </div>
    )
  }
}

export const ModifierEditing = observer(ModifierEditingContainer);