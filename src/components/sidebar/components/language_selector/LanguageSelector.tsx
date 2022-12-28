import { useMemo } from "react";
import { Languages } from "../../../../constants/Languages";
import { ApplicationStore } from "../../../../services/stores/application/ApplicationStore";
import * as S from "./LanguageSelector.style";

export const LanguageSelector = () => {
  const value = ApplicationStore.use.language();

  const options = useMemo(() => {
    return Object.values(Languages)
      .sort()
      .map((language) => ({
        value: language,
        label: language,
      }));
  }, []);

  return (
    <S.Select
      value={value}
      onChange={ApplicationStore.set.language}
      options={options}
    />
  );
};
