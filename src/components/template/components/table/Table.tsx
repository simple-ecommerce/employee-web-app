import { ReactNode } from "react";
import { Content, Header } from "./components";
import * as S from "./Table.style";

export const Table = ({ children }: { children: ReactNode }) => {
  return <S.Container>{children}</S.Container>;
};

Table.Header = Header;
Table.Content = Content;
