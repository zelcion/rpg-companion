import React from "react";
import { observer } from "mobx-react";
import { ModifiersModal } from "./modifiers-modal";
import { store } from "../../store";

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

  amount () {
    const amount = store.modifiers.appliedAmount;

    if (amount > 0) return `(${amount})`;

    return ""
  }

  render() {
    return (
      <div className="mods-container">
        <button className="mods-button" onClick={this.openModal}> MODS {this.amount()} </button>
        {this.modal()}
      </div> 
    );
  }
}

export const Modifiers = observer(ModifiersContainer);