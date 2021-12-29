import prisma from "@/lib/prisma";
import { NextApiRequest, NextApiResponse } from "next";
import { getSession } from "next-auth/react";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const session = await getSession({ req });
    const { userId } = req.query as { userId: string };

    if (!session?.user.id || session.user.id !== userId) {
      return res.status(401).end("Not authenticated");
    }
    switch (req.method) {
      case "GET": {
        const entry = await prisma.user.findUnique({
          where: { id: userId },
        });
        return res.status(200).json(entry);
      }
      case "PUT": {
        const updateEntry = await prisma.user.update({
          where: { id: userId },
          data: { ...req.body },
        });
        return res.status(200).json(updateEntry);
      }
      default:
        return res.status(405).end(`Method ${req.method} Not Allowed`);
    }
  } catch (error) {
    return res.status(500).json({ error });
  }
};

export default handler;
