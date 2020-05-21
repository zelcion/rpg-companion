import React from "react";
import { SkillDisplay } from "./skills";
import Skill from "../models/skill";
import { observer } from "mobx-react"
import { CharacterNameAndLevel } from "./character/name-and-level";
import { store } from "../store";
import { Attributes } from "./character/attributes";
import { ActiveValues } from "./character/active-values";
import { Rests } from "./character/active-values/rests";

export const Character = observer(class Character extends React.Component {
  constructor (props) {
    super(props);

    this.addBlankSkill = this.addBlankSkill.bind(this);
    this.incrementLevel = this.incrementLevel.bind(this);
    this.decrementLevel = this.decrementLevel.bind(this);
  }

  incrementLevel () {
    store.character.incrementAttribute("level");
  }

  decrementLevel () {
    store.character.decrementAttribute("level");
  }

  addBlankSkill () {
    store.character.addSkill(new Skill());
  }

  render () {
    const skillsDisplay = store.character.skills.map((skill) => {
      return <SkillDisplay
      key={skill.key}
      skill={skill}
      character={store.character}
      />
    });

    return (
      <div className="card character">
        <CharacterNameAndLevel />
        <Rests />
        <ActiveValues />
        <Attributes />
        <h4> Skills <button className="main-button" onClick={this.addBlankSkill}> Adicionar </button> </h4>
        {skillsDisplay}
      </div>
    )
  }
})
