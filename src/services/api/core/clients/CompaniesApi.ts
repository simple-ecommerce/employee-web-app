import { ApiService } from "../../ApiService";
import { PaginatedRequestPayload } from "../../types/PaginatedRequestPayload";
import { PaginatedResponse } from "../../types/PaginatedResponse";
import { CompanyModel } from "../models/CompanyModel";

export class CompaniesApi {
  static async list({ page, perPage }: PaginatedRequestPayload) {
    return await ApiService.get<PaginatedResponse<CompanyModel>>({
      url: `/v1/core/companies?page=${page}&perPage=${perPage}`,
    });
  }
}
