import { BrowserRouter } from "react-router-dom";
import Router from "../src/router/router";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { defaultOptions } from "./constants/reactQuery";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import Layout from "./layout/layout";
import { ToastContainer } from "react-toastify";

function App() {
  const queryClient = new QueryClient(defaultOptions);
  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <Layout>
          <Router />
          <ToastContainer position="bottom-right" rtl={true} />
        </Layout>
      </BrowserRouter>
      <ReactQueryDevtools />
    </QueryClientProvider>
  );
}

export default App;
