import { useMutation } from "react-query";
import { MutationOptions } from "../../types/MutationOptions";
import { SpecificationCategoriesApi } from "../clients/SpecificationCategoriesApi";

export const useCreateSpecificationCategoryMutation = (
  options?: MutationOptions<typeof SpecificationCategoriesApi.create>
) => useMutation(SpecificationCategoriesApi.create, options);
