import { ItemModel } from "../../services/api/catalog/models/ItemModel";

export const ItemLabels: { [key in keyof ItemModel]: {} } = {
  id: "ID",
  brand: "Brand",
  name: "Name",
  longDescription: "Long Description",
  shortDescription: "Short Description",
  price: "Price",
  ean: "EAN",
  sku: "SKU",
  upc: "UPC",
  gtin: "GTIN",
  createdAt: "Created At",
  updatedAt: "Updated At",
};
