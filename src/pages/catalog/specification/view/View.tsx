import {
  Breadcrumb,
  Button,
  Popconfirm,
  Space,
  Table,
  Tag,
  Typography,
} from "antd";
import { useState } from "react";
import { Template } from "../../../../components";
import { useNavigateTo } from "../../../../hooks";
import { OptionsList } from "./components";

export const View = () => {
  const navigateTo = useNavigateTo();
  const specificationQuery = {
    data: { id: 1, name: "Specification name" },
  };
  const removeSpecificationMutation = {
    mutate: (params: any) => {},
    isLoading: false,
  };
  const [isConfirmRemovePopupOpen, setIsConfirmRemovePopupOpen] =
    useState(false);

  return (
    <Template>
      <Template.Header>
        <Space size={1} direction="vertical">
          <Typography.Title level={3}>
            {specificationQuery.data?.name ?? ""}
          </Typography.Title>
          <Breadcrumb>
            <Breadcrumb.Item
              href=""
              onClick={(e) => {
                e.preventDefault();
                navigateTo.catalog.specification.list();
              }}
            >
              Specifications
            </Breadcrumb.Item>
            <Breadcrumb.Item>{specificationQuery.data?.name}</Breadcrumb.Item>
          </Breadcrumb>
        </Space>
        <Space>
          <Popconfirm
            placement="bottomLeft"
            title="Remove item?"
            open={isConfirmRemovePopupOpen}
            onConfirm={() =>
              removeSpecificationMutation.mutate({
                id: specificationQuery.data?.id ?? 0,
              })
            }
            okButtonProps={{
              loading: removeSpecificationMutation.isLoading,
            }}
            onCancel={() => setIsConfirmRemovePopupOpen(false)}
          >
            <Button
              onClick={() => setIsConfirmRemovePopupOpen(true)}
              size="large"
            >
              Remove
            </Button>
          </Popconfirm>
          <Button
            size="large"
            onClick={() => {
              navigateTo.catalog.specification.edit(
                specificationQuery?.data?.id ?? 0
              );
            }}
            type="primary"
          >
            Edit
          </Button>
        </Space>
      </Template.Header>
      <Template.Content>
        <Template.Content.Section>
          <Typography.Title level={5}>Info</Typography.Title>
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
              { key: "id", name: "ID", value: specificationQuery.data?.id },
              {
                key: "name",
                name: "Name",
                value: specificationQuery.data?.name,
              },
            ]}
          />
        </Template.Content.Section>
        <Template.Content.Section>
          <OptionsList />
        </Template.Content.Section>
      </Template.Content>
    </Template>
  );
};
