import React from "react";

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
      ? <button className="minus" onClick={preventDefaultWrapper(() => this.props.decrementFunction(this.props.name))}> - </button>
      : undefined;

    const plusButton = this.state.isEditing
      ? <button className="plus" onClick={preventDefaultWrapper(() => this.props.incrementFunction(this.props.name))}> + </button>
      : undefined;


    return (
      <div className="attribute" onClick={() => this.toggleEditing()}>
        {this.props.name}: {minusButton}{this.props.value}{plusButton} ({this.props.bonus})
      </div>
    )
  }
}
