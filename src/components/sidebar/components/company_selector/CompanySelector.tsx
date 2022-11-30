import { useMemo } from "react";
import { useCompaniesQuery } from "../../../../services/api/core/queries/useCompaniesQuery";
import { ApplicationStore } from "../../../../services/stores/application/ApplicationStore";
import * as S from "./CompanySelector.style";

export const CompanySelector = () => {
  const companiesQuery = useCompaniesQuery();
  const value = ApplicationStore.use.companyId();
  const options = useMemo(() => {
    return (
      companiesQuery.data?.results?.map((company) => ({
        label: company.name,
        value: company.id,
        key: company.id,
      })) ?? []
    );
  }, [companiesQuery.data]);

  const onChange = (value: any) => {
    ApplicationStore.set.companyId(Number(value));
  };

  return (
    <S.Select
      value={value}
      onChange={onChange}
      options={options}
      loading={companiesQuery.isLoading}
    />
  );
};
