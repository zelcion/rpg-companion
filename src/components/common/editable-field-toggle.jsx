import React from "react";

export class EditableFieldToggle extends React.Component {
  constructor (props) {
    super(props);

    this.state = {
      editing: false,
      value: this.props.value,
    }

    this.edit = this.edit.bind(this);
    this.end = this.end.bind(this);
    this.reset = this.reset.bind(this);
  }

  edit () {
    this.setState({ editing: true });
  }

  end () {
    this.props.updateInstructions(this.state.value);
    this.reset();
  }

  reset () {
    this.setState({ editing:false })
  }

  textOrInput () {
    if (!this.state.editing) {
      return <p className={this.props.textStyle} onClick={this.edit}> {this.props.formatting(this.props.value)} </p>
    }

    const inputField = <input
      value={this.state.value}
      onBlur={this.end}
      onKeyPress={(ev) => { if (ev.key === 'Enter') { this.end() }}}
      onChange={(ev) => this.setState({ value: ev.target.value })}
    />;

    return (
      <p className={this.props.textStyle}>
        {this.props.formatting(inputField)}
      </p>
    )
  }

  render () {
    return (
      <div className={this.props.containerStyle}>
        {this.textOrInput()}
      </div>
    );
  }
}
