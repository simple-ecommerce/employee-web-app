import { useQuery } from "react-query";
import { QUERIES } from "../../constants/Queries";
import { PayloadWithCompanyId } from "../../types/PayloadWithCompanyId";
import { QueryOptions } from "../../types/QueryOptions";
import { SpecificationCategoriesApi } from "../clients/SpecificationCategoriesApi";

export const useSpecificationCategoriesQuery = ({
  page,
  perPage,
  options,
  companyId,
}: {
  page: number;
  perPage: number;
  options?: QueryOptions<typeof SpecificationCategoriesApi.list>;
} & PayloadWithCompanyId) =>
  useQuery(
    [QUERIES.CATALOG.SPECIFICATION_CATEGORIES, page, perPage],
    () => SpecificationCategoriesApi.list({ page, perPage, companyId }),
    options
  );
