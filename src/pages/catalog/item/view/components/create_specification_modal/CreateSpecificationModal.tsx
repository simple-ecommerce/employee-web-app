import { Form, InputNumber, Modal, TreeSelect } from "antd";
import { useMemo } from "react";
import { ItemModel } from "../../../../../../services/api/catalog/models/ItemModel";
import { useCreateItemSpecificationMutation } from "../../../../../../services/api/catalog/mutations/useCreateItemSpecificationMutation";
import { useItemsSpecificationsQuery } from "../../../../../../services/api/catalog/queries/useItemSpecificationsQuery";
import { useSpecificationCategoriesQuery } from "../../../../../../services/api/catalog/queries/useSpecificationCategoriesQuery";
import { ItemViewStore } from "../../View.logic";

export const CreateSpecificationModal = ({ item }: { item?: ItemModel }) => {
  const open = ItemViewStore.use.isCreateSpecificationModalOpen();
  const specificationCategoriesQuery = useSpecificationCategoriesQuery();
  const createdItemSpecificationsQuery = useItemsSpecificationsQuery({
    itemId: item?.id ?? 0,
    options: { enabled: !!item },
  });
  const [form] = Form.useForm();
  const createSpecificationMutation = useCreateItemSpecificationMutation({
    onSuccess: (e) => console.log("success", e),
  });

  const treeData = useMemo(
    () =>
      specificationCategoriesQuery.data?.results.map(
        (specificationCategory) => {
          return {
            title: specificationCategory.name,
            value: `specification-category-${specificationCategory.id}`,
            key: `specification-category-${specificationCategory.id}`,
            disabled: true,
            children: specificationCategory.specifications.map(
              (specification) => {
                return {
                  disabled: createdItemSpecificationsQuery?.data?.results.some(
                    (itemSpecification) =>
                      itemSpecification.specificationId == specification.id
                  ),
                  title: specification.name,
                  value: specification.id,
                  key: specification.id,
                };
              }
            ),
          };
        }
      ) ?? [],
    [specificationCategoriesQuery.data, createdItemSpecificationsQuery.data]
  );

  return (
    <Modal
      open={open}
      title="Create new specification"
      okText="Create"
      cancelText="Cancel"
      onCancel={() => ItemViewStore.set.isCreateSpecificationModalOpen(false)}
      onOk={form.submit}
    >
      <Form
        layout="vertical"
        form={form}
        requiredMark="optional"
        onFinish={({ priceExtra, specificationId }) => {
          console.log({ priceExtra, specificationId, itemId: item?.id });
          if (item?.id)
            createSpecificationMutation.mutate({
              itemId: item?.id,
              priceExtra,
              specificationId,
            });
        }}
      >
        <Form.Item
          rules={[{ required: false }]}
          label="Price Extra"
          name="priceExtra"
        >
          <InputNumber
            style={{ width: "100%" }}
            formatter={(value) =>
              `$ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ",")
            }
            parser={(value: any) => value?.replace(/\$\s?|(,*)/g, "")}
          />
        </Form.Item>
        <Form.Item
          rules={[{ required: true }]}
          label="Specification"
          name="specificationId"
        >
          <TreeSelect
            showSearch
            style={{ width: "100%" }}
            dropdownStyle={{ maxHeight: 400, overflow: "auto" }}
            placeholder="Please select"
            allowClear
            treeDefaultExpandAll
            treeData={treeData}
          />
        </Form.Item>
      </Form>
    </Modal>
  );
};
