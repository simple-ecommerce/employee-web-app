import { useQuery } from "react-query";
import { ApplicationStore } from "../../../stores/application/ApplicationStore";
import { QUERIES } from "../../constants/Queries";
import { PayloadWithCompanyId } from "../../types/PayloadWithCompanyId";
import { QueryOptions } from "../../types/QueryOptions";
import { SpecificationCategoriesApi } from "../clients/SpecificationCategoriesApi";

export const useSpecificationCategoriesQuery = ({
  page,
  perPage,
  options,
}: {
  page: number;
  perPage: number;
  options?: QueryOptions<typeof SpecificationCategoriesApi.list>;
}) => {
  const companyId = ApplicationStore.use.companyId() as number;

  return useQuery(
    [QUERIES.CATALOG.SPECIFICATION_CATEGORIES, page, perPage, companyId],
    () =>
      SpecificationCategoriesApi.list({
        page,
        perPage,
        companyId,
      }),
    options
  );
};
