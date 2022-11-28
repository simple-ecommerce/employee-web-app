import { Button, Space, Typography } from "antd";
import { useParams } from "react-router-dom";
import { useSpecificationCategoryQuery } from "../../../../../../services/api/catalog/queries/useSpecificationCategoryQuery";

export const OptionsList = () => {
  const { id } = useParams();
  const specificationCategoryQuery = useSpecificationCategoryQuery({
    id: id ? Number(id) : 0,
    options: { enabled: !!id },
  });

  return (
    <Space>
      <Typography.Title level={5}>Options</Typography.Title>
      <Button>Add Option</Button>
    </Space>
  );
};
