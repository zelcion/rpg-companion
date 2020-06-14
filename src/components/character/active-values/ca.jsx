import React from "react";
import { store } from "../../../store";
import { observer } from "mobx-react";

class CAComponent extends React.Component {
  constructor (props) {
    super(props);
  }

  render () {
    return (
      <div className="ca-container">
        <p className="title"> C.A. </p>
        <p className="current"> {store.modifiers.getAttributeModificator("armorClass") + store.activeValues.armorClass} </p>
      </div>
    )
  }
}

export const CA = observer(CAComponent);