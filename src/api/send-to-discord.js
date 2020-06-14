import axios from "axios";
import { store } from "../store";

export class DiscordService {
  sendMessage(content) {
    return axios.post(store.webhookUrl, { content });
  }
}