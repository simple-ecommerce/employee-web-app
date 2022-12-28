import { useEffect } from "react";
import { useTranslation } from "react-i18next";
import { ApplicationStore } from "../../services/stores/application/ApplicationStore";

export const useOnLanguageChange = () => {
  const language = ApplicationStore.use.language();
  const { i18n } = useTranslation();

  useEffect(() => {
    i18n.changeLanguage(language);
  }, [language]);
};
