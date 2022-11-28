import { Button, Table, Tag, Typography } from "antd";
import { useState } from "react";
import { Template } from "../../../../components";
import { useNavigateTo } from "../../../../hooks";
import { useSpecificationCategoriesQuery } from "../../../../services/api/catalog/queries/useSpecificationCategoriesQuery";
import * as S from "./ListSpecifications.style";

export const List = () => {
  const navigateTo = useNavigateTo();
  const [page, setPage] = useState(1);
  const specificationCategoriesQuery = useSpecificationCategoriesQuery({
    page,
    perPage: 50,
  });

  return (
    <>
      <Template>
        <Template.Header>
          <Typography.Title level={3}>Specifications</Typography.Title>
        </Template.Header>
        <Template.Content>
          <S.Header.Container>
            <Button
              type="primary"
              onClick={() => navigateTo.catalog.specification.create()}
            >
              Create Specification
            </Button>
          </S.Header.Container>

          <Table
            loading={specificationCategoriesQuery.isLoading}
            expandable={{
              expandedRowRender: (specificationCategory) => {
                if (!specificationCategory.specifications.length)
                  return <Typography.Text>No specifications</Typography.Text>;

                return (
                  <>
                    {specificationCategory.specifications.map(
                      ({ id, name }) => (
                        <Tag key={id}>{name}</Tag>
                      )
                    )}
                  </>
                );
              },
              defaultExpandedRowKeys: ["0"],
            }}
            columns={[
              {
                title: "Category",
                key: "name",
                width: "20%",
                dataIndex: "name",
                render: (_, specification) => {
                  return (
                    <Button
                      type="link"
                      onClick={() =>
                        navigateTo.catalog.specification.view(specification.id)
                      }
                    >
                      {specification.name}
                    </Button>
                  );
                },
              },
              {
                title: "Internal Name",
                width: "20%",
                key: "internalName",
                dataIndex: "internalName",
              },
              {
                title: "Description",
                width: "60%",
                key: "description",
                dataIndex: "description",
              },
            ]}
            pagination={{
              current:
                specificationCategoriesQuery.data?.pagination.currentPage,
              total: specificationCategoriesQuery.data?.pagination.totalCount,
              pageSize: specificationCategoriesQuery.data?.pagination.perPage,
            }}
            onChange={(pagination) => {
              if (pagination.current) setPage(pagination.current);
            }}
            dataSource={specificationCategoriesQuery.data?.results ?? []}
          />
        </Template.Content>
      </Template>
    </>
  );
};
