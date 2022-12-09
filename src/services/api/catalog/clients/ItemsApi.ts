import { Identifiable } from "../../types/Identifiable";
import { ApiService } from "../../ApiService";
import { ItemModel } from "../models/ItemModel";
import { PaginatedResponse } from "../../types/PaginatedResponse";
import { PaginatedRequestPayload } from "../../types/PaginatedRequestPayload";
import { PayloadWithCompanyId } from "../../types/PayloadWithCompanyId";
import { Id } from "../../../../aliases/Id";

export class ItemsApi {
  static Specifications = {
    add: ItemsApi.addSpecification,
    remove: ItemsApi.removeSpecification,
    list: ItemsApi.listSpecifications,
  };

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

  static async listSpecifications({
    itemId,
    companyId,
    page,
    perPage,
  }: {
    itemId: Id;
    companyId: Id;
  } & PaginatedRequestPayload) {
    return ApiService.get({
      url: `/v1/catalog/items/${itemId}/specifications`,
      params: { companyId, perPage, page },
    });
  }

  static async removeSpecification({
    companyId,
    itemId,
    specificationId,
  }: {
    itemId: Id;
    companyId: Id;
    specificationId: Id;
  }) {
    return ApiService.delete({
      url: `/v1/catalog/items/${itemId}/specifications/${specificationId}`,
      params: { companyId },
    });
  }

  static async addSpecification({
    companyId,
    itemId,
    specificationId,
    priceExtra = 0,
  }: {
    itemId: Id;
    companyId: Id;
    specificationId: Id;
    priceExtra?: number;
  }) {
    return ApiService.post({
      url: `/v1/catalog/items/${itemId}/specifications/${specificationId}`,
      data: { companyId, priceExtra },
    });
  }
}
