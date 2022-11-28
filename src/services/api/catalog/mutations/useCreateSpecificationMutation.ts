import { useMutation } from "react-query";
import { MutationOptions } from "../../types/MutationOptions";
import { SpecificationCategoriesApi } from "../clients/SpecificationCategoriesApi";

export const useCreateSpecificationMutation = (
  options: MutationOptions<typeof SpecificationCategoriesApi.create>
) => useMutation(SpecificationCategoriesApi.create, options);
