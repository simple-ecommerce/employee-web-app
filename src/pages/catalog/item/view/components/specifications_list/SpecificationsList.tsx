import { Table, Typography } from "antd";
import { Template } from "../../../../../../components";

export const SpecificationsList = () => {
  return (
    <Template.Table>
      <Template.Table.Header
        left={<Typography.Title level={5}>Specifications</Typography.Title>}
      />
      <Template.Table.Content>
        <Table
          columns={[{ title: "Name", dataIndex: "name", key: "name" }]}
          // rowSelection={{ ...rowSelection, checkStrictly }}
          dataSource={[
            {
              key: 1,
              name: "Color",
              children: [
                { key: 2, name: "Red" },
                { key: 3, name: "Blue" },
              ],
            },
            {
              key: 4,
              name: "Size",
              children: [
                { key: 5, name: "S" },
                { key: 6, name: "M" },
                { key: 7, name: "L" },
              ],
            },
          ]}
        />
      </Template.Table.Content>
    </Template.Table>
  );
};
