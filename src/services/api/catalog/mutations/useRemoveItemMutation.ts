import { useMutation } from "react-query";
import { MutationOptions } from "../../types/MutationOptions";
import { ItemsApi } from "../clients/ItemsApi";

export const useRemoveItemMutation = (
  options?: MutationOptions<typeof ItemsApi.remove>
) => useMutation(ItemsApi.remove, options);
