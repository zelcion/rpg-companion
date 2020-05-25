import React from "react";
import { Health } from "./health";
import { Energy } from "./energy";
import { CA } from "./ca";
import { Money } from "./money";
import { observer } from "mobx-react";

class ActiveValuesComponent extends React.Component {
  render () {
    return (
      <div className="active-values">
        <Health />
        <Energy />
        <CA />
        <Money />
      </div>
    )
  }
}

export const ActiveValues = observer(ActiveValuesComponent);