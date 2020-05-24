import React from "react";
import { observer } from "mobx-react";
import { ModifiersList } from "./modifiers-list";

class ModifiersModalContainer extends React.Component {
  constructor (props) {
    super(props);
  }

  render() {
    return (
      <div className="mods-modal-bg" onClick={this.props.dismiss}>
        <div className="card" onClick={(e) => e.stopPropagation()}>
          <p className="title"> Modificadores </p>
          <ModifiersList />
          <button className="close" onClick={this.props.dismiss}> × </button>
        </div>
      </div>

    );
  }
}

export const ModifiersModal = observer(ModifiersModalContainer);