import { useMutation } from "react-query";
import { useQueryFunctionWithCompanyId } from "../../hooks";
import { MutationOptions } from "../../types/MutationOptions";
import { SpecificationCategoriesApi } from "../clients/SpecificationCategoriesApi";

export const useCreateSpecificationMutation = (
  options?: MutationOptions<
    typeof SpecificationCategoriesApi.specifications.add
  >
) => {
  const queryFunction = useQueryFunctionWithCompanyId(
    SpecificationCategoriesApi.specifications.add
  );

  return useMutation(queryFunction, options);
};
