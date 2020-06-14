import React from "react";
import { observer } from "mobx-react"
import { store } from "../store";

class WebhookInputControl extends React.Component {
  constructor (props) {
    super(props);

    this.handleChange = this.handleChange.bind(this);
  }

  handleChange (ev) {
    store.webhookUrl = ev.currentTarget.value;
  }

  render () {
    return <input value={store.webhookUrl} onChange={this.handleChange} placeholder="Discord webhook"/>
  }
}

export const WebhookInput = observer(WebhookInputControl);