import { MinusCircleOutlined, PlusOutlined } from "@ant-design/icons";
import { Button, Divider, Form, Input, Space, Typography } from "antd";
import { useState } from "react";
import { Template } from "../../../../components";

export const Create = () => {
  const [form] = Form.useForm();
  const options = useState();

  return (
    <Template>
      <Template.Header>
        <Typography.Title level={3}>Create Specification</Typography.Title>
        <Space>
          <Button size="large" type="default">
            Cancel
          </Button>
          <Button size="large" type="primary">
            Create
          </Button>
        </Space>
      </Template.Header>
      <Template.Content>
        <Form layout="vertical" form={form}>
          <Form.Item label="Name" name="name">
            <Input />
          </Form.Item>
          <Form.Item label="Description" name="description">
            <Input.TextArea />
          </Form.Item>
        </Form>
      </Template.Content>
    </Template>
  );
};
