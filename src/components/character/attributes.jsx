import React from "react";
import { Attribute } from "./attribute";
import { observer } from "mobx-react"
import { store } from "../../store";

class AttributesComponent extends React.Component {
  getAttributesDisplay () {
    const attributesDisplay = store.character.attributeIterable.map((attribute, i) => {
      return <Attribute
      incrementFunction={store.character.incrementAttribute}
      decrementFunction={store.character.decrementAttribute}
      key={i}
      name={attribute.name}
      value={attribute.value}
      bonus={attribute.bonus}/>
    });

    return attributesDisplay;
  }

  render () {
    return (
      <div className="attributes-container">
        {this.getAttributesDisplay()}
      </div>
    );
  }
}

export const Attributes = observer(AttributesComponent);