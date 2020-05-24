import React from "react";
import { observer } from "mobx-react"
import { store } from "../../store";
import { Modifiers } from "../modifiers/modifiers";

class CharacterNameAndLevelComponent extends React.Component {
  constructor (props) {
    super(props);

    this.incrementLevel = this.incrementLevel.bind(this);
    this.decrementLevel = this.decrementLevel.bind(this);
  }

  incrementLevel () {
    store.character.incrementAttribute("level");
  }

  decrementLevel () {
    store.character.decrementAttribute("level");
  }

  render () {
    return (
      <div className="character-header">
        <Modifiers />
        <div className="character-name">
          <p className="name"> {store.character.name} </p>
          <div className="level-controller">
            <button onClick={this.decrementLevel} className="minus"> - </button>
            <p> lvl {store.character.level} </p>
            <button onClick={this.incrementLevel} className="plus"> + </button>
          </div>
        </div>
      </div>
    )
  }
}

export const CharacterNameAndLevel = observer(CharacterNameAndLevelComponent)