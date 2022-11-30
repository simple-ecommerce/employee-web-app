import { useQuery } from "react-query";
import { PaginatedRequestPayload } from "../../types/PaginatedRequestPayload";
import { QueryOptions } from "../../types/QueryOptions";
import { ItemsApi } from "../clients/ItemsApi";
import { QUERIES } from "../../constants/Queries";

export const useItemsQuery = ({
  options,
  page = 1,
  perPage = 10000,
}: {
  options?: QueryOptions<typeof ItemsApi.list>;
} & Partial<PaginatedRequestPayload>) =>
  useQuery(
    [QUERIES.CATALOG.ITEMS, page, perPage],
    (context) =>
      ItemsApi.list({
        page,
        perPage,
        companyId: context?.meta?.companyId as number,
      }),
    options
  );
