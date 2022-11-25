import { useMutation } from "react-query";
import { MutationOptions } from "../../types/MutationOptions";
import { ItemsApi } from "../clients/ItemsApi";

export const useUpdateItemMutation = (
  options?: MutationOptions<typeof ItemsApi.update>
) => useMutation(ItemsApi.update, options);
