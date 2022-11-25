import { useMutation } from "react-query";
import { MutationOptions } from "../../../types/MutationOptions";
import { TokenApi } from "../../clients/TokenApi";

export const useLoginMutation = ({
  options,
}: {
  options?: MutationOptions<typeof TokenApi.login>;
} = {}) => useMutation(TokenApi.login, options);
