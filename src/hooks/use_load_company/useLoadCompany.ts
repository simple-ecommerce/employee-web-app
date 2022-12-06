import { useEffect } from "react";
import { useCompaniesQuery } from "../../services/api/core/queries/useCompaniesQuery";
import { ApplicationStore } from "../../services/stores/application/ApplicationStore";
import { AuthStore } from "../../services/stores/auth/AuthStore";

export const useLoadCompany = () => {
  const isAuthenticated = AuthStore.use.isAuthenticated();

  const companyId = ApplicationStore.use.companyId();
  const companiesQuery = useCompaniesQuery({
    options: { enabled: isAuthenticated },
  });

  useEffect(() => {
    const companyId = companiesQuery.data?.results[0]?.id;
    if (companyId) ApplicationStore.set.companyId(companyId);
  }, [companiesQuery.data]);

  return companyId;
};
