import React from "react"
import { observer } from "mobx-react"
import { Modifiers } from "./modifiers/modifiers"
import { TalentTreeButton } from "./talent-tree/talent-tree-button"

class SidebarComponent extends React.Component {
  render () {
    return (
      <div className="character-sidebar">
        <TalentTreeButton />
        <Modifiers />
      </div>
    )
  }
}

export const Sidebar = observer(SidebarComponent)