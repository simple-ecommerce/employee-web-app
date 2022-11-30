import { useQuery } from "react-query";
import { QUERIES } from "../../constants/Queries";
import { PayloadWithCompanyId } from "../../types/PayloadWithCompanyId";
import { QueryOptions } from "../../types/QueryOptions";
import { SpecificationCategoriesApi } from "../clients/SpecificationCategoriesApi";

export const useSpecificationCategoryQuery = ({
  id,
  options,
  companyId,
}: {
  id: number;
  options?: QueryOptions<typeof SpecificationCategoriesApi.show>;
} & PayloadWithCompanyId) =>
  useQuery(
    [QUERIES.CATALOG.SPECIFICATION_CATEGORY, id],
    () => SpecificationCategoriesApi.show({ id, companyId }),
    options
  );
