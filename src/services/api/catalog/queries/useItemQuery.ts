import { useQuery } from "react-query";
import { Identifiable } from "../../types/Identifiable";
import { QueryOptions } from "../../types/QueryOptions";
import { ItemsApi } from "../clients/ItemsApi";
import { QUERIES } from "../../constants/Queries";
import { PayloadWithCompanyId } from "../../types/PayloadWithCompanyId";
import { ApplicationStore } from "../../../stores/application/ApplicationStore";

export const useItemQuery = ({
  id,
  options,
}: {
  options: QueryOptions<typeof ItemsApi.show>;
} & Identifiable) => {
  const companyId = ApplicationStore.use.companyId() as number;

  return useQuery(
    [QUERIES.CATALOG.ITEM, id, companyId],
    () => ItemsApi.show({ id, companyId }),
    options
  );
};
