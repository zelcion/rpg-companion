import { observer } from "mobx-react";
import React from "react";
import { store } from "../../store";

class AscensionPerkComponent extends React.Component {
  constructor (props) {
    super(props);

    this.setAscensionAttribute = this.setAscensionAttribute.bind(this);
  }

  setAscensionAttribute (event) {
    store.talentTree.setAscensionAttribute(event.target.value);
  }

  render () {
    return (
      <div>
        <h5> Selecione Seu Atributo de Ascensão: </h5>
        <select onChange={this.setAscensionAttribute} value={store.talentTree.ascensionAttribute}>
          <option value="none"> Nenhum </option>
          <option value="strength"> Strength </option>
          <option value="constitution"> Constitution </option>
          <option value="dexterity"> Dexterity </option>
          <option value="wisdom"> Wisdom </option>
          <option value="intelligence"> Intelligence </option>
          <option value="charisma"> Charisma </option>
          <option value="hability"> Hability </option>
        </select>
      </div>
    )
  }
}

export const AscensionAttribute = observer(AscensionPerkComponent)
