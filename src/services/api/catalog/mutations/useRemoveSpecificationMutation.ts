import { useMutation } from "react-query";
import { useQueryFunctionWithCompanyId } from "../../hooks";
import { MutationOptions } from "../../types/MutationOptions";
import { SpecificationCategoriesApi } from "../clients/SpecificationCategoriesApi";

export const useRemoveSpecificationMutation = (
  options?: MutationOptions<
    typeof SpecificationCategoriesApi.specifications.remove
  >
) => {
  const queryFunction = useQueryFunctionWithCompanyId(
    SpecificationCategoriesApi.specifications.remove
  );

  return useMutation(queryFunction, options);
};
