import { PlusOutlined } from "@ant-design/icons";
import { Button, Card, Modal, Upload, UploadFile } from "antd";
import { useEffect, useMemo, useState } from "react";
import { ItemModel } from "../../../../../../services/api/catalog/models/ItemModel";
import type { RcFile, UploadProps } from "antd/es/upload";
import { ItemRender } from "./components";
import { useParams } from "react-router-dom";
import { useItemQuery } from "../../../../../../services/api/catalog/queries/useItemQuery";

export const ImagesList = () => {
  const { id } = useParams<{ id: string }>();
  const itemQuery = useItemQuery({
    id: id ? Number(id) : 0,
    options: { enabled: !!id },
  });

  useEffect(() => {
    if (itemQuery.data?.images.length) {
      setFileList(
        itemQuery.data.images.map((image) => ({
          uid: image.id,
          name: image.fileName,
          status: "done",
          url: image.src,
        }))
      );
    }
  }, [itemQuery.data?.images]);

  const [fileList, setFileList] = useState<UploadFile[]>([]);

  const handleChange: UploadProps["onChange"] = ({ fileList: newFileList }) =>
    setFileList(newFileList);

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
      <Upload
        fileList={fileList}
        listType="picture"
        supportServerRender={true}
        accept="image/*"
        itemRender={(item, file) => <ItemRender item={item} file={file} />}
        onChange={handleChange}
        directory={false}
        maxCount={5}
        multiple={true}
      >
        <Button id="upload-image-button" hidden>
          Upload
        </Button>
      </Upload>
    </Card>
  );
};
