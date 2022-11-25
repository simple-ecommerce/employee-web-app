import { Tabs, Typography } from "antd";
import { Template } from "../../../components";
import { SpecificationsList, ItemsList } from "./components";

export const Index = () => {
  return (
    <Template>
      <Template.Header>
        <Typography.Title level={3}>Catalog</Typography.Title>
      </Template.Header>
      <Template.Content>
        <Tabs
          items={[
            { key: "items", label: "Items", children: <ItemsList /> },
            {
              key: "specifications",
              label: "Specifications",
              children: <SpecificationsList />,
            },
          ]}
        />
      </Template.Content>
    </Template>
  );
};
