import { Id } from "../../../../aliases/Id";
import { ApiService } from "../../ApiService";
import { Identifiable } from "../../types/Identifiable";
import { PaginatedResponse } from "../../types/PaginatedResponse";
import { PaginatedRequestPayload } from "../../types/PaginatedRequestPayload";
import { SpecificationCategoryModel } from "../models/SpecificationCategoryModel";
import { SpecificationModel } from "../models/SpecificationModel";

export class SpecificationCategoriesApi {
  static specifications = {
    add: SpecificationCategoriesApi.createSpecification,
    remove: SpecificationCategoriesApi.removeSpecification,
  };

  static async list({
    page,
    perPage,
  }: PaginatedRequestPayload): Promise<
    PaginatedResponse<SpecificationCategoryModel>
  > {
    return ApiService.get({
      url: "/v1/catalog/specification_categories",
      params: { page, perPage },
    });
  }

  static async show({ id }: Identifiable): Promise<SpecificationCategoryModel> {
    return ApiService.get({
      url: `/v1/catalog/specification_categories/${id}`,
    });
  }

  static async update({
    id,
    ...data
  }: Identifiable &
    Partial<
      Omit<SpecificationCategoryModel, "id" | "options">
    >): Promise<SpecificationCategoryModel> {
    return ApiService.patch({
      url: `/v1/catalog/specification_categories/${id}`,
      data,
    });
  }

  static async create(
    specification: Partial<Omit<SpecificationCategoryModel, "id" | "options">> &
      Identifiable
  ): Promise<SpecificationCategoryModel> {
    return ApiService.post({
      url: `/v1/catalog/specification_categories`,
      data: specification,
    });
  }

  static async remove({
    id,
  }: Identifiable): Promise<SpecificationCategoryModel> {
    return ApiService.delete({
      url: `/v1/catalog/specification_categories/${id}`,
    });
  }

  private static async createSpecification({
    specificationCategoryId,
    ...data
  }: Omit<SpecificationModel, "id">) {
    return ApiService.post({
      url: `/v1/catalog/specification_categories/${specificationCategoryId}/specifications`,
      data,
    });
  }

  private static async removeSpecification({
    specificationId,
    optionId,
  }: {
    specificationId: Id;
    optionId: Id;
  }) {
    return ApiService.delete({
      url: `/v1/catalog/specification_categories/${specificationId}/specifications/${optionId}`,
    });
  }
}
