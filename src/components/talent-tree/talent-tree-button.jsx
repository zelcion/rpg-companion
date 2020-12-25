import { observer } from "mobx-react"
import React from "react"
import { TalentTreeModal } from "./talent-tree-modal";

class TalentTreeModalComponent extends React.Component {
  constructor (props) {
    super(props);

    this.state = {
      modalOpen: false,
    };

    this.openModal = this.openModal.bind(this);
    this.closeModal = this.closeModal.bind(this);
    this.modal = this.modal.bind(this);
  }

  openModal () {
    this.setState({ modalOpen: true });
  }

  closeModal() {
    this.setState({ modalOpen: false });
  }

  modal() {
    if (!this.state.modalOpen) {
      return (null)
    }

    return (<TalentTreeModal dismiss={this.closeModal}/>)
  }

  render () {
    return (
      <div>
        <button onClick={this.openModal} className="sidebar-button">
          Talentos
        </button>
        {this.modal()}
      </div>
    )
  }
}

export const TalentTreeButton = observer(TalentTreeModalComponent);
