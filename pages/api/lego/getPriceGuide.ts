import { NextApiRequest, NextApiResponse } from 'next';

import { bricklink } from '../../../services/bricklink';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  let item = req.body.selectedItem;
  let type = req.body.type;
  let id = req.body.id;

  let promise = await new Promise(async (resolve, reject) => {
    await bricklink.get(
      `https://api.bricklink.com/api/store/v1/items/${type}/${id}/price?new_or_used=N&currency_code=EUR&guide_type=sold`,
      process.env.BRICKLINK_TOKEN!,
      process.env.BRICKLINK_TOKEN_SECRET!,
      (error, data) => {
        if (!error && typeof data == "string") {
          let priceGuide = JSON.parse(data);

          if (priceGuide.data) {
            let history = priceGuide.data.price_detail.map(
              (detail: { unit_price: string; date_ordered: string }) => {
                return {
                  value: parseFloat(detail.unit_price),
                  date: new Date(detail.date_ordered),
                };
              }
            );

            item.avgPrice = parseFloat(priceGuide.data.avg_price);
            item.history = history;

            resolve(item);
          } else {
            res.status(500).send(`Item ${id} cannot be added due some error`);
          }
        } else {
          res.status(500).send(`Item ${id} cannot be added due some error`);
        }
      }
    );
  });

  res.status(200).send(promise);
}
