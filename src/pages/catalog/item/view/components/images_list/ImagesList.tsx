import { Button, Card, Image, Table } from "antd";
import { useCallback, useMemo, useState } from "react";
import "./images-list.css";
import { useParams } from "react-router-dom";
import { useItemQuery } from "../../../../../../services/api/catalog/queries/useItemQuery";
import { DraggableBodyRow } from "./components";

export const ImagesList = () => {
  const { id } = useParams<{ id: string }>();
  const itemQuery = useItemQuery({
    id: id ? Number(id) : 0,
    options: { enabled: !!id },
  });

  const dataSource = useMemo(
    () =>
      itemQuery.data?.images.map((image) => {
        return {
          id: image.id,
          key: image.id,
          fileName: image.fileName,
          src: image.src,
          position: image.position,
        };
      }),
    [itemQuery.data]
  );

  const moveRow = useCallback((dragIndex: number, hoverIndex: number) => {
    console.log("move");
  }, []);

  return (
    <Card
      title="Images"
      extra={
        <Button
          onClick={() => {
            document.getElementById("upload-image-button")?.click();
          }}
        >
          Add Image
        </Button>
      }
    >
      <Table
        columns={[
          {
            title: "Image",
            render: (_, { src }) => <Image src={src} width={100} />,
          },

          { title: "File Name", dataIndex: "fileName" },
        ]}
        dataSource={dataSource}
        components={{ body: { row: DraggableBodyRow } }}
        onRow={({ id, position }, index) => {
          const attr = {
            imageId: id,
            imagePosition: position,
            moveRow,
          };
          return attr as React.HTMLAttributes<any>;
        }}
      />
    </Card>
  );
};
