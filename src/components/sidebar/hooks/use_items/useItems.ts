import { useMemo } from "react";
import { ITEMS } from "../../Sidebar.logic";

export const useItems = () => {
  const items = useMemo(
    () =>
      ITEMS.map(({ label, path, icon }) => ({
        label,
        icon,
        key: path,
      })),
    []
  );

  return items;
};
