import { useMutation } from "react-query";
import { useQueryFunctionWithCompanyId } from "../../hooks";
import { MutationOptions } from "../../types/MutationOptions";
import { ItemsApi } from "../clients/ItemsApi";

export const useUpdateItemImageMutation = (
  options?: MutationOptions<typeof ItemsApi.Images.update>
) => {
  const queryFunction = useQueryFunctionWithCompanyId(ItemsApi.Images.update);

  return useMutation(queryFunction, options);
};
