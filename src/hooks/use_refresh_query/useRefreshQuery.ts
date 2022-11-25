import { useCallback } from "react";
import { useQueryClient } from "react-query";

export const useRefreshQuery = () => {
  const queryClient = useQueryClient();

  const refreshQuery = useCallback(
    async (key: string | any[]) => {
      await queryClient.refetchQueries({ queryKey: key });
    },
    [queryClient]
  );

  return refreshQuery;
};
