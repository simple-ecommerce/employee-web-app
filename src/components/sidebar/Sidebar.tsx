import * as S from "./Sidebar.style";
import { useItems, useOnClick, useSelectedKeys } from "./hooks";
import { CompanySelector } from "./components";

export const Sidebar = () => {
  const selectedKeys = useSelectedKeys();
  const items = useItems();
  const onClick = useOnClick();

  return (
    <S.Container>
      <CompanySelector />
      <S.Menu
        onClick={onClick}
        selectedKeys={selectedKeys}
        mode="inline"
        items={items}
      />
    </S.Container>
  );
};
