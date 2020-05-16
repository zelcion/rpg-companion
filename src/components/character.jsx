import React from "react";
import { Attribute } from "./attribute";
import { SkillDisplay } from "./skills";
import Skill from "../models/skill";
import { observer } from "mobx-react"
import { CharacterNameAndLevel } from "./character/name-and-level";
import { store } from "../store";

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
    const attributesDisplay = store.character.attributeIterable.map((attribute, i) => {
      return <Attribute
      incrementFunction={store.character.incrementAttribute}
      decrementFunction={store.character.decrementAttribute}
      key={i}
      name={attribute.name}
      value={attribute.value}
      bonus={attribute.bonus}/>
    });

    const skillsDisplay = store.character.skills.map((skill, i) => {
      return <SkillDisplay
      key={skill.key}
      skill={skill}
      character={store.character}
      />
    });

    return (
      <div className="card character">
        <CharacterNameAndLevel />
        <h4> Attributes </h4>
        {attributesDisplay}
        <h4> Skills <button className="main-button" onClick={this.addBlankSkill}> Adicionar </button> </h4>
        {skillsDisplay}
      </div>
    )
  }
})
