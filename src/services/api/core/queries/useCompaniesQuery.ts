import { useQuery } from "react-query";
import { QUERIES } from "../../constants/Queries";
import { PaginatedRequestPayload } from "../../types/PaginatedRequestPayload";
import { QueryOptions } from "../../types/QueryOptions";
import { CompaniesApi } from "../clients/CompaniesApi";

export const useCompaniesQuery = ({
  page = 1,
  perPage = 100,
  options,
}: {
  options?: QueryOptions<typeof CompaniesApi.list>;
} & Partial<PaginatedRequestPayload> = {}) =>
  useQuery(
    [QUERIES.CORE.COMPANIES, page, perPage],
    () => CompaniesApi.list({ page, perPage }),
    options
  );
