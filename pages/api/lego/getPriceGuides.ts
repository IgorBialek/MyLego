import { NextApiRequest, NextApiResponse } from 'next';

import { bricklink } from '../../../services/bricklink';

const asyncForEach = require("async-await-foreach");

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  let items = req.body.selectedItems;
  let types = req.body.types;
  let ids = req.body.ids;

  let dataList: any[] = [];

  await asyncForEach(ids, async (id: string, i: number) => {
    dataList.push(
      await new Promise(async (resolve, reject) => {
        await bricklink.get(
          `https://api.bricklink.com/api/store/v1/items/${types[i]}/${id}/price?new_or_used=N&currency_code=EUR&guide_type=sold`,
          process.env.BRICKLINK_TOKEN!,
          process.env.BRICKLINK_TOKEN_SECRET!,
          (error, data) => {
            if (!error && typeof data == "string") {
              resolve(JSON.parse(data));
            } else {
              console.error(`ERROR ${id}`);
              reject();
            }
          }
        );
      })
    );
  });

  dataList.forEach((priceGuide, i) => {
    let history = priceGuide.data.price_detail.map(
      (detail: { unit_price: string; date_ordered: string }) => {
        return {
          value: parseFloat(detail.unit_price),
          date: new Date(detail.date_ordered),
        };
      }
    );

    items[i].avgPrice = parseFloat(priceGuide.data.avg_price);
    items[i].history = history;
  });

  res.status(200).send(items);
}
