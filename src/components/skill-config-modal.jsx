import React from "react";
import {
  validTypes,
  validEffects,
  validActivations,
  validAttributes,
} from "../enums/skill-constants";

export class SkillConfigModal extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      isSeen: false,

      name: this.props.skill.name,
      type: this.props.skill.type,
      activation: this.props.skill.activation,
      effects: this.props.skill.effects,
      size: this.props.skill.size,
      auxiliaryAttribute: this.props.skill.auxiliaryAttribute,
      range: this.props.skill.range,
      description: this.props.skill.description,
    };

    this.updateProperty = this.updateProperty.bind(this);
    this.selectEffect = this.selectEffect.bind(this);
    this.removeEffect = this.removeEffect.bind(this);
    this.saveChanges = this.saveChanges.bind(this);
    this.cancel = this.cancel.bind(this);
    this.reset = this.reset.bind(this);
  }

  updateProperty(propName) {
    return ev => {
      const newState = {};
      newState[propName] = ev.target.value;

      this.setState(newState);
    };
  }

  selectEffect(event) {
    const newEffectsList = [...this.state.effects];
    newEffectsList.push(event.target.value);
    this.setState({ effects: newEffectsList });
  }

  removeEffect(index) {
    const newEffectsList = [...this.state.effects];
    newEffectsList.splice(index, 1);

    this.setState({ effects: newEffectsList });
  }

  hasEmptyState() {
    return (
      this.state.name === "" ||
      this.state.type === "" ||
      this.state.description === ""
    );
  }

  hasInvalidState() {
    return (
      this.state.range > 100 ||
      this.state.range < 0 ||
      this.state.size > 10 ||
      this.state.size < 1
    );
  }

  saveChanges() {
    if (this.hasEmptyState() || this.hasInvalidState()) {
      // TODO Adicionar notificação;
      console.log;
      return;
    }

    this.props.saveChanges(this.state);
    this.setState({ isSeen: false });
  }

  cancel() {
    this.setState({ isSeen: false });
    this.reset();
  }

  reset() {
    this.setState({
      name: this.props.skill.name,
      type: this.props.skill.type,
      activation: this.props.skill.activation,
      effects: this.props.skill.effects,
      size: this.props.skill.size,
      auxiliaryAttribute: this.props.skill.auxiliaryAttribute,
      range: this.props.skill.range,
      description: this.props.skill.description,
    });
  }

  render() {
    if (!this.state.isSeen) {
      return null;
    }

    const typeOptions = validTypes.map(type => (
      <option key={type}> {type} </option>
    ));
    const effectsOptions = validEffects.map(effect => (
      <option key={effect}> {effect} </option>
    ));
    const activationOptions = validActivations.map(activation => (
      <option key={activation}> {activation} </option>
    ));
    let auxiliaryOptions = validAttributes.map(attributes => (
      <option key={attributes}> {attributes} </option>
    ));
    auxiliaryOptions.unshift(
      <option key="-1" value="select">
        {" "}
        Selecione...{" "}
      </option>,
    );

    const effectsList = this.state.effects.map((effect, i) => {
      return (
        <li key={effect + i}>
          {" "}
          {effect}{" "}
          <button className="minus" onClick={() => this.removeEffect(i)}>
            {" "}
            ×{" "}
          </button>{" "}
        </li>
      );
    });

    if (this.state.type !== "attack") {
      auxiliaryOptions = [<option key={0}> Não se aplica </option>];
    }

    return (
      <div className="modal-background">
        {" "}
        <div className="card">
          <div>
            <label> Nome </label>
            <input
              value={this.state.name}
              onChange={this.updateProperty("name")}
              placeholder="Nome da sua incrível habilidade"
            />
          </div>

          <div>
            <label> Alcance </label>
            <input
              type="number"
              min="1"
              max="100"
              value={this.state.range}
              onChange={this.updateProperty("range")}
            />
          </div>

          <div>
            <label> Tamanho </label>
            <input
              type="number"
              min="1"
              max="10"
              value={this.state.size}
              onChange={this.updateProperty("size")}
            />
          </div>

          <div>
            <label> Tipo </label>
            <select
              value={this.state.type}
              onChange={this.updateProperty("type")}
              default="select"
            >
              <option value="select"> Selecione... </option>
              {typeOptions}
            </select>
          </div>

          <div>
            <label> Ativação </label>
            <select
              value={this.state.activation}
              onChange={this.updateProperty("activation")}
              default="select"
            >
              <option value="select"> Selecione... </option>
              {activationOptions}
            </select>
          </div>

          <div>
            <label> Atributo Auxiliar </label>
            <select
              value={this.state.auxiliaryAttribute}
              onChange={this.updateProperty("auxiliaryAttribute")}
              default="select"
            >
              {auxiliaryOptions}
            </select>
          </div>

          <div>
            <p> Efeitos de Status </p>
            <div>
              <ul> {effectsList} </ul>
              <select value="Adicione..." onChange={this.selectEffect}>
                <option value="Adicione..."> Adicione... </option>
                {effectsOptions}
              </select>
            </div>
          </div>

          <div>
            <label> Descrição </label>
            <textarea
              value={this.state.description}
              onChange={this.updateProperty("description")}
              placeholder="O que sua habilidade faz"
              type="textbox"
              rows="5"
              cols="60"
            />
          </div>

          <div id="button-container">
            <button className="cancel-button" onClick={this.cancel}>
              {" "}
              Cancelar{" "}
            </button>
            <button className="main-button" onClick={this.saveChanges}>
              {" "}
              Finalizar Edição{" "}
            </button>
          </div>
        </div>{" "}
      </div>
    );
  }
}
