import { Table, Typography } from "antd";
import { Template } from "../../../../../../components";
import { SpecificationCategoryModel } from "../../../../../../services/api/catalog/models/SpecificationCategoryModel";

export const InfoList = ({
  specificationCategory,
}: {
  specificationCategory?: SpecificationCategoryModel;
}) => {
  return (
    <Template.Table>
      <Template.Table.Header
        left={<Typography.Title level={5}>Info</Typography.Title>}
      />

      <Template.Table.Content>
        <Table
          columns={[
            {
              title: "Name",
              dataIndex: "name",
              key: "name",
            },
            {
              title: "Value",
              dataIndex: "value",
              key: "value",
            },
          ]}
          pagination={false}
          showHeader={false}
          dataSource={[
            {
              key: "id",
              name: "ID",
              value: specificationCategory?.id,
            },
            {
              key: "name",
              name: "Name",
              value: specificationCategory?.name,
            },
            {
              key: "internalName",
              name: "Internal Name",
              value: specificationCategory?.internalName,
            },
            {
              key: "description",
              name: "Description",
              value: specificationCategory?.description,
            },
          ]}
        />
      </Template.Table.Content>
    </Template.Table>
  );
};
