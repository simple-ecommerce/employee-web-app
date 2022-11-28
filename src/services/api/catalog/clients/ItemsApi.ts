import { Identifiable } from "../../types/Identifiable";
import { ApiService } from "../../ApiService";
import { ItemModel } from "../models/ItemModel";
import { PaginatedResponse } from "../../types/PaginatedResponse";
import { PaginatedRequestPayload } from "../../types/PaginatedRequestPayload";

export class ItemsApi {
  static async list({
    page,
    perPage,
  }: PaginatedRequestPayload): Promise<PaginatedResponse<ItemModel>> {
    return ApiService.get({
      url: "/v1/catalog/items",
      params: { page, perPage },
    });
  }

  static async show({ id }: Identifiable): Promise<ItemModel> {
    return ApiService.get<ItemModel>({
      url: `/v1/catalog/items/${id}`,
    });
  }

  static async create(data: Omit<ItemModel, "id">) {
    return ApiService.post<Omit<ItemModel, "id">, ItemModel>({
      url: "/v1/catalog/items",
      data,
    });
  }

  static async update({
    id,
    ...data
  }: Omit<Partial<ItemModel>, "id"> & Identifiable) {
    return ApiService.patch<Omit<Partial<ItemModel>, "id">, ItemModel>({
      url: `/v1/catalog/items/${id}`,
      data,
    });
  }

  static async remove({ id }: Identifiable): Promise<ItemModel> {
    return ApiService.delete({
      url: `/v1/catalog/items/${id}`,
    });
  }
}
