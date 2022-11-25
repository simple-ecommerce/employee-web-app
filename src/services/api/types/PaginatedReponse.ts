import { PaginationResponsePayload } from "./PaginationReponsePayload";

export interface PaginatedResponse<T> {
  results: T[];
  pagination: PaginationResponsePayload;
}
