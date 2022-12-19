import { BrowserRouter } from "react-router-dom";
import { DndProvider } from "./dnd_provider/DndProvider";
import { QueryClientProvider } from "./query_client_provider/QueryClientProvider";

export const Providers = ({ children }: { children: React.ReactNode }) => {
  return (
    <BrowserRouter>
      <DndProvider>
        <QueryClientProvider>{children}</QueryClientProvider>
      </DndProvider>
    </BrowserRouter>
  );
};
