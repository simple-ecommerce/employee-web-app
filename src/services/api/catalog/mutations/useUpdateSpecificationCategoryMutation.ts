import { useMutation } from "react-query";
import { useQueryFunctionWithCompanyId } from "../../hooks";
import { MutationOptions } from "../../types/MutationOptions";
import { SpecificationCategoriesApi } from "../clients/SpecificationCategoriesApi";

export const useUpdateSpecificationCategoryMutation = (
  options: MutationOptions<typeof SpecificationCategoriesApi.update>
) => {
  const queryFunction = useQueryFunctionWithCompanyId(
    SpecificationCategoriesApi.update
  );

  return useMutation(queryFunction, options);
};
