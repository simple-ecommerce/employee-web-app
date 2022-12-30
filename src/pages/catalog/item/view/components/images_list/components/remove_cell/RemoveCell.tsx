import { Button, Popconfirm } from "antd";
import { useState } from "react";
import { Id } from "../../../../../../../../aliases/Id";
import { useRefreshQuery } from "../../../../../../../../hooks";
import { useRemoveItemImageMutation } from "../../../../../../../../services/api/catalog/mutations/useRemoveItemImageMutation";
import { QUERIES } from "../../../../../../../../services/api/constants/Queries";

export const RemoveCell = ({
  itemId,
  imageId,
}: {
  itemId?: Id;
  imageId?: Id;
}) => {
  const [isConfirmPopOpen, setIsConfirmPopOpen] = useState(false);
  const refreshQuery = useRefreshQuery();
  const removeImageMutation = useRemoveItemImageMutation({
    onSuccess: async () => {
      await refreshQuery([QUERIES.CATALOG.ITEM, itemId]);
    },
  });

  return (
    <Popconfirm
      title="Are you sure you want to delete this image?"
      onConfirm={() =>
        imageId &&
        itemId &&
        removeImageMutation.mutate({
          imageId,
          itemId,
        })
      }
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
