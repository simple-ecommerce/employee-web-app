import { useMutation } from "react-query";
import { useQueryFunctionWithCompanyId } from "../../hooks";
import { MutationOptions } from "../../types/MutationOptions";
import { SpecificationCategoriesApi } from "../clients/SpecificationCategoriesApi";

export const useCreateSpecificationCategoryMutation = (
  options?: MutationOptions<typeof SpecificationCategoriesApi.create>
) => {
  const queryFunction = useQueryFunctionWithCompanyId(
    SpecificationCategoriesApi.create
  );

  return useMutation(queryFunction, options);
};
