import { Button, Popconfirm } from "antd";
import { useState } from "react";
import { useRefreshQuery } from "../../../../../../../../hooks";
import { SpecificationCategoryModel } from "../../../../../../../../services/api/catalog/models/SpecificationCategoryModel";
import { SpecificationModel } from "../../../../../../../../services/api/catalog/models/SpecificationModel";
import { useRemoveSpecificationMutation } from "../../../../../../../../services/api/catalog/mutations/useRemoveSpecificationMutation";
import { QUERIES } from "../../../../../../../../services/api/constants/Queries";

export const ActionsCell = ({
  specification,
  specificationCategory,
}: {
  specification?: SpecificationModel;
  specificationCategory?: SpecificationCategoryModel;
}) => {
  const refreshQuery = useRefreshQuery();
  const [isRemoveOptionConfirmOpen, setIsRemoveOptionConfirmOpen] =
    useState(false);
  const removeSpecificationMutation = useRemoveSpecificationMutation({
    onSuccess: () => {
      refreshQuery([
        QUERIES.CATALOG.SPECIFICATION_CATEGORY,
        specificationCategory?.id,
      ]);
    },
  });

  if (!specificationCategory || !specification) return null;

  return (
    <Popconfirm
      open={isRemoveOptionConfirmOpen}
      title="Are you sure to delete this task?"
      onConfirm={() => {
        if (specification)
          removeSpecificationMutation.mutate({
            specificationCategoryId: specificationCategory.id,
            specificationId: specification.id,
          });
      }}
      onCancel={() => setIsRemoveOptionConfirmOpen(false)}
      okText="Yes"
      cancelText="No"
    >
      <Button type="text" onClick={() => setIsRemoveOptionConfirmOpen(true)}>
        Remove
      </Button>
    </Popconfirm>
  );
};
