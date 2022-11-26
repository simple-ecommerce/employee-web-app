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
        item: {
          create: () => navigate(Paths.Catalog.Item.Create),
          edit: (id: number) =>
            navigate(Paths.Catalog.Item.Edit.replace(":id", String(id))),
          list: () => navigate(Paths.Catalog.Item.List),
          view: (id: number) =>
            navigate(Paths.Catalog.Item.View.replace(":id", String(id))),
        },
        specification: {
          create: () => navigate(Paths.Catalog.Specification.Create),
          edit: (id: number) =>
            navigate(
              Paths.Catalog.Specification.Edit.replace(":id", String(id))
            ),
          list: () => navigate(Paths.Catalog.Specification.List),
          view: (id: number) =>
            navigate(
              Paths.Catalog.Specification.View.replace(":id", String(id))
            ),
        },
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
