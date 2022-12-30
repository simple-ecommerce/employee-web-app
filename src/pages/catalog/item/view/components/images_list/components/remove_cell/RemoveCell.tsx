import { Button } from "antd";
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
  const refreshQuery = useRefreshQuery();

  const removeImageMutation = useRemoveItemImageMutation({
    onSuccess: async () => {
      await refreshQuery([QUERIES.CATALOG.ITEM, itemId]);
    },
  });

  return (
    <Button
      onClick={() =>
        imageId &&
        itemId &&
        removeImageMutation.mutate({
          imageId,
          itemId,
        })
      }
      type="link"
    >
      Remove
    </Button>
  );
};
