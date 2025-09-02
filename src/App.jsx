import { BrowserRouter } from "react-router-dom";
import Router from "../src/router/router";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { defaultOptions } from "./constants/reactQuery";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

function App() {
  const queryClient = new QueryClient(defaultOptions);
  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <Router />
      </BrowserRouter>
      <ReactQueryDevtools />
    </QueryClientProvider>
  );
}

export default App;
