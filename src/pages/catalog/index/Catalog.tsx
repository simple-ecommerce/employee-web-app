import { Tabs, Typography } from "antd";
import { Template } from "../../../components";
import { ItemsList } from "./components";

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
              key: "especifications",
              label: "Especifications",
              children: "Especifications",
            },
          ]}
        />
      </Template.Content>
    </Template>
  );
};
