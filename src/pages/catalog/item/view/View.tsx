import {
  Breadcrumb,
  Button,
  Popconfirm,
  Skeleton,
  Space,
  Typography,
} from "antd";
import { useState } from "react";
import { useParams } from "react-router-dom";
import { Template } from "../../../../components";
import { useNavigateTo, useRefreshQuery } from "../../../../hooks";
import { useRemoveItemMutation } from "../../../../services/api/catalog/mutations/useRemoveItemMutation";
import { useItemQuery } from "../../../../services/api/catalog/queries/useItemQuery";
import { QUERIES } from "../../../../services/api/constants/Queries";
import {
  CreateSpecificationModal,
  ImagesList,
  InfoList,
  SpecificationsList,
} from "./components";

export const View = () => {
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
      navigateTo.catalog.item.list();
    },
  });

  if (itemQuery.isLoading) return <Skeleton active />;

  return (
    <Template.Page>
      <Template.Page.Header>
        <Space size={1} direction="vertical">
          <Typography.Title level={3}>
            {itemQuery.data?.name ?? ""}
          </Typography.Title>
          <Breadcrumb>
            <Breadcrumb.Item
              href=""
              onClick={(e) => {
                e.preventDefault();
                navigateTo.catalog.item.list();
              }}
            >
              Catalog
            </Breadcrumb.Item>
            <Breadcrumb.Item>{itemQuery.data?.name}</Breadcrumb.Item>
          </Breadcrumb>
        </Space>
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
              navigateTo.catalog.item.edit(itemQuery?.data?.id ?? 0);
            }}
            type="primary"
          >
            Edit
          </Button>
        </Space>
      </Template.Page.Header>
      <Template.Page.Content>
        <InfoList item={itemQuery.data} />
        <SpecificationsList item={itemQuery.data} />
        <ImagesList item={itemQuery.data} />
        <CreateSpecificationModal item={itemQuery.data} />
      </Template.Page.Content>
    </Template.Page>
  );
};
