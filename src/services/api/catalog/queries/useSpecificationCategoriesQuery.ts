import { useQuery } from "react-query";
import { QUERIES } from "../../constants/Queries";
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
}) =>
  useQuery(
    [QUERIES.CATALOG.SPECIFICATION_CATEGORIES, page, perPage],
    () => SpecificationCategoriesApi.list({ page, perPage }),
    options
  );
