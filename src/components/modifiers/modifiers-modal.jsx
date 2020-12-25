import React from "react";
import { observer } from "mobx-react";
import { ModifiersList } from "./modifiers-list";
import { Modal } from "../common/modal";

class ModifiersModalContainer extends React.Component {
  constructor (props) {
    super(props);
  }

  render() {
    return (
      <Modal title="Modificadores" dismiss={this.props.dismiss}>
        <ModifiersList />
      </Modal>

    );
  }
}

export const ModifiersModal = observer(ModifiersModalContainer);