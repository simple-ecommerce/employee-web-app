import { useMutation } from "react-query";
import { TMutationOptions } from "../../../types/MutationOptions";
import { TokenApi } from "../../clients/TokenApi";

export const useLoginMutation = ({
  options,
}: {
  options?: TMutationOptions<
    Parameters<typeof TokenApi.login>[0],
    Awaited<ReturnType<typeof TokenApi.login>>
  >;
} = {}) => useMutation(TokenApi.login, options);
