import { useQuery } from "react-query";
import { Id } from "../../../../aliases/Id";
import { ApplicationStore } from "../../../stores/application/ApplicationStore";
import { QUERIES } from "../../constants/Queries";
import { PaginatedRequestPayload } from "../../types/PaginatedRequestPayload";
import { QueryOptions } from "../../types/QueryOptions";
import { ItemsApi } from "../clients/ItemsApi";

export const useItemsSpecificationsQuery = ({
  itemId,
  options,
  page = 1,
  perPage = 10000,
}: {
  itemId: Id;
  options?: QueryOptions<typeof ItemsApi.Specifications.list>;
} & Partial<PaginatedRequestPayload>) => {
  const companyId = ApplicationStore.use.companyId() as number;

  return useQuery(
    [QUERIES.CATALOG.ITEM_SPECIFICATIONS, itemId, companyId, page, perPage],
    () =>
      ItemsApi.Specifications.list({
        itemId,
        companyId,
        page,
        perPage,
      }),
    options
  );
};
