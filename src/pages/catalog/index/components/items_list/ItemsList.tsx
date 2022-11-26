import { Button, Table } from "antd";
import { useState } from "react";
import { useNavigateTo } from "../../../../../hooks";
import { useItemsQuery } from "../../../../../services/api/catalog/queries/useItemsQuery";
import { useColumns } from "./hooks";
import * as S from "./ItemsList.style";

export const ItemsList = () => {
  const [page, setPage] = useState(1);
  const itemsQuery = useItemsQuery({ page, perPage: 50 });
  const navigateTo = useNavigateTo();
  const columns = useColumns();

  return (
    <>
      <S.Header.Container>
        <Button
          onClick={() => {
            navigateTo.catalog.item.create();
          }}
          type="primary"
        >
          Create Item
        </Button>
      </S.Header.Container>
      <Table
        columns={columns}
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
