import React from "react";
import { SkillConfigModal } from "./skill-config-modal";
import { observer } from "mobx-react"
import SkillUsage from "../actions/skill-usage";
import { DiscordService } from "../api/send-to-discord";
import { skillAlgorithms } from "../enums/skill-algorithms";

export const SkillDisplay = observer(class SkillDisplay extends React.Component {
  constructor (props) {
    super(props);

    this.levelUp = this.levelUp.bind(this);
    this.levelDown = this.levelDown.bind(this);
    this.saveChanges = this.saveChanges.bind(this);
    this.edit = this.editButton.bind(this);
    this.exclude = this.exclude.bind(this);
    this.updateProperty = this.updateProperty.bind(this);
    this.addRoundButton = this.addRoundButton.bind(this);
    this.releaseButton = this.releaseButton.bind(this);
    this.renewUsage = this.renewUsage.bind(this);
    this.cancelButton = this.cancelButton.bind(this);
    this.currentEnergyUsage = this.currentEnergyUsage.bind(this);

    this.skillUsageConstructor = skillAlgorithms[props.skill.activation];

    this.skillUsage = new this.skillUsageConstructor(props.skill);
    this.discordService = new DiscordService();

    this.modal = React.createRef();
  }

  renewUsage () {
    this.skillUsage.inUse = false;
    this.skillUsageConstructor = skillAlgorithms[this.props.skill.activation];

    this.skillUsage = new this.skillUsageConstructor(this.props.skill);
  }

  addRoundButton () {
    const addHandler = () => {
      this.skillUsage.addRound();

      if (this.props.skill.activation === "toggle") {
        this.discordService.sendMessage(this.skillUsage.message())
      }
    };

    if (!this.skillUsage.inUse) return null;

    if (this.props.skill.activation === "toggle" || this.props.skill.activation === "charge") {
      return (<button onClick={addHandler} className="main-button spacer"> Adicionar Turno ({this.skillUsage.rounds}) </button>)
    }
  }

  cancelButton () {
    if (!this.skillUsage.inUse) return null;

    return (<button onClick={this.renewUsage} className="cancel-button spacer"> Cancelar </button>)
  }

  releaseButton () {
    const releaseHandler = () => {
      this.skillUsage.endUsage();

      if (this.skillUsage.inUse) return;

      if (this.props.skill.activation !== "toggle") {
        this.discordService.sendMessage(this.skillUsage.message());
      }

      this.renewUsage();
    };

    if (!this.skillUsage.inUse) return null;
    const buttonText = this.props.skill.activation === "trap"
      ? "Ativar Armadilha"
      : "Encerrar Uso";
    
    return (<button onClick={releaseHandler} className="main-button spacer"> {buttonText} </button>)
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

    this.renewUsage();
  }

  editButton () {
    const disabled = this.skillUsage.inUse;

    const edit = () => { this.modal.current.setState({isSeen: true}) };

    return <button className="main-button" onClick={edit} disabled={disabled} > Editar </button>
  }

  exclude () {
    this.props.character.removeSkill(this.props.skill.key);
  }

  currentEnergyUsage () {
    if (!this.skillUsage.inUse) return null;
    const cost = this.props.skill.activation === "charge"
      ? this.skillUsage.totalCost
      : this.skillUsage.cost;

    return (<p> Gasto atual: {cost} </p>)
  }

  render () {
    const effects = this.props.skill.effects.length > 0 ? this.props.skill.effects.join(", ") : "nenhum";

    const inUseClass = this.skillUsage.inUse ? "in-use" : "";

    return (
      <div className={"skill " + inUseClass}>
        <h5> {this.props.skill.name} - <button onClick={this.levelDown}> - </button> lvl {this.props.skill.level} <button onClick={this.levelUp}> + </button> </h5>
        <p> tipo: {this.props.skill.type} </p>
        <p> ativação: {this.props.skill.activation} </p>
        <p> efeitos: {effects} </p>
        <p> tamanho: {this.props.skill.size} </p>
        <p> atributo auxiliar: {this.props.skill.auxiliaryAttribute} </p>
        <p> alcance: {this.props.skill.range}m </p>
        <p> alcance efetivo: {this.props.skill.getRangeText()} </p>
        <p> descrição: {this.props.skill.description} </p>
        <div className="spacer"> {this.currentEnergyUsage()} </div>
        <button onClick={this.skillUsage.startUsage} className="main-button spacer" disabled={this.skillUsage.inUse}> Usar </button>
        {this.addRoundButton()}
        {this.releaseButton()}
        {this.cancelButton()}
        {this.editButton()}
        <button className="cancel-button" onClick={this.exclude}> Excluir </button>
        <SkillConfigModal skill={this.props.skill} saveChanges={this.saveChanges} ref={this.modal}/>
      </div>
    )
  }
});
