import { Button, Table, Typography } from "antd";
import { useState } from "react";
import { Template } from "../../../../components";
import { useNavigateTo } from "../../../../hooks";
import { useItemsQuery } from "../../../../services/api/catalog/queries/useItemsQuery";
import { useColumns } from "./hooks";
import * as S from "./List.style";

export const List = () => {
  const [page, setPage] = useState(1);
  const itemsQuery = useItemsQuery({ page, perPage: 50 });
  const navigateTo = useNavigateTo();
  const columns = useColumns();

  return (
    <Template.Page>
      <Template.Page.Header>
        <Typography.Title level={3}>Items</Typography.Title>
      </Template.Page.Header>
      <Template.Page.Content>
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
      </Template.Page.Content>
    </Template.Page>
  );
};
