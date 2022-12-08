import { Table, Typography } from "antd";

export const SpecificationsList = () => {
  return (
    <>
      <Typography.Title level={5}>Specifications</Typography.Title>
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
    </>
  );
};
