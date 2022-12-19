import { ISOString } from "../../../../aliases/ISOString";
import { ImageModel } from "../../core/models/ImageModel";
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
  images: ImageModel[];
}
