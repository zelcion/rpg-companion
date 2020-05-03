import React from "react";
import { AlertButton } from "./alert-button";
import { SkillConfigModal } from "./skill-config-modal";
import { observer } from "mobx-react"

export  const SkillDisplay = observer(class SkillDisplay extends React.Component {
  constructor (props) {
    super(props);

    this.levelUp = this.levelUp.bind(this);
    this.levelDown = this.levelDown.bind(this);
    this.saveChanges = this.saveChanges.bind(this);
    this.edit = this.edit.bind(this);
    this.exclude = this.exclude.bind(this);
    this.updateProperty = this.updateProperty.bind(this);

    this.modal = React.createRef();

    this.state = {
      baseDamage: 0,
      numberOfTargets: 1,
    };
  }

  updateProperty (propName) {
    return (ev) => {
      const newState = {};
      console.log(ev.target.value);
      newState[propName] = ev.target.value;

      this.setState(newState);
    }
  }

  levelUp () {
    this.props.skill.increaseLevel();
  }

  levelDown () {
    this.props.skill.decreaseLevel();
  }

  saveChanges (updatedSkill) {
    this.props.skill.name = updatedSkill.name;
    this.props.skill.size = updatedSkill.size;
    this.props.skill.pickAttribute(updatedSkill.auxiliaryAttribute);
    this.props.skill.pickType(updatedSkill.type);
    this.props.skill.description = updatedSkill.description;
    this.props.skill.effects = updatedSkill.effects;
    this.props.skill.activation = updatedSkill.activation;
    this.props.skill.range = updatedSkill.range;
  }

  edit () {
    this.modal.current.setState({isSeen: true});
  }

  exclude () {
    this.props.character.removeSkill(this.props.skill.key);
  }

  render () {
    const effects = this.props.skill.effects.length > 0 ? this.props.skill.effects.join(", ") : "nenhum";

    return (
      <div className="skill">
        <h5> {this.props.skill.name} - <button onClick={this.levelDown}> - </button> lvl {this.props.skill.level} <button onClick={this.levelUp}> + </button> </h5>
        <p> tipo: {this.props.skill.type} </p>
        <p> ativação: {this.props.skill.activation} </p>
        <p> efeitos: {effects} </p>
        <p> tamanho: {this.props.skill.size} </p>
        <p> atributo auxiliar: {this.props.skill.auxiliaryAttribute} </p>
        <p> alcance: {this.props.skill.range}m </p>
        <p> alcance efetivo: {this.props.skill.getRangeText()} </p>
        <p> descrição: {this.props.skill.description} </p>
        <AlertButton
          buttonStyle="main-button spacer"
          text="Usar!"
          alertText={
            `Seu custo de Energia: ${this.props.skill.costFormula()}\n`+
            `Sua efetividade: ${this.props.skill.effectivenessFormula(this.props.character)}\n`+
            `Formula completa: ${this.props.skill.diceFormula(this.props.character)}`
          }
        />
        <button className="main-button" onClick={this.edit}> Editar </button>
        <button className="cancel-button" onClick={this.exclude}> Excluir </button>
        <SkillConfigModal skill={this.props.skill} saveChanges={this.saveChanges} ref={this.modal}/>
        <div className={"calculator"}>
          Calcular Dano:
          <label>
            <p>Resultados do dado</p>
            <input type="number" value={this.state.baseDamage} onChange={this.updateProperty("baseDamage")}/>
          </label>

          <label>
            <p> Numero de Alvos </p>
            <input type="number" value={this.state.numberOfTargets} onChange={this.updateProperty("numberOfTargets")}/>
          </label>

          <AlertButton
          buttonStyle="main-button spacer"
          text="Calcular"
          alertText={
            `Dano realizado: ${this.props.skill.calculateDamage(this.state.baseDamage, this.state.numberOfTargets, false)}\n` +
            `Se inimigo estiver Vulnerável: ${this.props.skill.calculateDamage(this.state.baseDamage, this.state.numberOfTargets, true)}`
          }
          />
        </div>
      </div>
    )
  }
});
