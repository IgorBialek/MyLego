// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import axios from 'axios';

import type { NextApiRequest, NextApiResponse } from "next";
type Response = {
  message: string;
  error: boolean;
  images?: string[];
  errorMessage?: { title: unknown; text: string };
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Response>
) {
  const setID = req.body.setID;

  const apiKey = process.env.BRICKSET_API_KEY;

  const imagesUrl = `https://brickset.com/api/v3.asmx/getAdditionalImages?apiKey=${apiKey}&setID=${setID}`;

  try {
    let response = await (await axios.get(imagesUrl)).data;

    if (response.status == "error") {
      throw response.message;
    } else {
      res.json({
        message: "Success",
        error: false,
        images: response.additionalImages.map(
          (ai: { thumbnailURL: string; imageURL: string }) => ai.imageURL
        ),
      });
    }
  } catch (e) {
    res.json({
      message: "Operation Failed",
      error: true,
      errorMessage: {
        title: e,
        text: "Brickset endpoint contains some problems, try again later 🤔.",
      },
    });
  }
}
