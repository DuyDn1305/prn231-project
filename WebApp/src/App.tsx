import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ToastContainer } from "react-toastify";

import "react-toastify/dist/ReactToastify.css";

import MainRoutes from "./routes";

export const queryClient = new QueryClient();
queryClient.invalidateQueries({ queryKey: ["Ratings/Book"] });
queryClient.invalidateQueries({ queryKey: ["authors", "all"] });
queryClient.invalidateQueries({ queryKey: ["publishers", "all"] });
queryClient.invalidateQueries({ queryKey: ["categories", "all"] });
queryClient.invalidateQueries({ queryKey: ["books", "pagination"] });
queryClient.invalidateQueries({ queryKey: ["books/count"] });

function App() {
  return (
    <>
      <div>
        <QueryClientProvider client={queryClient}>
          <MainRoutes></MainRoutes>
        </QueryClientProvider>
        <ToastContainer />
      </div>
    </>
  );
}

export default App;
