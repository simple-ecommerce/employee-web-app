import { Id } from "../../../../aliases/Id";
import { ApiService } from "../../ApiService";
import { Identifiable } from "../../types/Identifiable";
import { PaginatedResponse } from "../../types/PaginatedResponse";
import { PaginatedRequestPayload } from "../../types/PaginatedRequestPayload";
import { SpecificationCategoryModel } from "../models/SpecificationCategoryModel";
import { SpecificationModel } from "../models/SpecificationModel";
import { PayloadWithCompanyId } from "../../types/PayloadWithCompanyId";

export class SpecificationCategoriesApi {
  static specifications = {
    add: SpecificationCategoriesApi.createSpecification,
    remove: SpecificationCategoriesApi.removeSpecification,
  };

  static async list({
    page,
    perPage,
    companyId,
  }: PaginatedRequestPayload & PayloadWithCompanyId): Promise<
    PaginatedResponse<SpecificationCategoryModel>
  > {
    return ApiService.get({
      url: "/v1/catalog/specification_categories",
      params: { page, perPage, companyId },
    });
  }

  static async show({
    id,
    companyId,
  }: Identifiable & PayloadWithCompanyId): Promise<SpecificationCategoryModel> {
    return ApiService.get({
      url: `/v1/catalog/specification_categories/${id}`,
      params: { companyId },
    });
  }

  static async update({
    id,
    ...data
  }: Partial<Omit<SpecificationCategoryModel, "id" | "options">> &
    Identifiable &
    PayloadWithCompanyId): Promise<SpecificationCategoryModel> {
    return ApiService.patch({
      url: `/v1/catalog/specification_categories/${id}`,
      data,
    });
  }

  static async create(
    specification: Partial<Omit<SpecificationCategoryModel, "id" | "options">> &
      Identifiable &
      PayloadWithCompanyId
  ): Promise<SpecificationCategoryModel> {
    return ApiService.post({
      url: `/v1/catalog/specification_categories`,
      data: specification,
    });
  }

  static async remove({
    id,
    companyId,
  }: Identifiable & PayloadWithCompanyId): Promise<SpecificationCategoryModel> {
    return ApiService.delete({
      url: `/v1/catalog/specification_categories/${id}`,
      params: { companyId },
    });
  }

  private static async createSpecification({
    specificationCategoryId,
    ...data
  }: Omit<SpecificationModel, "id"> & PayloadWithCompanyId) {
    return ApiService.post({
      url: `/v1/catalog/specification_categories/${specificationCategoryId}/specifications`,
      data,
    });
  }

  private static async removeSpecification({
    specificationCategoryId,
    specificationId,
  }: {
    specificationCategoryId: Id;
    specificationId: Id;
  }) {
    return ApiService.delete({
      url: `/v1/catalog/specification_categories/${specificationCategoryId}/specifications/${specificationId}`,
    });
  }
}