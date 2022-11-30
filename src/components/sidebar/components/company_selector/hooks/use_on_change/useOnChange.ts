import { useNavigate } from "react-router-dom";
import { ApplicationStore } from "../../../../../../services/stores/application/ApplicationStore";
import { ITEMS } from "../../../../Sidebar.logic";

export const useOnChange = () => {
  const navigate = useNavigate();

  const onChange = async (value: any) => {
    ApplicationStore.set.companyId(Number(value));

    for (const item of ITEMS.slice().reverse()) {
      if (item.children?.length) {
        for (const child of item.children) {
          if (location.pathname.startsWith(child.path)) {
            navigate(child.path);

            return;
          }
        }
      }
      if (location.pathname.startsWith(item.path)) {
        navigate(item.path);

        return;
      }
    }
  };

  return onChange;
};
