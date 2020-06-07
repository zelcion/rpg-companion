import axios from "axios";
import { store } from "../store";

export class DiscordService {
  constructor () {                          // Our server's webhook
    this.webhookUrl = store.webhookUrl || "https://discordapp.com/api/webhooks/716502333332258898/ELMxQYQ-b0RC_SHZaY1cItvFnO5d77CU7nlyYgTkj4hxM19kiFYou_pa0ypFk6RscN3y";
  }

  sendMessage(content) {
    return axios.post(this.webhookUrl, { content });
  }
}