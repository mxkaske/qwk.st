import { NextApiRequest, NextApiResponse } from "next";
import { getSession } from "next-auth/react";
import prisma from "@/lib/prisma";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const session = await getSession({ req });

    if (!session?.user.id) {
      return res.status(401).end("Not authenticated");
    }
    switch (req.method) {
      case "POST": {
        console.log(req.body);
        const newEntry = await prisma.link.create({
          data: {
            ...req.body,
            userId: session.user.id,
          },
        });
        return res.status(200).json(newEntry);
      }
      case "GET": {
        const entries = await prisma.link.findMany({
          where: { userId: session.user.id },
        });
        return res.status(200).json(entries);
      }
      default:
        return res.status(405).end(`Method ${req.method} Not Allowed`);
    }
  } catch (error) {
    return res.status(500).json({ error });
  }
};

export default handler;
