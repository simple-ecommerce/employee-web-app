import { useMemo } from "react";
import { useCompaniesQuery } from "../../../../../../services/api/core/queries/useCompaniesQuery";

export const useOptions = () => {
  const companiesQuery = useCompaniesQuery();

  const options = useMemo(() => {
    return (
      companiesQuery.data?.results?.map((company) => ({
        label: company.name,
        value: company.id,
        key: company.id,
      })) ?? []
    );
  }, [companiesQuery.data]);

  return options;
};
