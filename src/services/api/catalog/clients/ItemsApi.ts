import { Identifiable } from "../../types/Identifiable";
import { ApiService } from "../../ApiService";
import { ItemModel } from "../models/ItemModel";
import { PaginatedResponse } from "../../types/PaginatedResponse";
import { PaginatedRequestPayload } from "../../types/PaginatedRequestPayload";
import { PayloadWithCompanyId } from "../../types/PayloadWithCompanyId";

export class ItemsApi {
  static async list({
    page,
    perPage,
    companyId,
  }: PaginatedRequestPayload & PayloadWithCompanyId): Promise<
    PaginatedResponse<ItemModel>
  > {
    return ApiService.get({
      url: "/v1/catalog/items",
      params: { page, perPage, companyId },
    });
  }

  static async show({
    id,
    companyId,
  }: Identifiable & PayloadWithCompanyId): Promise<ItemModel> {
    return ApiService.get<ItemModel>({
      url: `/v1/catalog/items/${id}`,
      params: { companyId },
    });
  }

  static async create(data: Omit<ItemModel, "id"> & PayloadWithCompanyId) {
    return ApiService.post<Omit<ItemModel, "id">, ItemModel>({
      url: "/v1/catalog/items",
      data,
    });
  }

  static async update({
    id,
    ...data
  }: Omit<Partial<ItemModel>, "id" | "companyId"> &
    Identifiable &
    PayloadWithCompanyId) {
    return ApiService.patch<Omit<Partial<ItemModel>, "id">, ItemModel>({
      url: `/v1/catalog/items/${id}`,
      data,
    });
  }

  static async remove({
    id,
    companyId,
  }: Identifiable & PayloadWithCompanyId): Promise<ItemModel> {
    return ApiService.delete({
      url: `/v1/catalog/items/${id}`,
      params: { companyId },
    });
  }
}
