import React from "react";
import { Attribute } from "./attribute";
import { SkillDisplay } from "./skills";
import Skill from "../models/skill";
import { observer } from "mobx-react"

export const Character = observer(class Character extends React.Component {
  constructor (props) {
    super(props);

    this.addBlankSkill = this.addBlankSkill.bind(this);
    this.incrementLevel = this.incrementLevel.bind(this);
    this.decrementLevel = this.decrementLevel.bind(this);
  }

  incrementLevel () {
    this.props.character.incrementAttribute("level");
  }

  decrementLevel () {
    this.props.character.decrementAttribute("level");
  }

  addBlankSkill () {
    this.props.character.addSkill(new Skill());
  }

  render () {
    const attributesDisplay = this.props.character.attributeIterable.map((attribute, i) => {
      return <Attribute
      incrementFunction={this.props.character.incrementAttribute}
      decrementFunction={this.props.character.decrementAttribute}
      key={i}
      name={attribute.name}
      value={attribute.value}
      bonus={attribute.bonus}/>
    });

    const skillsDisplay = this.props.character.skills.map((skill, i) => {
      return <SkillDisplay
      key={skill.key}
      skill={skill}
      character={this.props.character}
      />
    });

    return (
      <div>
        <h3> {this.props.character.name} - <button onClick={this.decrementLevel}> - </button> lvl {this.props.character.level} <button onClick={this.incrementLevel}> + </button> </h3>
        <hr />
        <h4> Attributes </h4>
        {attributesDisplay}
        <h4> Skills <button className="main-button" onClick={this.addBlankSkill}> Adicionar </button> </h4>
        {skillsDisplay}
      </div>
    )
  }
})
