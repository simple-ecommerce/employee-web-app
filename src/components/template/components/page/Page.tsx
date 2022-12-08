import { ReactNode } from "react";
import { Content, Header } from "./components";
import * as S from "./Page.style";

export const Page = ({ children }: { children: ReactNode }) => {
  return <S.Container>{children}</S.Container>;
};

Page.Header = Header;
Page.Content = Content;
