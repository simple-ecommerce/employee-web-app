import { useMutation } from "react-query";
import { MutationOptions } from "../../types/MutationOptions";
import { SpecificationCategoriesApi } from "../clients/SpecificationCategoriesApi";

export const useRemoveSpecificationMutation = (
  options?: MutationOptions<
    typeof SpecificationCategoriesApi.specifications.remove
  >
) => useMutation(SpecificationCategoriesApi.specifications.remove, options);
