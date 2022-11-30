import { useMemo } from "react";
import {
  QueryClient,
  QueryClientProvider as ReactQueryClientProvider,
} from "react-query";
import { ApplicationStore } from "../../services/stores/application/ApplicationStore";

export const QueryClientProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const companyId = ApplicationStore.use.companyId();

  const queryClient = useMemo(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            staleTime: 1000 * 60,
            meta: {
              companyId,
            },
          },
        },
      }),
    [companyId]
  );

  return (
    <ReactQueryClientProvider client={queryClient}>
      {children}
    </ReactQueryClientProvider>
  );
};
