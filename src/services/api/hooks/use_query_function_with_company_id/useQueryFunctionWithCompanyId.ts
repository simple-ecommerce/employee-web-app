import { useCallback } from "react";
import { ApplicationStore } from "../../../stores/application/ApplicationStore";

export const useQueryFunctionWithCompanyId = <
  QueryFn extends (...args: any) => any
>(
  queryFn: QueryFn
) => {
  const companyId = ApplicationStore.use.companyId();

  const queryFunctionWithCompanyId = useCallback(
    (data: Omit<Parameters<typeof queryFn>[0], "companyId">) =>
      queryFn({ ...data, companyId: companyId as number }),
    [companyId]
  );

  return queryFunctionWithCompanyId;
};
