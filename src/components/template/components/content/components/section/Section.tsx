import { ReactNode } from "react";
import * as S from "./Section.style";

export const Section = ({ children }: { children: ReactNode }) => {
  return <S.Container>{children}</S.Container>;
};
