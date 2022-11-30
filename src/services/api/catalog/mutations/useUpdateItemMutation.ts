import { useMutation } from "react-query";
import { useQueryFunctionWithCompanyId } from "../../hooks";
import { MutationOptions } from "../../types/MutationOptions";
import { ItemsApi } from "../clients/ItemsApi";

export const useUpdateItemMutation = (
  options?: MutationOptions<typeof ItemsApi.update>
) => {
  const queryFunction = useQueryFunctionWithCompanyId(ItemsApi.update);

  return useMutation(queryFunction, options);
};
