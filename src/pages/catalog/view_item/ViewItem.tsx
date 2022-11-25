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
import { Template } from "../../../components";
import { ItemLabels } from "../../../constants/labels/ItemLabels";
import { useNavigateTo, useRefreshQuery } from "../../../hooks";
import { ItemModel } from "../../../services/api/catalog/models/ItemModel";
import { useRemoveItemMutation } from "../../../services/api/catalog/mutations/useRemoveItemMutation";
import { useItemQuery } from "../../../services/api/catalog/queries/useItemQuery";
import { QUERIES } from "../../../services/api/constants/Queries";

export const ViewItem = () => {
  const { id } = useParams<{ id: string }>();
  const navigateTo = useNavigateTo();
  const itemQuery = useItemQuery({
    id: id ? Number(id) : 0,
    options: { enabled: !!id },
  });
  const refreshQuery = useRefreshQuery();
  const [isConfirmRemovePopupOpen, setIsConfirmRemovePopupOpen] =
    useState(false);
  const removeItemMutation = useRemoveItemMutation({
    onSuccess: async () => {
      await refreshQuery([QUERIES.CATALOG.ITEMS]);
      navigateTo.catalog.index();
    },
  });

  if (itemQuery.isLoading) return <Skeleton active />;

  return (
    <Template>
      <Template.Header>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            width: "100%",
          }}
        >
          <Typography.Title level={3}>
            {itemQuery.data?.name ?? ""}
          </Typography.Title>
          <Space>
            <Popconfirm
              placement="bottomLeft"
              title="Remove item?"
              open={isConfirmRemovePopupOpen}
              onConfirm={() =>
                removeItemMutation.mutate({ id: itemQuery.data?.id ?? 0 })
              }
              okButtonProps={{ loading: removeItemMutation.isLoading }}
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
                navigateTo.catalog.editItem(itemQuery?.data?.id ?? 0);
              }}
              type="primary"
            >
              Edit
            </Button>
          </Space>
        </div>
        <Breadcrumb>
          <Breadcrumb.Item
            href=""
            onClick={(e) => {
              e.preventDefault();
              navigateTo.catalog.index();
            }}
          >
            Catalog
          </Breadcrumb.Item>
          <Breadcrumb.Item>{itemQuery.data?.name}</Breadcrumb.Item>
        </Breadcrumb>
      </Template.Header>
      <Template.Content>
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
            value: itemQuery.data?.[key as keyof typeof itemQuery.data] ?? "-",
          }))}
        />
      </Template.Content>
    </Template>
  );
};
