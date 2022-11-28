import { PaginationResponsePayload } from "./PaginationResponsePayload";

export interface PaginatedResponse<T> {
  results: T[];
  pagination: PaginationResponsePayload;
}
