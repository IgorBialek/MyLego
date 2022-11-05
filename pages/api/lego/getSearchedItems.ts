// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import axios from 'axios';

import getItemSubsets from '../../../lib/getItemSubsets';
import Item from '../../../models/item/item';

import type { NextApiRequest, NextApiResponse } from "next";
type Response = {
  message: string;
  error: boolean;
  items?: any[];
  errorMessage?: { title: unknown; text: string };
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Response>
) {
  const query = req.body.query;

  const apiKey = process.env.BRICKSET_API_KEY;
  const userHash = process.env.BRICKSET_USER_HASH;

  const setsUrl = `https://brickset.com/api/v3.asmx/getSets?apiKey=${apiKey}&userHash=${userHash}&params={'query': '${query}', 'orderBy' : 'YearFromDESC', 'pageSize':'500'}`;
  const minifigsUrl = `https://brickset.com/api/v3.asmx/getMinifigCollection?apiKey=${apiKey}&userHash=${userHash}&params={'query': '${query}'}`;

  try {
    let setsResponse = await (await axios.get(setsUrl)).data;
    let minifigsResponse = await (await axios.get(minifigsUrl)).data;

    if (setsResponse.status == "error") {
      throw setsResponse.message;
    }

    if (minifigsResponse.status == "error") {
      throw minifigsResponse.message;
    }

    if (setsResponse && minifigsResponse) {
      let items: Item[] = await Promise.all(
        [...setsResponse.sets, ...minifigsResponse.minifigs].map(
          async (item: any, i: number) => {
            let name = item.name;
            let number = item.number ?? item.minifigNumber;
            let numberVariant = item.numberVariant ?? 1;
            let setID = item.setID ?? null;
            let retail = item.LEGOCom?.DE?.retailPrice ?? null;
            let image =
              item.image?.imageURL ??
              `https://img.bricklink.com/ML/${number}.jpg`;
            let type = item.number ? "SET" : "MINIFIG";
            let theme = item.theme;

            //Brickset and Bricklink integration

            if (
              item.packagingType === "Foil pack" &&
              item.category === "Normal" &&
              item.theme === "Collectable Minifigures"
            ) {
              //Get subsets
              let subsets = await getItemSubsets(`${number}-1`);

              if (subsets.length > 0) {
                number = subsets[0].item.no.split("-")[0];
                type = "SET";
              }
            }

            return new Item(
              name,
              number,
              numberVariant,
              setID,
              retail,
              image,
              type,
              theme
            );
          }
        )
      );

      res.json({ message: "Success", error: false, items });
    } else {
      res.json({ message: "No Items found", error: false });
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
