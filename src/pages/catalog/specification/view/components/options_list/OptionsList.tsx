import { Button, Form, Input, Modal, Space, Table, Typography } from "antd";
import { useState } from "react";
import { useParams } from "react-router-dom";
import { Template } from "../../../../../../components";
import { useRefreshQuery } from "../../../../../../hooks";
import { useCreateSpecificationMutation } from "../../../../../../services/api/catalog/mutations/useCreateSpecificationMutation";
import { useRemoveSpecificationMutation } from "../../../../../../services/api/catalog/mutations/useRemoveSpecificationMutation";
import { useSpecificationCategoryQuery } from "../../../../../../services/api/catalog/queries/useSpecificationCategoryQuery";
import { ActionsCell } from "./components";
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
  const removeSpecificationMutation = useRemoveSpecificationMutation();
  const [isCreateOptionModalOpen, setIsCreateOptionModalOpen] = useState(false);

  return (
    <>
      <Template.Table>
        <Template.Table.Header
          left={<Typography.Title level={5}>Options</Typography.Title>}
          right={
            <Button onClick={() => setIsCreateOptionModalOpen(true)}>
              Add Option
            </Button>
          }
        />
        <Template.Table.Content>
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
                width: "60%",
              },
              {
                title: "Actions",
                render: (_, specification) => (
                  <ActionsCell
                    specification={specification}
                    specificationCategory={specificationCategoryQuery.data}
                  />
                ),
                width: "10%",
              },
            ]}
            dataSource={specificationCategoryQuery.data?.specifications ?? []}
          />
        </Template.Table.Content>
      </Template.Table>

      <Modal
        open={isCreateOptionModalOpen}
        title={`Add option to ${specificationCategoryQuery.data?.name}`}
        okText="Create"
        cancelText="Cancel"
        onCancel={() => setIsCreateOptionModalOpen(false)}
        onOk={form.submit}
      >
        <Form
          requiredMark="optional"
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
