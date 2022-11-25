import { useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { Paths } from "../../constants/Paths";

export const useNavigateTo = () => {
  const navigate = useNavigate();

  const navigateTo = useMemo(
    () => ({
      dashboard: {
        index: () => navigate(Paths.Dashboard.Index),
      },
      catalog: {
        index: () => navigate(Paths.Catalog.Index),
        createItem: () => navigate(Paths.Catalog.CreateItem),
        editItem: (id: number) =>
          navigate(Paths.Catalog.EditItem.replace(":id", String(id))),
        viewItem: (id: number) =>
          navigate(Paths.Catalog.ViewItem.replace(":id", String(id))),
      },
      inventory: {
        index: () => navigate(Paths.Inventory.Index),
      },
      orders: {
        index: () => navigate(Paths.Orders.Index),
      },
      balance: {
        index: () => navigate(Paths.Balance.Index),
      },
      settings: {
        index: () => navigate(Paths.Settings.Index),
      },
      auth: {
        login: () => navigate(Paths.Auth.Login),
      },
    }),
    [navigate]
  );

  return navigateTo;
};
