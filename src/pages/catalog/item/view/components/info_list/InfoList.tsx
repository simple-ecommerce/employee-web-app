import { Table, Typography } from "antd";
import { Template } from "../../../../../../components";
import { ItemLabels } from "../../../../../../constants/labels/ItemLabels";
import { ItemModel } from "../../../../../../services/api/catalog/models/ItemModel";

export const InfoList = ({ item }: { item?: ItemModel }) => {
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
            "id",
            "name",
            "shortDescription",
            "longDescription",
            "price",
            "sku",
            "ean",
            "upc",
            "gtin",
            "brand",
            "createdAt",
            "updatedAt",
          ].map((key) => ({
            key,
            name: ItemLabels[key as keyof ItemModel] ?? key,
            value: item?.[key as keyof typeof item] ?? "-",
          }))}
        />
      </Template.Table.Content>
    </Template.Table>
  );
};
