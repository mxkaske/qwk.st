import { NextApiRequest, NextApiResponse } from "next";
import formidable from "formidable";
import cloudinary from "cloudinary";
import { getSession } from "next-auth/react";
import prisma from "@/lib/prisma";

// @ts-ignore
cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.API_KEY,
  api_secret: process.env.API_SECRET,
});

export const config = {
  api: {
    bodyParser: false,
  },
};

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const session = await getSession({ req });

    if (!session.user.id) {
      return res.status(401).end("Not authenticated");
    }

    const data = await new Promise((resolve, reject) => {
      const form = new formidable.IncomingForm();

      form.parse(req, (err, fields, files) => {
        if (err) return reject(err);
        resolve({ fields, files });
      });
    });
    // @ts-ignore
    const { filepath, originalFilename } = data?.files?.file;
    const response = await cloudinary.v2.uploader.upload(filepath, {
      resource_type: "image",
      // public_id: "sample_id",
      folder: `${session.user.id}`,
    });

    await prisma.user.update({
      where: { id: session.user.id },
      data: {
        image: response.url,
      },
    });

    return res.json(response);
  } catch (error) {
    return res.status(500).json({ error });
  }
};

export default handler;
