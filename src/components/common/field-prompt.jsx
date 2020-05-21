import React from "react";

export class FieldPrompt extends React.Component {
  constructor (props) {
    super(props)

    this.state = {
      visible: false,
      result: this.props.defaultValue,
      updaterFunction: () => {}
    }

    this.begin = this.begin.bind(this);
    this.end = this.end.bind(this);
    this.reset = this.reset.bind(this);
  }

  begin (updaterFunction) {
    this.setState({ visible: true, updaterFunction });
  }

  end () {
    this.state.updaterFunction(this.state.result);
    this.reset();
  }

  reset () {
    this.setState({ visible:false, result: this.props.defaultValue })
  }

  render () {
    if (!this.state.visible) { return null; }

    return (
      <div className="field-prompt" onClick={(ev) => {ev.preventDefault(); ev.stopPropagation();}}>
        <label>
          <p className="title"> {this.props.title} </p>
          <input type={this.props.type}
            value={this.state.result}
            onChange={(ev) => this.setState({ result: ev.target.value})}
          />
        </label>

        <div>
          <button className="cancel" onClick={this.reset}> Cancel </button>
          <button className="confirm" onClick={this.end}> Ok </button>
        </div>
      </div>
    )
  }
}
