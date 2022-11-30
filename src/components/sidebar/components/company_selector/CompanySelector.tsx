import { useCompaniesQuery } from "../../../../services/api/core/queries/useCompaniesQuery";
import { ApplicationStore } from "../../../../services/stores/application/ApplicationStore";
import { useOnChange, useOptions } from "./hooks";
import * as S from "./CompanySelector.style";

export const CompanySelector = () => {
  const { isLoading } = useCompaniesQuery();
  const value = ApplicationStore.use.companyId();
  const options = useOptions();
  const onChange = useOnChange();

  return (
    <S.Select
      value={value}
      onChange={onChange}
      options={options}
      loading={isLoading}
    />
  );
};
