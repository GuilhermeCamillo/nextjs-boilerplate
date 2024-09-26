"use server";

import axios from "axios";

export const sendDiscordMessage = async (channel: string, message: string) => {
  try {
    await axios.post(channel, {
      content: message,
    });
  } catch (err: any) {
    console.log(err);
  }
};
