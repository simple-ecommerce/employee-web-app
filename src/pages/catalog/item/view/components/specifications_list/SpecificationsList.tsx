import { useMemo } from "react";
import { Button, Table, Typography } from "antd";
import { Template } from "../../../../../../components";
import { ItemModel } from "../../../../../../services/api/catalog/models/ItemModel";
import { useSpecificationCategoriesQuery } from "../../../../../../services/api/catalog/queries/useSpecificationCategoriesQuery";
import { ItemViewStore } from "../../View.logic";

export const SpecificationsList = ({ item }: { item?: ItemModel }) => {
  const specificationCategoriesQuery = useSpecificationCategoriesQuery({
    itemId: item?.id ?? 0,
    options: { enabled: !!item },
  });

  const dataSource = useMemo(
    () =>
      specificationCategoriesQuery.data?.results?.map(
        (specificationCategory) => ({
          key: `specification-category-${specificationCategory.id}`,
          name: specificationCategory.name,
          children: specificationCategory.specifications.map(
            (specification) => {
              return {
                key: `specification-${specification.id}`,
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
        <Table
          columns={[{ title: "Name", dataIndex: "name", key: "name" }]}
          dataSource={dataSource}
        />
      </Template.Table.Content>
    </Template.Table>
  );
};
