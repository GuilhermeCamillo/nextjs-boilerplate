"use server";

import axios from "axios";

export const sendDiscordMessage = async (message: string) => {
  try {
    await axios.post(
      "https://discord.com/api/webhooks/1288608712243679305/9aEtKX1vYRHRl9HMwNCRiAHCYhIp9xne5yDDnwNC-qiE1t5s_xEi7r1U-5Mty56PFmqx",
      {
        content: message,
      },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
  } catch (err: any) {
    console.log(err);
  }
};
