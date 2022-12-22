import { useRef } from "react";
import { useDrag, useDrop } from "react-dnd";
import { useParams } from "react-router-dom";
import { useRefreshQuery } from "../../../../../../../../hooks";
import { useUpdateItemImageMutation } from "../../../../../../../../services/api/catalog/mutations/useUpdateItemImageMutation";
import { QUERIES } from "../../../../../../../../services/api/constants/Queries";

interface DraggableBodyRowProps
  extends React.HTMLAttributes<HTMLTableRowElement> {
  index: number;
  imageId: string;
  imagePosition: number;
  moveRow: (dragIndex: number, hoverIndex: number) => void;
}
const type = "DraggableBodyRow";

export const DraggableBodyRow = ({
  index,
  moveRow,
  imageId,
  imagePosition,
  id,
  className,
  style,
  ...restProps
}: DraggableBodyRowProps) => {
  const { id: itemId } = useParams<{ id: string }>();

  const updateItemImageMutation = useUpdateItemImageMutation();
  const refreshQuery = useRefreshQuery();
  const ref = useRef<HTMLTableRowElement>(null);
  const [{ isOver, dropClassName }, drop] = useDrop({
    accept: type,
    collect: (monitor) => {
      const { index: dragIndex } = monitor.getItem() || {};
      if (dragIndex === index) {
        return {};
      }
      return {
        isOver: monitor.isOver(),
        dropClassName:
          dragIndex < index ? " drop-over-downward" : " drop-over-upward",
      };
    },
    drop: async ({ imageId }: { index: number; imageId: number }) => {
      await updateItemImageMutation.mutateAsync({
        imageId,
        itemId: itemId,
        position: imagePosition,
      });
      await refreshQuery([QUERIES.CATALOG.ITEM]);
    },
  });
  const [, drag] = useDrag({
    type,
    item: { index, imageId },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  });
  drop(drag(ref));

  return (
    <tr
      ref={ref}
      className={`${className}${isOver ? dropClassName : ""}`}
      style={{ cursor: "move", ...style }}
      {...restProps}
    />
  );
};
