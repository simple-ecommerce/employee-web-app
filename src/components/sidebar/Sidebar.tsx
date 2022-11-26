import * as S from "./Sidebar.style";
import { useItems, useOnClick, useSelectedKeys } from "./hooks";

export const Sidebar = () => {
  const selectedKeys = useSelectedKeys();
  const items = useItems();
  const onClick = useOnClick();

  return (
    <S.Menu
      onClick={onClick}
      selectedKeys={selectedKeys}
      mode="inline"
      items={items}
    />
  );
};
