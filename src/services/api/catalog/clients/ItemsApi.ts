import { Identifiable } from "../../types/Identifiable";
import { ApiService } from "../../ApiService";
import { ItemModel } from "../models/ItemModel";
import { PaginatedResponse } from "../../types/PaginatedResponse";
import { PaginatedRequestPayload } from "../../types/PaginatedRequestPayload";
import { PayloadWithCompanyId } from "../../types/PayloadWithCompanyId";
import { Id } from "../../../../aliases/Id";
import { ItemSpecificationModel } from "../models/ItemSpecificationModel";
import { ImageModel } from "../../core/models/ImageModel";

export class ItemsApi {
  static Specifications = {
    add: ItemsApi.addSpecification,
    remove: ItemsApi.removeSpecification,
    list: ItemsApi.listSpecifications,
  };

  static Images = {
    add: ItemsApi.addImage,
    remove: ItemsApi.removeImage,
    update: ItemsApi.updateImage,
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
  } & PaginatedRequestPayload): Promise<
    PaginatedResponse<ItemSpecificationModel>
  > {
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
      url: `/v1/catalog/items/${itemId}/specifications`,
      data: { companyId, priceExtra, specificationId },
    });
  }

  static async addImage({
    companyId,
    itemId,
    images,
  }: {
    companyId: Id;
    itemId: Id;
    images: FileList;
  }): Promise<ImageModel[]> {
    const formData = new FormData();
    formData.append("company_id", String(companyId));
    for (const file of images) {
      formData.append("files", file);
    }

    return ApiService.client.post(
      `/v1/catalog/items/${itemId}/images`,
      formData,
      {
        headers: {
          "Content-Type": `multipart/form-data`,
        },
      }
    );
  }

  static async removeImage({
    companyId,
    itemId,
    imageId,
  }: {
    companyId: Id;
    itemId: Id;
    imageId: Id;
  }) {
    return ApiService.delete({
      url: `/v1/catalog/items/${itemId}/images/${imageId}`,
      params: { companyId },
    });
  }

  static async updateImage({
    companyId,
    itemId,
    imageId,
    position,
  }: {
    companyId: Id;
    itemId: Id;
    imageId: Id;
    position: number;
  }) {
    return ApiService.patch({
      url: `/v1/catalog/items/${itemId}/images/${imageId}`,
      data: { companyId, position },
    });
  }
}
