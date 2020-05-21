import React from "react";
import { store } from "../../../store";
import { Health } from "./health";
import { Energy } from "./energy";
import { CA } from "./ca";
import { observer } from "mobx-react";

class ActiveValuesComponent extends React.Component {
  render () {
    return (
      <div className="active-values">
        <Health />
        <Energy />
        <CA />
      </div>
    )
  }
}

export const ActiveValues = observer(ActiveValuesComponent);