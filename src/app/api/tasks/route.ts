import db from "../../../../prisma/database";
import { sendDiscordMessage } from "@/store/services/discord-service";
import { NextRequest, NextResponse } from "next/server";
import { DISCORD_WEBHOOK } from "@/store/services/discord-enum-webhooks";

export async function GET(req: NextRequest) {
  try {
    const tasks = await db.task.findMany({
      where: { userId: req.headers.get("authorization")! },
    });
    return NextResponse.json(tasks);
  } catch (error) {
    return NextResponse.json("Error");
  }
}

export async function POST(req: NextRequest) {
  try {
    const userId = req.headers.get("authorization");
    const formData = await req.json();
    const { title } = formData;

    if (userId) {
      const task = await db.task.create({
        data: {
          title: title,
          userId: userId,
        },
      });

      await sendDiscordMessage(DISCORD_WEBHOOK.LOG, `Task ${title} criada`);

      return NextResponse.json(task);
    }
  } catch (error) {
    return NextResponse.json("Error");
  }
}

// export async function PATCH(req: NextRequest) {
//   try {
//     const userId = req.headers.get("authorization");
//     const formData = await req.json();
//     const title = formData.title;

//     if (userId) {
//       const task = await db.task.create({
//         data: {
//           title: title,
//           userId: userId,
//         },
//       });

//       await sendDiscordMessage(DISCORD_WEBHOOK.LOG, `Task ${title} criada`);

//       return NextResponse.json(task);
//     }
//   } catch (error) {
//     return NextResponse.json("Error");
//   }
// }
