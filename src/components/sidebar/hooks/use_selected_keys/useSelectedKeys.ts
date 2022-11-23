import { useMemo } from "react";
import { useLocation } from "react-router-dom";
import { ITEMS } from "../../Sidebar.logic";

export const useSelectedKeys = () => {
  const location = useLocation();

  const selectedKeys = useMemo(() => {
    for (const { path } of ITEMS.slice().reverse()) {
      if (location.pathname.startsWith(path)) return [path];
    }

    return [];
  }, [location]);

  return selectedKeys;
};
