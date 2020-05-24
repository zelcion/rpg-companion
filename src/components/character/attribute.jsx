import React from "react";
import { store } from "../../store";
import { attributeBonusCalc } from "../../helpers/attribute-bonus";
import { observer } from "mobx-react";

const preventDefaultWrapper = (func) => {
  return (e) => {
    e.preventDefault();
    e.stopPropagation();
    func();
  }
}

class AttributeContainer extends React.Component {
  constructor (props) {
    super(props);

    this.state = { isEditing: false };
    this.toggleEditing = this.toggleEditing.bind(this);
  }

  toggleEditing () {
    this.setState({
      isEditing: !this.state.isEditing,
    })
  }

  render () {
    const minusButton = this.state.isEditing
      ? <button className="minus" onClick={preventDefaultWrapper(() => store.character.decrementAttribute(this.props.name))}> - </button>
      : undefined;

    const plusButton = this.state.isEditing
      ? <button className="plus" onClick={preventDefaultWrapper(() => store.character.incrementAttribute(this.props.name))}> + </button>
      : undefined;


    const value = store.modifiers.getAttribute(this.props.name, this.props.value);

    return (
      <div className="attribute" onClick={() => this.toggleEditing()}>
        <p className="title"> {this.props.name} </p>
        <p className="value"> {minusButton} {value} {plusButton} </p>
        <p className="bonus"> {attributeBonusCalc(value)} </p>
      </div>
    )
  }
}

export const Attribute = observer(AttributeContainer);
