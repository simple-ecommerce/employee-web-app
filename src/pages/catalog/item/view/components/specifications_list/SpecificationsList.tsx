import { useMemo } from "react";
import { Button, Table, Typography } from "antd";
import { Template } from "../../../../../../components";
import { ItemModel } from "../../../../../../services/api/catalog/models/ItemModel";
import { useSpecificationCategoriesQuery } from "../../../../../../services/api/catalog/queries/useSpecificationCategoriesQuery";
import { ItemViewStore } from "../../View.logic";
import { RemoveCell } from "./components";

export const SpecificationsList = ({ item }: { item?: ItemModel }) => {
  const specificationCategoriesQuery = useSpecificationCategoriesQuery({
    itemId: item?.id ?? 0,
    options: { enabled: !!item },
  });

  console.log({
    specificationCategoriesQuery: specificationCategoriesQuery.data,
  });

  const dataSource = useMemo(
    () =>
      specificationCategoriesQuery.data?.results?.map(
        (specificationCategory) => ({
          key: `specification-category-${specificationCategory.id}`,
          name: specificationCategory.name,
          priceExtra: null,
          id: specificationCategory.id,
          type: "category",
          children: specificationCategory.specifications.map(
            (specification) => {
              return {
                type: "specification",
                priceExtra: specification.priceExtra,
                key: `specification-${specification.id}`,
                id: specification.id,
                name: specification.name,
              };
            }
          ),
        })
      ) ?? [],
    [specificationCategoriesQuery.data]
  );

  return (
    <Template.Table>
      <Template.Table.Header
        left={<Typography.Title level={5}>Specifications</Typography.Title>}
        right={
          <Button
            onClick={() =>
              ItemViewStore.set.isCreateSpecificationModalOpen(true)
            }
          >
            Create Specification
          </Button>
        }
      />
      <Template.Table.Content>
        {!specificationCategoriesQuery.isLoading && (
          <Table
            expandable={{ defaultExpandAllRows: true }}
            columns={[
              { title: "Name", dataIndex: "name", key: "name" },
              {
                title: "Price Extra",
                render: (_, specification) => {
                  return !!specification?.priceExtra
                    ? `$${specification?.priceExtra}`
                    : "";
                },
                key: "priceExtra",
              },
              {
                title: "",
                key: "remove",
                render: (_, specification) => {
                  if (specification?.type == "category") return <></>;
                  return (
                    <RemoveCell
                      itemId={item?.id}
                      specificationId={specification.id}
                    />
                  );
                },
              },
            ]}
            dataSource={dataSource}
          />
        )}
      </Template.Table.Content>
    </Template.Table>
  );
};
