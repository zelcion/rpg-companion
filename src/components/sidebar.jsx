import React from "react"
import { observer } from "mobx-react"
import { Modifiers } from "./modifiers/modifiers"
import { TalentTreeModal } from "./talent-tree/talent-tree-modal"

class SidebarComponent extends React.Component {
  render () {
    return (
      <div class="character-sidebar">
        <TalentTreeModal />
        <Modifiers />
      </div>
    )
  }
}

export const Sidebar = observer(SidebarComponent)