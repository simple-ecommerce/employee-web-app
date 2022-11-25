import { useCallback } from "react";
import { useParams } from "react-router-dom";
import { useNavigateTo, useRefreshQuery } from "../../../../../hooks";
import { ItemModel } from "../../../../../services/api/catalog/models/ItemModel";
import { useUpdateItemMutation } from "../../../../../services/api/catalog/mutations/useUpdateItemMutation";
import { useItemQuery } from "../../../../../services/api/catalog/queries/useItemQuery";
import { QUERIES } from "../../../../../services/api/constants/Queries";

export const useOnFinish = () => {
  const { id } = useParams<{ id: string }>();

  const itemQuery = useItemQuery({
    id: id ? Number(id) : 0,
    options: { enabled: !!id },
  });
  const refreshQuery = useRefreshQuery();
  const navigateTo = useNavigateTo();

  const onSuccess = useCallback(async () => {
    await refreshQuery([QUERIES.CATALOG.ITEM, itemQuery.data?.id]);
    navigateTo.catalog.viewItem(itemQuery.data?.id ?? 0);
  }, [refreshQuery, navigateTo, itemQuery.data]);

  const updateItemMutation = useUpdateItemMutation({
    onSuccess,
  });

  const onFinish = useCallback(
    async (item: ItemModel) => {
      if (!itemQuery.data) return;
      const updatedItem = Object.keys(item).reduce((updatedItem, key) => {
        if (!item[key as keyof ItemModel]) return updatedItem;
        if (
          item[key as keyof ItemModel] == itemQuery.data[key as keyof ItemModel]
        )
          return updatedItem;
        return { ...updatedItem, [key]: item[key as keyof ItemModel] };
      }, {} as Partial<ItemModel>);

      if (Object.keys(updatedItem).length === 0) return;

      updateItemMutation.mutate({
        ...updatedItem,
        id: Number(itemQuery.data.id),
      });
    },
    [navigateTo, updateItemMutation, itemQuery.data]
  );

  return onFinish;
};
