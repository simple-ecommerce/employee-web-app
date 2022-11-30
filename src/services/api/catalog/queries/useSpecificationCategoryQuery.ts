import { useQuery } from "react-query";
import { ApplicationStore } from "../../../stores/application/ApplicationStore";
import { QUERIES } from "../../constants/Queries";
import { PayloadWithCompanyId } from "../../types/PayloadWithCompanyId";
import { QueryOptions } from "../../types/QueryOptions";
import { SpecificationCategoriesApi } from "../clients/SpecificationCategoriesApi";

export const useSpecificationCategoryQuery = ({
  id,
  options,
}: {
  id: number;
  options?: QueryOptions<typeof SpecificationCategoriesApi.show>;
}) => {
  const companyId = ApplicationStore.use.companyId() as number;

  return useQuery(
    [QUERIES.CATALOG.SPECIFICATION_CATEGORY, id, companyId],
    () =>
      SpecificationCategoriesApi.show({
        id,
        companyId,
      }),
    options
  );
};
