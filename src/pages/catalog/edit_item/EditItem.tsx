import { Breadcrumb, Button, Form, Input, Skeleton, Typography } from "antd";
import { useCallback } from "react";
import { useQueryClient } from "react-query";
import { useParams } from "react-router-dom";
import { Template } from "../../../components";
import { useNavigateTo, useRefreshQuery } from "../../../hooks";
import { ItemModel } from "../../../services/api/catalog/models/ItemModel";
import { useUpdateItemMutation } from "../../../services/api/catalog/mutations/useUpdateItemMutation";
import { useItemQuery } from "../../../services/api/catalog/queries/useItemQuery";
import { QUERIES } from "../../../services/api/constants/Queries";

export const EditItem = () => {
  const navigateTo = useNavigateTo();
  const { id } = useParams<{ id: string }>();
  const [form] = Form.useForm();

  const itemQuery = useItemQuery({
    id: id ? Number(id) : 0,
    options: { enabled: !!id },
  });
  const refreshQuery = useRefreshQuery();

  const onSuccess = useCallback(async () => {
    await refreshQuery([QUERIES.CATALOG.ITEM, itemQuery.data?.id]);
    navigateTo.catalog.viewItem(itemQuery.data?.id ?? 0);
  }, [refreshQuery, navigateTo, itemQuery.data]);

  const updateItemMutation = useUpdateItemMutation({
    onSuccess,
  });

  const onFinish = useCallback(
    async (item: ItemModel) => {
      if (!itemQuery.data) return;
      const updatedItem = Object.keys(item).reduce((updatedItem, key) => {
        if (!item[key as keyof ItemModel]) return updatedItem;
        if (
          item[key as keyof ItemModel] == itemQuery.data[key as keyof ItemModel]
        )
          return updatedItem;
        return { ...updatedItem, [key]: item[key as keyof ItemModel] };
      }, {} as Partial<ItemModel>);

      if (Object.keys(updatedItem).length === 0) return;

      updateItemMutation.mutate({
        ...updatedItem,
        id: Number(itemQuery.data.id),
      });
    },
    [navigateTo, updateItemMutation, itemQuery.data]
  );

  if (itemQuery.isLoading) return <Skeleton active />;

  return (
    <Template>
      <Template.Header>
        <Typography.Title level={3}>{`Edit Item ${id}`}</Typography.Title>
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
          <Breadcrumb.Item
            href=""
            onClick={(e) => {
              e.preventDefault();
              navigateTo.catalog.viewItem(itemQuery.data?.id ?? 0);
            }}
          >
            {itemQuery.data?.name}
          </Breadcrumb.Item>
          <Breadcrumb.Item>Edit</Breadcrumb.Item>
        </Breadcrumb>
      </Template.Header>
      <Template.Content>
        <Form
          initialValues={itemQuery.data}
          form={form}
          layout="vertical"
          onFinish={onFinish}
          requiredMark="optional"
        >
          <Form.Item
            rules={[{ required: true, whitespace: false }]}
            name="name"
            label="Name"
          >
            <Input />
          </Form.Item>
          <Form.Item
            rules={[{ required: true, whitespace: false }]}
            name="shortDescription"
            label="Short Description"
          >
            <Input />
          </Form.Item>
          <Form.Item
            rules={[{ required: true, whitespace: false }]}
            name="longDescription"
            label="Long Description"
          >
            <Input />
          </Form.Item>
          <Form.Item
            rules={[{ required: false, whitespace: false }]}
            name="sku"
            label="SKU"
          >
            <Input />
          </Form.Item>

          <Form.Item
            rules={[{ required: false, whitespace: false }]}
            name="upc"
            label="UPC"
          >
            <Input />
          </Form.Item>

          <Form.Item
            rules={[{ required: false, whitespace: false }]}
            name="ean"
            label="EAN"
          >
            <Input />
          </Form.Item>

          <Form.Item
            rules={[{ required: false, whitespace: false }]}
            name="gtin"
            label="GTIN"
          >
            <Input />
          </Form.Item>

          <Form.Item
            rules={[{ required: true, whitespace: false }]}
            name="price"
            label="Price"
          >
            <Input />
          </Form.Item>
          <Form.Item>
            <Button block htmlType="submit" type="primary">
              Save
            </Button>
          </Form.Item>
          <Button
            block
            type="default"
            onClick={() => navigateTo.catalog.index()}
          >
            Cancel
          </Button>
        </Form>
      </Template.Content>
    </Template>
  );
};
