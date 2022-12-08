import {
  Breadcrumb,
  Button,
  Popconfirm,
  Skeleton,
  Space,
  Table,
  Typography,
} from "antd";
import { useState } from "react";
import { useParams } from "react-router-dom";
import { Template } from "../../../../components";
import { useNavigateTo, useRefreshQuery } from "../../../../hooks";
import { useRemoveSpecificationCategoryMutation } from "../../../../services/api/catalog/mutations/useRemoveSpecificationCategoryMutation";
import { useSpecificationCategoryQuery } from "../../../../services/api/catalog/queries/useSpecificationCategoryQuery";
import { QUERIES } from "../../../../services/api/constants/Queries";
import { OptionsList } from "./components";

export const View = () => {
  const { id } = useParams();
  const refreshQuery = useRefreshQuery();
  const navigateTo = useNavigateTo();
  const specificationCategoryQuery = useSpecificationCategoryQuery({
    id: id ? Number(id) : 0,
    options: { enabled: !!id },
  });
  const removeSpecificationCategoryMutation =
    useRemoveSpecificationCategoryMutation({
      onSuccess: async () => {
        await refreshQuery([QUERIES.CATALOG.SPECIFICATION_CATEGORIES]);
        navigateTo.catalog.specification.list();
      },
    });
  const [isConfirmRemovePopupOpen, setIsConfirmRemovePopupOpen] =
    useState(false);

  if (specificationCategoryQuery.isLoading) return <Skeleton active />;
  return (
    <Template.Page>
      <Template.Page.Header>
        <Space size={1} direction="vertical">
          <Typography.Title level={3}>
            {specificationCategoryQuery.data?.name ?? ""}
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
            <Breadcrumb.Item>
              {specificationCategoryQuery.data?.name}
            </Breadcrumb.Item>
          </Breadcrumb>
        </Space>
        <Space>
          <Popconfirm
            placement="bottomLeft"
            title="Remove item?"
            open={isConfirmRemovePopupOpen}
            onConfirm={() =>
              removeSpecificationCategoryMutation.mutate({
                id: specificationCategoryQuery.data?.id ?? 0,
              })
            }
            okButtonProps={{
              loading: removeSpecificationCategoryMutation.isLoading,
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
                specificationCategoryQuery?.data?.id ?? 0
              );
            }}
            type="primary"
          >
            Edit
          </Button>
        </Space>
      </Template.Page.Header>
      <Template.Page.Content>
        <Template.Page.Content.Section>
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
              {
                key: "id",
                name: "ID",
                value: specificationCategoryQuery.data?.id,
              },
              {
                key: "name",
                name: "Name",
                value: specificationCategoryQuery.data?.name,
              },
              {
                key: "internalName",
                name: "Internal Name",
                value: specificationCategoryQuery.data?.internalName,
              },
              {
                key: "description",
                name: "Description",
                value: specificationCategoryQuery.data?.description,
              },
            ]}
          />
        </Template.Page.Content.Section>
        <Template.Page.Content.Section>
          <OptionsList />
        </Template.Page.Content.Section>
      </Template.Page.Content>
    </Template.Page>
  );
};
