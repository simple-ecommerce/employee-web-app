import { ReactNode } from "react";
import { Content, Header } from "./components";
import * as S from "./Template.style";

export const Template = ({ children }: { children: ReactNode }) => {
  return <S.Container>{children}</S.Container>;
};

Template.Header = Header;
Template.Content = Content;
