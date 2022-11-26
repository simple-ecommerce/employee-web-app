import { Button, TableColumnsType } from "antd";
import { useMemo } from "react";
import { useNavigateTo } from "../../../../../../hooks";
import { ItemModel } from "../../../../../../services/api/catalog/models/ItemModel";

export const useColumns = () => {
  const navigateTo = useNavigateTo();

  const columns = useMemo<TableColumnsType<ItemModel>>(
    () => [
      {
        title: "Item",
        dataIndex: "name",
        width: "20%",
        render: (_, item) => (
          <Button
            onClick={() => navigateTo.catalog.item.view(item.id)}
            type="link"
          >
            {item.name}
          </Button>
        ),
      },
      {
        title: "ID",
        width: "20%",
        dataIndex: "id",
      },
      {
        title: "Description",
        width: "60%",
        dataIndex: "shortDescription",
      },
    ],
    [navigateTo]
  );

  return columns;
};
