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
import { Template } from "../../../components";
import { useNavigateTo } from "../../../hooks";
import { OptionsList } from "./components";

export const ViewSpecification = () => {
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
                navigateTo.catalog.index();
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
              navigateTo.catalog.editSpecification(
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
                render: (value, option, index) => {
                  console.log({ option });
                  if (option.key === "options")
                    return (
                      <>
                        {(option.value as any[]).map((option) => (
                          <Tag>{option.name}</Tag>
                        ))}
                      </>
                    );
                  return <>{value}</>;
                },
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
              {
                key: "options",
                name: "Options",
                value: [
                  { id: 4, name: "P" },
                  { id: 5, name: "M" },
                  { id: 6, name: "G" },
                  { id: 7, name: "GG" },
                  { id: 8, name: "XL" },
                ],
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
