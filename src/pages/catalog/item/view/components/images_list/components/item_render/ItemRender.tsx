import { MenuOutlined } from "@ant-design/icons";
import { UploadFile } from "antd";
import { ReactElement, useCallback, useEffect, useMemo } from "react";
import { useDrag, useDrop } from "react-dnd";
import { useParams } from "react-router-dom";
import { useRefreshQuery } from "../../../../../../../../hooks";
import { useUpdateItemImageMutation } from "../../../../../../../../services/api/catalog/mutations/useUpdateItemImageMutation";
import { useItemQuery } from "../../../../../../../../services/api/catalog/queries/useItemQuery";
import { QUERIES } from "../../../../../../../../services/api/constants/Queries";


export const ItemRender = ({
  file,
  item,
}: {
  item: ReactElement;
  file: UploadFile;
}) => {
  const refreshQuery = useRefreshQuery();
  const updateItemImageMutation = useUpdateItemImageMutation({});

  const { id: itemId } = useParams<{ id: string }>();
  const itemQuery = useItemQuery({
    id: itemId ? Number(itemId) : 0,
    options: { enabled: !!itemId },
  });

  const image = useMemo(() => {
    const image = itemQuery.data?.images.find(
      (image) => image.id == Number(file.uid)
    );
    return image;
  }, [itemQuery.data, file.uid]);

  const [dragCollect, drag] = useDrag(() => ({
    type: "image_sort",
    item: { uid: image?.id },
  }));

  const [dropCollect, drop] = useDrop(() => ({
    accept: "image_sort",
    drop: async ({ uid }: { uid: number }) => {
      const dragged = itemQuery.data?.images.find((image) => image.id == uid);
      const dropped = itemQuery.data?.images.find(
        (image) => image.id == file.uid
      );
      console.log({
        a: dragged?.position,
        b: dropped?.position,
      });
      await updateItemImageMutation.mutateAsync({
        imageId: dragged?.id,
        itemId: itemQuery.data?.id,
        position: dropped?.position,
      });
      await refreshQuery([QUERIES.CATALOG.ITEM, Number(itemId)]);
    },
  }));

  useEffect(() => {
    console.log({ dragCollect, dropCollect });
  }, [dragCollect, dropCollect]);

  return (
    <div
      ref={(ref) => {
        drop(ref);
        drag(ref);
      }}
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <MenuOutlined style={{ marginRight: "1rem" }} />
      {item}
    </div>
  );
};
