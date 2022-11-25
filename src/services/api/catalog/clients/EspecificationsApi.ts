import { Id } from "../../../../aliases/Id";
import { ApiService } from "../../ApiService";
import { Identifiable } from "../../types/Identifiable";
import { PaginatedResponse } from "../../types/PaginatedReponse";
import { PaginatedRequestPayload } from "../../types/PaginatedRequestPayload";
import { EspecificationModel } from "../models/EspecificationModel";
import { EspecificationOptionModel } from "../models/EspecificationOptionModel";

export class EspecificationsApi {
  static options = {
    add: EspecificationsApi.addOption,
    remove: EspecificationsApi.removeOption,
  };

  static async list({
    page,
    perPage,
  }: PaginatedRequestPayload): Promise<PaginatedResponse<EspecificationModel>> {
    return ApiService.get({
      url: "/catalog/especifications",
      params: { page, perPage },
    });
  }

  static async show({ id }: Identifiable): Promise<EspecificationModel> {
    return ApiService.get({
      url: `/catalog/especifications/${id}`,
    });
  }

  static async update({
    id,
    ...data
  }: Identifiable &
    Partial<
      Omit<EspecificationModel, "id" | "options">
    >): Promise<EspecificationModel> {
    return ApiService.patch({
      url: `/catalog/especifications/${id}`,
      data,
    });
  }

  static async create(
    especification: Omit<EspecificationModel, "id" | "options">
  ): Promise<EspecificationModel> {
    return ApiService.post({
      url: `/catalog/especifications`,
      data: especification,
    });
  }

  static async remove({ id }: Identifiable): Promise<EspecificationModel> {
    return ApiService.delete({
      url: `/catalog/especifications/${id}`,
    });
  }

  private static async addOption({
    especificationId,
    ...data
  }: Omit<EspecificationOptionModel, "id">) {
    return ApiService.post({
      url: `/catalog/especifications/${especificationId}/options`,
      data,
    });
  }

  private static async removeOption({
    especificationId,
    optionId,
  }: {
    especificationId: Id;
    optionId: Id;
  }) {
    return ApiService.delete({
      url: `/catalog/especifications/${especificationId}/options/${optionId}`,
    });
  }
}
