import {
  Breadcrumb,
  Button,
  Form,
  Input,
  Skeleton,
  Space,
  Typography,
} from "antd";
import { useParams } from "react-router-dom";
import { Template } from "../../../../components";
import { useNavigateTo } from "../../../../hooks";
import { useItemQuery } from "../../../../services/api/catalog/queries/useItemQuery";
import { useOnFinish } from "./hooks";

export const Edit = () => {
  const navigateTo = useNavigateTo();
  const { id } = useParams<{ id: string }>();
  const [form] = Form.useForm();
  const itemQuery = useItemQuery({
    id: id ? Number(id) : 0,
    options: { enabled: !!id },
  });
  const onFinish = useOnFinish();

  if (itemQuery.isLoading) return <Skeleton active />;

  return (
    <Template>
      <Template.Header>
        <Space direction="vertical">
          <Typography.Title level={3}>{`Edit Item ${id}`}</Typography.Title>
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
            <Breadcrumb.Item
              href=""
              onClick={(e) => {
                e.preventDefault();
                navigateTo.catalog.item.view(itemQuery.data?.id ?? 0);
              }}
            >
              {itemQuery.data?.name}
            </Breadcrumb.Item>
            <Breadcrumb.Item>Edit</Breadcrumb.Item>
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
          <Button size="large" block onClick={form.submit} type="primary">
            Save
          </Button>
        </Space>
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
        </Form>
      </Template.Content>
    </Template>
  );
};
