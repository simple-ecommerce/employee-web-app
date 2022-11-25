import { Breadcrumb, Button, Form, Input, Typography } from "antd";
import { useQueryClient } from "react-query";
import { Template } from "../../../components";
import { useNavigateTo } from "../../../hooks";
import { useCreateItemMutation } from "../../../services/api/catalog/mutations/useCreateItemMutation";
import { QUERIES } from "../../../services/api/constants/Queries";

export const CreateItem = () => {
  const [form] = Form.useForm();
  const navigateTo = useNavigateTo();
  const queryClient = useQueryClient();
  const createItemMutation = useCreateItemMutation({
    onSuccess: async ({ id }) => {
      await queryClient.refetchQueries([QUERIES.CATALOG.ITEMS]);
      navigateTo.catalog.viewItem(id);
    },
  });

  return (
    <>
      <Template>
        <Template.Header>
          <Typography.Title level={3}>Create Item</Typography.Title>
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
            <Breadcrumb.Item>Create Item</Breadcrumb.Item>
          </Breadcrumb>
        </Template.Header>
        <Template.Content>
          <Form
            form={form}
            layout="vertical"
            onFinish={createItemMutation.mutate}
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
                Create
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
    </>
  );
};
