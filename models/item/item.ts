export default class Item {
  name: string;

  number: string;
  numberVariant: number;

  id: string;

  setID: number | null;

  //Retail is in dollars
  retail: number | null;

  image: string;

  type: string;

  count: number;

  theme: string;

  avgPrice?: number;
  history?: { value: number; date: Date }[];

  constructor(
    name: string,
    number: string,
    numberVariant: number,
    setID: number | null,
    retail: number | null,
    image: string,
    type: string,
    theme: string
  ) {
    this.name = name;

    this.number = number;
    this.numberVariant = numberVariant;

    this.id = type != "MINIFIG" ? `${number}-${numberVariant}` : number;

    this.setID = setID;

    this.retail = retail;

    this.image = image;

    this.type = type;

    this.theme = theme;

    this.count = 1;
  }
}
