export interface PaginationResponsePayload {
  currentPage: number;
  nextPage: number | null;
  perPage: number;
  prevPage: number | null;
  totalPages: number;
  totalCount: number;
}
