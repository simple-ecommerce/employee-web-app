import { BrowserRouter } from "react-router-dom";
import { QueryClientProvider } from "./query_client_provider/QueryClientProvider";

export const Providers = ({ children }: { children: React.ReactNode }) => {
  return (
    <BrowserRouter>
      <QueryClientProvider>{children}</QueryClientProvider>
    </BrowserRouter>
  );
};
