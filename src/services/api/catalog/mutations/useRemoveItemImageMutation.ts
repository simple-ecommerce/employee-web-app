import { useMutation } from "react-query";
import { useQueryFunctionWithCompanyId } from "../../hooks";
import { MutationOptions } from "../../types/MutationOptions";
import { ItemsApi } from "../clients/ItemsApi";

export const useRemoveItemImageMutation = (
  options?: MutationOptions<typeof ItemsApi.Images.remove>
) => {
  const queryFn = useQueryFunctionWithCompanyId(ItemsApi.Images.remove);

  return useMutation(queryFn, options);
};
