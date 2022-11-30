import { useMutation } from "react-query";
import { useQueryFunctionWithCompanyId } from "../../hooks";
import { MutationOptions } from "../../types/MutationOptions";
import { SpecificationCategoriesApi } from "../clients/SpecificationCategoriesApi";

export const useRemoveSpecificationCategoryMutation = (
  options: MutationOptions<typeof SpecificationCategoriesApi.remove>
) => {
  const queryFunction = useQueryFunctionWithCompanyId(
    SpecificationCategoriesApi.remove
  );

  return useMutation(queryFunction, options);
};
