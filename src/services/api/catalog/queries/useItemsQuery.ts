import { useQuery } from "react-query";
import { PaginatedRequestPayload } from "../../types/PaginatedRequestPayload";
import { QueryOptions } from "../../types/QueryOptions";
import { ItemsApi } from "../clients/ItemsApi";
import { QUERIES } from "../../constants/Queries";
import { ApplicationStore } from "../../../stores/application/ApplicationStore";

export const useItemsQuery = ({
  options,
  page = 1,
  perPage = 10000,
}: {
  options?: QueryOptions<typeof ItemsApi.list>;
} & Partial<PaginatedRequestPayload>) => {
  const companyId = ApplicationStore.use.companyId() as number;

  return useQuery(
    [QUERIES.CATALOG.ITEMS, page, perPage, companyId],
    () =>
      ItemsApi.list({
        page,
        perPage,
        companyId,
      }),
    options
  );
};
