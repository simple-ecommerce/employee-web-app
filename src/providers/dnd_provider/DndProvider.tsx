import { ReactNode } from "react";
import { HTML5Backend } from "react-dnd-html5-backend";
import { DndProvider as ReactDndProvider } from "react-dnd";

export const DndProvider = ({ children }: { children: ReactNode }) => (
  <ReactDndProvider backend={HTML5Backend}>{children}</ReactDndProvider>
);
