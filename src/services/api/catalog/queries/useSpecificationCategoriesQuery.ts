import { useQuery } from "react-query";
import { Id } from "../../../../aliases/Id";
import { ApplicationStore } from "../../../stores/application/ApplicationStore";
import { QUERIES } from "../../constants/Queries";
import { PayloadWithCompanyId } from "../../types/PayloadWithCompanyId";
import { QueryOptions } from "../../types/QueryOptions";
import { SpecificationCategoriesApi } from "../clients/SpecificationCategoriesApi";

export const useSpecificationCategoriesQuery = ({
  page = 1,
  perPage = 10000,
  options,
  itemId,
}: {
  page?: number;
  perPage?: number;
  itemId?: Id;
  options?: QueryOptions<typeof SpecificationCategoriesApi.list>;
} = {}) => {
  const companyId = ApplicationStore.use.companyId() as number;

  return useQuery(
    [
      QUERIES.CATALOG.SPECIFICATION_CATEGORIES,
      page,
      perPage,
      companyId,
      itemId,
    ],
    () =>
      SpecificationCategoriesApi.list({
        page,
        perPage,
        companyId,
        itemId,
      }),
    options
  );
};
