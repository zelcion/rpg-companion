import React from "react";
import { store } from "../../../store";
import { observer } from "mobx-react";

class RestsComponent extends React.Component {
  render () {
    return (
      <div className="rests-container">
        <button className="rest" onClick={store.activeValues.fullRest}> Descanso Longo </button>
        <button className="rest" onClick={store.activeValues.partialRest}> Descanso Curto </button>
      </div>
    )
  }
}

export const Rests = observer(RestsComponent);