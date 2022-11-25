import { Content } from "antd/es/layout/layout";
import { ReactNode } from "react";
import { Header } from "./components";
import * as S from "./Template.style";

export const Template = ({ children }: { children: ReactNode }) => {
  return <S.Container>{children}</S.Container>;
};

Template.Header = Header;
Template.Content = Content;
