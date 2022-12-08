import { Button, Form, Input, Space, Typography } from "antd";
import { useCallback } from "react";
import { useParams } from "react-router-dom";
import { Template } from "../../../../components";
import { useNavigateTo, useRefreshQuery } from "../../../../hooks";
import { SpecificationCategoryModel } from "../../../../services/api/catalog/models/SpecificationCategoryModel";
import { useUpdateSpecificationCategoryMutation } from "../../../../services/api/catalog/mutations/useUpdateSpecificationCategoryMutation";
import { useSpecificationCategoryQuery } from "../../../../services/api/catalog/queries/useSpecificationCategoryQuery";
import { QUERIES } from "../../../../services/api/constants/Queries";

export const Edit = () => {
  const [form] = Form.useForm();
  const refreshQuery = useRefreshQuery();
  const navigateTo = useNavigateTo();
  const { id } = useParams();
  const specificationCategoryQuery = useSpecificationCategoryQuery({
    id: id ? Number(id) : 0,
    options: { enabled: !!id },
  });
  const editSpecificationCategoryMutation =
    useUpdateSpecificationCategoryMutation({
      onSuccess: ({ id }) => {
        refreshQuery([QUERIES.CATALOG.SPECIFICATION_CATEGORY, id]);
        refreshQuery([QUERIES.CATALOG.SPECIFICATION_CATEGORIES]);

        navigateTo.catalog.specification.view(id);
      },
    });

  const onFinish = useCallback(
    async (specificationCategory: SpecificationCategoryModel) => {
      if (!specificationCategoryQuery.data) return;
      const updatedItem = Object.keys(specificationCategory).reduce(
        (updatedItem, key) => {
          if (!specificationCategory[key as keyof SpecificationCategoryModel])
            return updatedItem;
          if (
            specificationCategory[key as keyof SpecificationCategoryModel] ==
            specificationCategoryQuery.data[
              key as keyof SpecificationCategoryModel
            ]
          )
            return updatedItem;
          return {
            ...updatedItem,
            [key]:
              specificationCategory[key as keyof SpecificationCategoryModel],
          };
        },
        {} as Partial<SpecificationCategoryModel>
      );

      if (Object.keys(updatedItem).length === 0) {
        navigateTo.catalog.item.view(specificationCategoryQuery.data?.id ?? 0);
        return;
      }

      editSpecificationCategoryMutation.mutate({
        ...updatedItem,
        id: Number(specificationCategoryQuery?.data?.id),
      });
    },
    [
      navigateTo,
      editSpecificationCategoryMutation,
      specificationCategoryQuery.data,
    ]
  );

  return (
    <Template.Page>
      <Template.Page.Header>
        <Typography.Title level={3}>Edit Specification</Typography.Title>
        <Space>
          <Button
            size="large"
            onClick={navigateTo.catalog.specification.list}
            type="default"
          >
            Cancel
          </Button>
          <Button onClick={form.submit} size="large" type="primary">
            Save
          </Button>
        </Space>
      </Template.Page.Header>
      <Template.Page.Content>
        <Form
          requiredMark="optional"
          initialValues={specificationCategoryQuery.data}
          layout="vertical"
          onFinish={onFinish}
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
