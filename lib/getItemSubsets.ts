import Subset from '../models/item/subset';
import { bricklink } from '../services/bricklink';

export default async function getItemSubsets(
  setNumber: string
): Promise<Subset[]> {
  let url = `https://api.bricklink.com/api/store/v1/items/SET/${setNumber}/subsets`;

  let subsets: Subset[] = [];

  return new Promise(async (resolve) => {
    await bricklink.get(
      url,
      process.env.BRICKLINK_TOKEN!,
      process.env.BRICKLINK_TOKEN_SECRET!,
      (error: any, data: any) => {
        if (!error) {
          subsets = JSON.parse(data).data[0].entries;
        }

        resolve(subsets);
      }
    );
  });
}
