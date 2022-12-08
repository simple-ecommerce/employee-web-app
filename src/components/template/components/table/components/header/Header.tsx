import { ReactNode } from "react";
import * as S from "./Header.style";

export const Header = ({
  left,
  right,
}: {
  left?: ReactNode;
  right?: ReactNode;
}) => {
  return (
    <S.Container>
      <S.Left>{left}</S.Left>
      <S.Right>{right}</S.Right>
    </S.Container>
  );
};
