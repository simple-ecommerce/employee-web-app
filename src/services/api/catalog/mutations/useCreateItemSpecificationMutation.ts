import { useMutation } from "react-query";
import { useQueryFunctionWithCompanyId } from "../../hooks";
import { MutationOptions } from "../../types/MutationOptions";
import { ItemsApi } from "../clients/ItemsApi";

export const useCreateItemSpecificationMutation = (
  options: MutationOptions<typeof ItemsApi.Specifications.add>
) => {
  const queryFunction = useQueryFunctionWithCompanyId(
    ItemsApi.Specifications.add
  );

  return useMutation(queryFunction, options);
};
