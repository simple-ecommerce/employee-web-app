import { ISOString } from "../../../../aliases/ISOString";
import { Identifiable } from "../../types/Identifiable";

export interface ItemModel extends Identifiable {
  name: string;
  shortDescription: string;
  longDescription: string;
  price: number;
  sku: string;
  ean: string;
  upc: string;
  gtin: string;
  brand: string;
  createdAt: ISOString;
  updatedAt: ISOString;
}
