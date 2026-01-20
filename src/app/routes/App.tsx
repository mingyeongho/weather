import { ErrorBoundary } from "react-error-boundary";
import Home from "../../pages/home";
import CoordProvider from "../providers/coord-provider";
import QueryProvider from "../providers/query-provider";
import "../styles/index.css";
import NotFound from "../../pages/not-found/ui";
import { OSProvider } from "../providers/os-provider";
import SearchDialog from "../../widgets/search-dialog/ui/search-dialog";
import { Toaster } from "sonner";

const App = () => {
  return (
    <QueryProvider>
      <OSProvider>
        <ErrorBoundary fallback={<NotFound />}>
          <CoordProvider>
            <Home />
          </CoordProvider>
        </ErrorBoundary>
        <SearchDialog />
        <Toaster />
      </OSProvider>
    </QueryProvider>
  );
};

export default App;
