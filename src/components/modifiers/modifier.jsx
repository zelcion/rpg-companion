import React from "react";
import { observer } from "mobx-react";
import { modifierTypes, modifiableAttributes } from "../../enums/attribute-modifier-constants";
import { store } from "../../store";
import { ModifierEditing } from "./modifier-editing";

class ModifierContainer extends React.Component {
  constructor (props) {
    super(props);

    this.sign = this.sign.bind(this);
    this.className = this.className.bind(this);
    this.toggleEdit = this.toggleEdit.bind(this);
    this.removeModifier = this.removeModifier.bind(this);
    this.toggleApply = this.toggleApply.bind(this);
    this.applyButton = this.applyButton.bind(this);

    this.name = this.name.bind(this);
    this.attribute = this.attribute.bind(this);

    this.state = {
      isEditing: false,
    }
  }

  applyButton() {
    if (!this.props.modifier.applied) {
      return {
        className: "apply",
        text: "Aplicar"
      }
    }

    return {
      className: "unapply",
      text: "Desaplicar"
    }
  }

  toggleApply() {
    if (this.props.modifier.applied) {
      store.modifiers.unapplyModifier(this.props.modifier);
      return;
    }

    if (this.props.modifier.isAppliable()) {
      store.modifiers.applyModifier(this.props.modifier);
    }
  }

  toggleEdit() {
    this.setState({ isEditing: !this.state.isEditing });
  }

  sign() {
    if (this.props.modifier.type === modifierTypes.debuff) return "-";

    return "+";
  }

  className() {
    if (this.props.modifier.type === modifierTypes.debuff) return "mods-debuff";

    return "mods-buff"
  }

  removeModifier() {
    if (!this.props.modifier.applied) {
      store.modifiers.removeUnappliedModifier(this.props.modifier);
      return;
    }
    
    store.modifiers.removeModifier(this.props.modifier);
  }

  name() {
    if (this.props.modifier.name === "") return "Nome do Buff/Debuff";

    return this.props.modifier.name;
  }

  attribute() {
    if (this.props.modifier.attribute === "") return "atributo";

    return modifiableAttributes[this.props.modifier.attribute];
  }

  content() {
    if (this.state.isEditing) {
      return <ModifierEditing modifier={this.props.modifier} toggleFunction={this.toggleEdit}/>
    }

    return (
      <div className="mods-card">
        <p className="title"> {this.name()} </p>
        <p className={"value " + this.className()}> {this.sign()}{this.props.modifier.amount} {this.attribute()} </p>
        <button className="close" onClick={this.removeModifier}> × </button>
        <button className="edit" onClick={this.toggleEdit}> Editar </button>
        <button className={this.applyButton().className} onClick={this.toggleApply}> {this.applyButton().text} </button>
      </div>
    )
  }

  render() {
    return this.content();
  }
}

export const Modifier = observer(ModifierContainer);