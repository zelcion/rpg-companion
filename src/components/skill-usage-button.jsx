import { observer } from "mobx-react";
import React from "react";
import { DiscordService } from "../api/send-to-discord";

class SkillUsageButtonComponent extends React.Component {
  constructor (props) {
    super(props);

    this.useSkill = this.useSkill.bind(this);
    this.discordService = new DiscordService();
  }

  useSkill(event) {
    event.stopPropagation();

    this.discordService.sendMessage(this.props.getMessage())
  }

  render() {
    return (
      <button className={this.props.className} onClick={this.useSkill}>
        {this.props.text}
      </button>
    )
  }
}

export const SkillUsageButton = observer(SkillUsageButtonComponent);