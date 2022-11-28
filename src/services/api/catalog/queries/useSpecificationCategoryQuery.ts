import { useQuery } from "react-query";
import { QUERIES } from "../../constants/Queries";
import { QueryOptions } from "../../types/QueryOptions";
import { SpecificationCategoriesApi } from "../clients/SpecificationCategoriesApi";

export const useSpecificationCategoryQuery = ({
  id,
  options,
}: {
  id: number;
  options?: QueryOptions<typeof SpecificationCategoriesApi.show>;
}) =>
  useQuery(
    [QUERIES.CATALOG.SPECIFICATION_CATEGORY, id],
    () => SpecificationCategoriesApi.show({ id }),
    options
  );
