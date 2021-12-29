import { NextApiRequest, NextApiResponse } from "next";
import { getSession } from "next-auth/react";
import prisma from "@/lib/prisma";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const session = await getSession({ req });
    const { linkId } = req.query as { linkId: string };

    if (!session?.user.id) {
      return res.status(401).end("Not authenticated");
    }
    switch (req.method) {
      case "PUT": {
        const newEntry = await prisma.link.update({
          where: { id: linkId },
          data: { ...req.body },
        });
        return res.status(200).json(newEntry);
      }
      case "DELETE": {
        const deleteEntry = await prisma.link.delete({
          where: { id: linkId },
        });
        return res.status(200).json(deleteEntry);
      }
      default:
        return res.status(405).end(`Method ${req.method} Not Allowed`);
    }
  } catch (error) {
    return res.status(500).json({ error });
  }
};

export default handler;
