import { useMutation } from "react-query";
import { useQueryFunctionWithCompanyId } from "../../hooks";
import { MutationOptions } from "../../types/MutationOptions";
import { ItemsApi } from "../clients/ItemsApi";

export const useCreateItemImageMutation = (
  options?: MutationOptions<typeof ItemsApi.Images.add>
) => {
  const queryFunction = useQueryFunctionWithCompanyId(ItemsApi.Images.add);

  return useMutation(queryFunction, options);
};
