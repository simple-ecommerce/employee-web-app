import { ReactNode } from "react";
import * as S from "./Header.style";

export const Header = ({ children }: { children: ReactNode }) => {
  return <S.Container>{children}</S.Container>;
};
