import { observer } from "mobx-react"
import React from "react"

class TalentTreeModalComponent extends React.Component {
  openModal () {
    console.log("i should open");
  }

  render () {
    return (
      <div>
        <button onClick={this.openModal} className="sidebar-button">
          Talentos
        </button>
      </div>
    )
  }
}

export const TalentTreeModal = observer(TalentTreeModalComponent);
