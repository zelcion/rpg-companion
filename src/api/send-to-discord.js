import axios from "axios";
import { store } from "../store";

export class DiscordService {
  constructor () {                          // Our server's webhook
    this.webhookUrl = store.webhookUrl || "https://discordapp.com/api/webhooks/718864503034478634/g-kv6A9jB6WLHLs3L-eMvAGKUt7FHPgBwbKQO-IDqTI27DvQ8jGnmhzxWNK1NkQ7U4TF";
  }

  sendMessage(content) {
    return axios.post(this.webhookUrl, { content });
  }
}