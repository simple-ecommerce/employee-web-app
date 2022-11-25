import { ReactNode } from "react";
import { Section } from "./components";

export const Content = ({ children }: { children: ReactNode }) => {
  return <>{children}</>;
};

Content.Section = Section;
