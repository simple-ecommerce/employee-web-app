import { Breadcrumb, Button, Form, Input, Space, Typography } from "antd";
import { useCallback } from "react";
import { Template } from "../../../../components";
import { useNavigateTo, useRefreshQuery } from "../../../../hooks";
import { ItemModel } from "../../../../services/api/catalog/models/ItemModel";
import { useCreateItemMutation } from "../../../../services/api/catalog/mutations/useCreateItemMutation";
import { QUERIES } from "../../../../services/api/constants/Queries";

export const Create = () => {
  const [form] = Form.useForm();
  const navigateTo = useNavigateTo();
  const refreshQuery = useRefreshQuery();
  const onSuccess = useCallback(async ({ id }: ItemModel) => {
    await refreshQuery([QUERIES.CATALOG.ITEMS]);
    navigateTo.catalog.item.view(id);
  }, []);
  const createItemMutation = useCreateItemMutation({
    onSuccess,
  });

  return (
    <>
      <Template.Page>
        <Template.Page.Header>
          <Space size={1} direction="vertical">
            <Typography.Title level={3}>Create Item</Typography.Title>
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
              <Breadcrumb.Item>Create Item</Breadcrumb.Item>
            </Breadcrumb>
          </Space>
          <Space>
            <Button
              size="large"
              block
              type="default"
              onClick={() => navigateTo.catalog.item.list()}
            >
              Cancel
            </Button>
            <Button
              onClick={form.submit}
              size="large"
              block
              htmlType="submit"
              type="primary"
            >
              Create
            </Button>
          </Space>
        </Template.Page.Header>
        <Template.Page.Content>
          <Form
            form={form}
            layout="vertical"
            requiredMark="optional"
            onFinish={createItemMutation.mutate}
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
          </Form>
        </Template.Page.Content>
      </Template.Page>
    </>
  );
};
