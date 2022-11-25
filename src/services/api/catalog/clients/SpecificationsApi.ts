import { Id } from "../../../../aliases/Id";
import { ApiService } from "../../ApiService";
import { Identifiable } from "../../types/Identifiable";
import { PaginatedResponse } from "../../types/PaginatedReponse";
import { PaginatedRequestPayload } from "../../types/PaginatedRequestPayload";
import { SpecificationModel } from "../models/SpecificationModel";
import { SpecificationOptionModel } from "../models/SpecificationOptionModel";

export class SpecificationsApi {
  static options = {
    add: SpecificationsApi.addOption,
    remove: SpecificationsApi.removeOption,
  };

  static async list({
    page,
    perPage,
  }: PaginatedRequestPayload): Promise<PaginatedResponse<SpecificationModel>> {
    return ApiService.get({
      url: "/catalog/specifications",
      params: { page, perPage },
    });
  }

  static async show({ id }: Identifiable): Promise<SpecificationModel> {
    return ApiService.get({
      url: `/catalog/specifications/${id}`,
    });
  }

  static async update({
    id,
    ...data
  }: Identifiable &
    Partial<
      Omit<SpecificationModel, "id" | "options">
    >): Promise<SpecificationModel> {
    return ApiService.patch({
      url: `/catalog/specifications/${id}`,
      data,
    });
  }

  static async create(
    specification: Omit<SpecificationModel, "id" | "options">
  ): Promise<SpecificationModel> {
    return ApiService.post({
      url: `/catalog/specifications`,
      data: specification,
    });
  }

  static async remove({ id }: Identifiable): Promise<SpecificationModel> {
    return ApiService.delete({
      url: `/catalog/specifications/${id}`,
    });
  }

  private static async addOption({
    specificationId,
    ...data
  }: Omit<SpecificationOptionModel, "id">) {
    return ApiService.post({
      url: `/catalog/specifications/${specificationId}/options`,
      data,
    });
  }

  private static async removeOption({
    specificationId,
    optionId,
  }: {
    specificationId: Id;
    optionId: Id;
  }) {
    return ApiService.delete({
      url: `/catalog/specifications/${specificationId}/options/${optionId}`,
    });
  }
}
