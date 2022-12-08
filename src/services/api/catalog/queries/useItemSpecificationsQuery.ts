import { useQuery } from "react-query";
import { Id } from "../../../../aliases/Id";
import { ApplicationStore } from "../../../stores/application/ApplicationStore";
import { QUERIES } from "../../constants/Queries";
import { QueryOptions } from "../../types/QueryOptions";
import { ItemsApi } from "../clients/ItemsApi";

export const useItemsSpecificationsQuery = ({
  itemId,
  options,
}: {
  itemId: Id;
  options?: QueryOptions<typeof ItemsApi.Specifications.list>;
}) => {
  const companyId = ApplicationStore.use.companyId() as number;

  return useQuery(
    [QUERIES.CATALOG.ITEM_SPECIFICATIONS, itemId, companyId],
    () =>
      ItemsApi.Specifications.list({
        itemId,
        companyId,
      }),
    options
  );
};
