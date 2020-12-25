import { observer } from "mobx-react"
import React from "react"
import { Modal } from "../common/modal";

class TalentTreeModalComponent extends React.Component {
  constructor (props) {
    super(props);
  }

  render () {
    return (
      <Modal title="Talentos" dismiss={this.props.dismiss}>
        Tests
      </Modal>
    );
  }
}

export const TalentTreeModal = observer(TalentTreeModalComponent)
