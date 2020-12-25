import { observer } from "mobx-react"
import React from "react"
import { Modal } from "../common/modal";
import { AscensionAttribute } from "./ascension-attribute";

class TalentTreeModalComponent extends React.Component {
  constructor (props) {
    super(props);
  }

  render () {
    return (
      <Modal title="Talentos" dismiss={this.props.dismiss}>
        <AscensionAttribute />
      </Modal>
    );
  }
}

export const TalentTreeModal = observer(TalentTreeModalComponent)
