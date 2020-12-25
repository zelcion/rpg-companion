import React from "react";
import { observer } from "mobx-react";

class ModalContainer extends React.Component {
  constructor (props) {
    super(props);
  }

  render() {
    return (
      <div className="mods-modal-bg" onClick={this.props.dismiss}>
        <div className="card" onClick={(e) => e.stopPropagation()}>
          <p className="title"> {this.props.title} </p>
          {this.props.children}
          <button className="close" onClick={this.props.dismiss}> × </button>
        </div>
      </div>

    );
  }
}

export const Modal = observer(ModalContainer);