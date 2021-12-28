import prisma from "@/lib/prisma";
import { NextApiRequest, NextApiResponse } from "next";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const { username } = req.query as { username: string };
    switch (req.method) {
      case "GET": {
        const entry = await prisma.user.findUnique({
          where: { username },
          select: { username: true },
        });
        console.log(entry);
        return res.status(200).json(entry || {});
      }
      default:
        return res.status(405).end(`Method ${req.method} Not Allowed`);
    }
  } catch (error) {
    return res.status(500).json({ error });
  }
};

export default handler;
