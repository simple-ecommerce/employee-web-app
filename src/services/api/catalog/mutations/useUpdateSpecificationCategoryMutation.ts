import { useMutation } from "react-query";
import { MutationOptions } from "../../types/MutationOptions";
import { SpecificationCategoriesApi } from "../clients/SpecificationCategoriesApi";

export const useUpdateSpecificationCategoryMutation = (
  options: MutationOptions<typeof SpecificationCategoriesApi.update>
) => useMutation(SpecificationCategoriesApi.update, options);
