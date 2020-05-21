import React from "react";
import { store } from "../../store";

const preventDefaultWrapper = (func) => {
  return (e) => {
    e.preventDefault();
    e.stopPropagation();
    func();
  }
}

export class Attribute extends React.Component {
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


    return (
      <div className="attribute" onClick={() => this.toggleEditing()}>
        <p className="title"> {this.props.name} </p>
        <p className="value"> {minusButton} {this.props.value} {plusButton} </p>
        <p className="bonus"> {this.props.bonus} </p>
      </div>
    )
  }
}
