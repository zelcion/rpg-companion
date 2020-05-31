import React from "react";
import { observer } from "mobx-react";
import { store } from "../../store";
import AttributeModifier from "../../models/attribute-modifier";
import { Modifier } from "./modifier";

class ModifiersListContainer extends React.Component {
  constructor (props) {
    super(props);

    this.emptyText = this.emptyText.bind(this);
    this.addModifier = this.addModifier.bind(this);
  }

  addModifier() {
    const emptyModifier = new AttributeModifier();

    store.modifiers.addUnappliedModifier(emptyModifier);
    // console.log(emptyModifier.id);
  }

  emptyText () {
    if (store.modifiers.amount === 0) {
      return <p className="comment"> Ainda não há nada aqui </p>
    }

    return null;
  }

  unappliedList () {
    if (store.modifiers.unappliedModifiers.length === 0) return null;

    const list = store.modifiers.unappliedModifiers.map((modifier) => {
      return <Modifier key={modifier.id} modifier={modifier}/>
    });

    return [
      <div key="--1" className="mods-group-title"> <p> Modificadores não aplicados </p> <div className="follow-line" /> </div>,
      ...list
    ]
  }

  appliedList () {
    if (store.modifiers.appliedAmount === 0) return null;

    const list = store.modifiers.allAppliedModifiers.map((modifier) => {
      return <Modifier key={modifier.id} modifier={modifier}/>
    });

    return [
      <div key="--2" className="mods-group-title"> <p> Modificadores Aplicados </p> <div className="follow-line" /> </div>,
      ...list
    ]
  }

  render() {
    return (
      <div className="mods-list">
        {this.emptyText()}
        {this.appliedList()}
        {this.unappliedList()}
        <button className="add" onClick={this.addModifier}> + </button>
      </div>

    );
  }
}

export const ModifiersList = observer(ModifiersListContainer);