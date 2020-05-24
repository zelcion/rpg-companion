import React from "react";
import { observer } from "mobx-react";
import { ModifiersModal } from "./modifiers-modal";

class ModifiersContainer extends React.Component {
  constructor (props) {
    super (props);

    this.state = {
      modalOpen: false,
    }

    this.openModal = this.openModal.bind(this);
    this.closeModal = this.closeModal.bind(this);
    this.modal = this.modal.bind(this);
  }

  openModal() {
    this.setState({ modalOpen: true });
  }

  closeModal() {
    this.setState({ modalOpen: false });
  }

  modal () {
    if (!this.state.modalOpen) return null;

    return <ModifiersModal dismiss={this.closeModal}/>;
  }

  render() {
    return (
      <div className="mods-container">
        <button className="mods-button" onClick={this.openModal}> MODS </button>
        {this.modal()}
      </div> 
    );
  }
}

export const Modifiers = observer(ModifiersContainer);