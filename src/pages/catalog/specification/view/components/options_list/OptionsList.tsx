import { Button, Form, Input, Modal, Space, Table, Typography } from "antd";
import { useState } from "react";
import { useParams } from "react-router-dom";
import { useCreateSpecificationMutation } from "../../../../../../services/api/catalog/mutations/useCreateSpecificationMutation";
import { useSpecificationCategoryQuery } from "../../../../../../services/api/catalog/queries/useSpecificationCategoryQuery";
import * as S from "./OptionsList.style";

export const OptionsList = () => {
  const [form] = Form.useForm();
  const { id } = useParams();
  const specificationCategoryQuery = useSpecificationCategoryQuery({
    id: id ? Number(id) : 0,
    options: { enabled: !!id },
  });
  const createSpecificationMutation = useCreateSpecificationMutation({
    onSuccess: async () => {
      await specificationCategoryQuery.refetch();
      setIsCreateOptionModalOpen(false);
      form.resetFields();
    },
  });
  const [isCreateOptionModalOpen, setIsCreateOptionModalOpen] = useState(false);

  return (
    <>
      <S.Table.Header
        style={{
          display: "flex",
          justifyContent: "space-between",
          marginBottom: "1rem",
        }}
      >
        <Typography.Title level={5}>Options</Typography.Title>
        <Button onClick={() => setIsCreateOptionModalOpen(true)}>
          Add Option
        </Button>
      </S.Table.Header>

      <Table
        rowKey={({ id }) => id}
        columns={[
          {
            title: "Item",
            dataIndex: "name",
            width: "30%",
          },
          {
            title: "Description",
            dataIndex: "description",
            width: "70%",
          },
        ]}
        dataSource={specificationCategoryQuery.data?.specifications ?? []}
      />

      <Modal
        open={isCreateOptionModalOpen}
        title={`Add option to ${specificationCategoryQuery.data?.name}`}
        okText="Create"
        cancelText="Cancel"
        onCancel={() => setIsCreateOptionModalOpen(false)}
        onOk={form.submit}
      >
        <Form
          form={form}
          layout="vertical"
          onFinish={(data) =>
            createSpecificationMutation.mutate({
              specificationCategoryId: id,
              ...data,
            })
          }
          name="form_in_modal"
          initialValues={{ modifier: "public" }}
        >
          <Form.Item
            name="name"
            label="Name"
            rules={[
              {
                required: true,
              },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item name="description" label="Description">
            <Input type="textarea" />
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
};
