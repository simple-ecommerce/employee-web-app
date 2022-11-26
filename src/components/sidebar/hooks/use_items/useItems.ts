import { useMemo } from "react";
import { ITEMS } from "../../Sidebar.logic";

export const useItems = () => {
  const items = useMemo(
    () =>
      ITEMS.map(({ label, path, icon, children }) => ({
        label,
        icon,
        key: path,
        children: children?.map(({ label, path }) => ({ label, key: path })),
      })),
    []
  );

  return items;
};
