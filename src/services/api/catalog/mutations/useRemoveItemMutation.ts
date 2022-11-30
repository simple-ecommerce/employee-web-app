import { useMutation } from "react-query";
import { useQueryFunctionWithCompanyId } from "../../hooks";
import { MutationOptions } from "../../types/MutationOptions";
import { ItemsApi } from "../clients/ItemsApi";

export const useRemoveItemMutation = (
  options?: MutationOptions<typeof ItemsApi.remove>
) => {
  const queryFunction = useQueryFunctionWithCompanyId(ItemsApi.remove);

  return useMutation(queryFunction, options);
};
