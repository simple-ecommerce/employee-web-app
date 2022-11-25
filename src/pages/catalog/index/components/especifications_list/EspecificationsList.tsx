import { Button, Table, Tag } from "antd";
import { useNavigateTo } from "../../../../../hooks";
import * as S from "./EspecificationList.style";

export const EspecificationsList = () => {
  const navigateTo = useNavigateTo();

  return (
    <>
      <S.Header.Container>
        <Button
          type="primary"
          onClick={() => navigateTo.catalog.createEspecification()}
        >
          Create Especification
        </Button>
      </S.Header.Container>

      <Table
        expandable={{
          expandedRowRender: (especification) => {
            return (
              <>
                {especification.options.map(({ id, name }) => (
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
            title: "Name",
            key: "name",
            dataIndex: "name",
            render: (_, especification) => {
              return (
                <Button
                  type="link"
                  onClick={() =>
                    navigateTo.catalog.viewEspecification(especification.id)
                  }
                >
                  {especification.name}
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
    </>
  );
};
