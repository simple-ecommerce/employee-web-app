import { Button, Table, Tag, Typography } from "antd";
import { Template } from "../../../../components";
import { useNavigateTo } from "../../../../hooks";
import * as S from "./ListSpecifications.style";

export const ListSpecifications = () => {
  const navigateTo = useNavigateTo();

  return (
    <>
      <Template>
        <Template.Header>
          <Typography.Title level={3}>Specifications</Typography.Title>
        </Template.Header>
        <Template.Content>
          <S.Header.Container>
            <Button
              type="primary"
              onClick={() => navigateTo.catalog.specification.create()}
            >
              Create Specification
            </Button>
          </S.Header.Container>

          <Table
            expandable={{
              expandedRowRender: (specification) => {
                return (
                  <>
                    {specification.options.map(({ id, name }) => (
                      <Tag key={id}>{name}</Tag>
                    ))}
                    <Tag>Red</Tag>
                    <Tag>Green</Tag>
                    <Tag>Blue</Tag>
                  </>
                );
              },
              defaultExpandedRowKeys: ["0"],
            }}
            columns={[
              {
                title: "Category",
                key: "name",
                dataIndex: "name",
                render: (_, specification) => {
                  return (
                    <Button
                      type="link"
                      onClick={() =>
                        navigateTo.catalog.specification.view(specification.id)
                      }
                    >
                      {specification.name}
                    </Button>
                  );
                },
              },
              {
                title: "Description",
                width: "70%",
                key: "description",
                dataIndex: "description",
              },
            ]}
            dataSource={[
              {
                id: 1,
                name: "Color",
                key: 1,
                description: "Color of the item",
                options: [
                  { id: 1, name: "Red" },
                  { id: 2, name: "Green" },
                  { id: 3, name: "Blue" },
                ],
              },
              {
                id: 2,
                name: "Size",
                key: 2,
                description: "Size of the item",
                options: [
                  { id: 4, name: "P" },
                  { id: 5, name: "M" },
                  { id: 6, name: "G" },
                  { id: 7, name: "GG" },
                  { id: 8, name: "XL" },
                ],
              },
            ]}
          />
        </Template.Content>
      </Template>
    </>
  );
};
