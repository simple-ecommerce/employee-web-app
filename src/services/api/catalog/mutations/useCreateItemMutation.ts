import { useMutation } from "react-query";
import { useQueryFunctionWithCompanyId } from "../../hooks/use_query_function_with_company_id/useQueryFunctionWithCompanyId";
import { MutationOptions } from "../../types/MutationOptions";
import { ItemsApi } from "../clients/ItemsApi";

export const useCreateItemMutation = (
  options?: MutationOptions<typeof ItemsApi.create>
) => {
  const queryFunction = useQueryFunctionWithCompanyId(ItemsApi.create);

  return useMutation(queryFunction, options);
};
