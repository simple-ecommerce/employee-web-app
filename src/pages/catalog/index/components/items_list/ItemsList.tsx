import { Button, Table } from "antd";
import { useState } from "react";
import { useNavigateTo } from "../../../../../hooks";
import { useItemsQuery } from "../../../../../services/api/catalog/queries/useItemsQuery";

export const ItemsList = () => {
  const [page, setPage] = useState(1);
  const itemsQuery = useItemsQuery({ page, perPage: 50 });
  const navigateTo = useNavigateTo();

  return (
    <>
      <div
        style={{
          width: "100%",
          display: "flex",
          justifyContent: "flex-end",
        }}
      >
        <Button
          style={{ marginBottom: "1rem" }}
          onClick={() => {
            navigateTo.catalog.createItem();
          }}
          type="primary"
        >
          Create Item
        </Button>
      </div>

      <Table
        columns={[
          {
            title: "Item",
            dataIndex: "name",
            width: "20%",
            render: (_, item) => (
              <Button
                onClick={() => navigateTo.catalog.viewItem(item.id)}
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
        ]}
        rowKey={({ id }) => id}
        dataSource={itemsQuery.data?.results ?? []}
        pagination={{
          current: itemsQuery.data?.pagination.currentPage,
          total: itemsQuery.data?.pagination.totalCount,
          pageSize: itemsQuery.data?.pagination.perPage,
        }}
        loading={itemsQuery.isLoading}
        onChange={(pagination) => {
          if (pagination.current) setPage(pagination.current);
        }}
      />
    </>
  );
};
