import { Button, Form, Input, Space, Typography } from "antd";
import { Template } from "../../../../components";
import { useNavigateTo } from "../../../../hooks";
import { useCreateSpecificationCategoryMutation } from "../../../../services/api/catalog/mutations/useCreateSpecificationCategoryMutation";

export const Create = () => {
  const [form] = Form.useForm();
  const navigateTo = useNavigateTo();
  const createSpecificationCategoryMutation =
    useCreateSpecificationCategoryMutation({
      onSuccess: ({ id }) => navigateTo.catalog.specification.view(id),
    });

  return (
    <Template.Page>
      <Template.Page.Header>
        <Typography.Title level={3}>Create Specification</Typography.Title>
        <Space>
          <Button
            size="large"
            onClick={navigateTo.catalog.specification.list}
            type="default"
          >
            Cancel
          </Button>
          <Button onClick={form.submit} size="large" type="primary">
            Create
          </Button>
        </Space>
      </Template.Page.Header>
      <Template.Page.Content>
        <Form
          requiredMark="optional"
          layout="vertical"
          onFinish={createSpecificationCategoryMutation.mutate}
          form={form}
        >
          <Form.Item
            rules={[{ required: true, whitespace: false }]}
            label="Name"
            name="name"
          >
            <Input />
          </Form.Item>
          <Form.Item
            rules={[{ required: true }]}
            label="Description"
            name="description"
          >
            <Input.TextArea />
          </Form.Item>
          <Form.Item
            rules={[{ required: true }]}
            label="Internal Name"
            name="internalName"
          >
            <Input.TextArea />
          </Form.Item>
        </Form>
      </Template.Page.Content>
    </Template.Page>
  );
};
