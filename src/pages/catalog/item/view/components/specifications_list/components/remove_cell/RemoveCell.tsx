import { Button, Popconfirm } from "antd";
import { useState } from "react";
import { Id } from "../../../../../../../../aliases/Id";
import { useRefreshQuery } from "../../../../../../../../hooks";
import { useRemoveItemSpecificationMutation } from "../../../../../../../../services/api/catalog/mutations/useRemoveItemSpecificationMutation";
import { QUERIES } from "../../../../../../../../services/api/constants/Queries";

export const RemoveCell = ({
  specificationId,
  itemId,
}: {
  specificationId: Id;
  itemId: Id;
}) => {
  const [isConfirmPopOpen, setIsConfirmPopOpen] = useState(false);
  const refreshQuery = useRefreshQuery();
  const removeItemSpecificationMutation = useRemoveItemSpecificationMutation({
    onSuccess: async () => {
      setIsConfirmPopOpen(false);
      await refreshQuery([QUERIES.CATALOG.SPECIFICATION_CATEGORIES]);
      await refreshQuery([QUERIES.CATALOG.ITEM_SPECIFICATIONS]);
    },
  });

  return (
    <Popconfirm
      title="Are you sure to delete this item specification?"
      onConfirm={() => {
        if (specificationId)
          removeItemSpecificationMutation.mutate({
            itemId,
            specificationId,
          });
      }}
      onCancel={() => setIsConfirmPopOpen(false)}
      okText="Yes"
      open={isConfirmPopOpen}
      cancelText="No"
    >
      <Button onClick={() => setIsConfirmPopOpen(true)} type="link">
        Remove
      </Button>
    </Popconfirm>
  );
};
