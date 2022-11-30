import { useEffect } from "react";
import { useCompaniesQuery } from "../../services/api/core/queries/useCompaniesQuery";
import { ApplicationStore } from "../../services/stores/application/ApplicationStore";

export const useLoadCompany = () => {
  const companyId = ApplicationStore.use.companyId();
  const companiesQuery = useCompaniesQuery();

  useEffect(() => {
    const companyId = companiesQuery.data?.results[0]?.id;
    if (companyId) ApplicationStore.set.companyId(companyId);
  }, [companiesQuery.data]);

  return companyId;
};
