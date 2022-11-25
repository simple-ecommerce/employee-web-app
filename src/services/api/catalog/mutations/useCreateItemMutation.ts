import { useMutation } from "react-query";
import { MutationOptions } from "../../types/MutationOptions";
import { ItemsApi } from "../clients/ItemsApi";

export const useCreateItemMutation = (
  options?: MutationOptions<typeof ItemsApi.create>
) => useMutation(ItemsApi.create, options);
