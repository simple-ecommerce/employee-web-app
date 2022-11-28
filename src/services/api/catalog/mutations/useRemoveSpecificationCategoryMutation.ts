import { useMutation } from "react-query";
import { MutationOptions } from "../../types/MutationOptions";
import { SpecificationCategoriesApi } from "../clients/SpecificationCategoriesApi";

export const useRemoveSpecificationCategoryMutation = (
  options: MutationOptions<typeof SpecificationCategoriesApi.remove>
) => useMutation(SpecificationCategoriesApi.remove, options);
