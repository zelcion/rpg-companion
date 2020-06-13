import axios from "axios";
import { store } from "../store";

export class DiscordService {
  constructor () {                          // Our server's webhook
    this.webhookUrl = store.webhookUrl || "https://discordapp.com/api/webhooks/721171013605523538/zRp3fZcWLZCUMMy8UxumJToEgbLL90u8p2OKuKZpcQ0XS1HVBel3zPeWctfCJkQIi5uR";
  }

  sendMessage(content) {
    return axios.post(this.webhookUrl, { content });
  }
}