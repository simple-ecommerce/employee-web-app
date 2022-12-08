import { useMutation } from "react-query";
import { useQueryFunctionWithCompanyId } from "../../hooks";
import { MutationOptions } from "../../types/MutationOptions";
import { ItemsApi } from "../clients/ItemsApi";

export const useRemoveItemSpecificationQuery = (
  options: MutationOptions<typeof ItemsApi.Specifications.remove>
) => {
  const queryFn = useQueryFunctionWithCompanyId(ItemsApi.Specifications.remove);

  return useMutation(queryFn, options);
};
