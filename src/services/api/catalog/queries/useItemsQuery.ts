import { useQuery } from "react-query";
import { PaginatedRequestPayload } from "../../types/PaginatedRequestPayload";
import { QueryOptions } from "../../types/QueryOptions";
import { ItemsApi } from "../clients/ItemsApi";
import { QUERIES } from "../../constants/Queries";
import { PayloadWithCompanyId } from "../../types/PayloadWithCompanyId";

export const useItemsQuery = ({
  options,
  page = 1,
  perPage = 10000,
  companyId,
}: {
  options?: QueryOptions<typeof ItemsApi.list>;
} & Partial<PaginatedRequestPayload> &
  PayloadWithCompanyId) =>
  useQuery(
    [QUERIES.CATALOG.ITEMS, page, perPage],
    () => ItemsApi.list({ page, perPage, companyId }),
    options
  );
