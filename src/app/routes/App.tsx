import { ErrorBoundary } from "react-error-boundary";
import Home from "../../pages/home";
import CoordProvider from "../providers/coord-provider";
import QueryProvider from "../providers/query-provider";
import "../styles/index.css";
import NotFound from "../../pages/not-found/ui";

const App = () => {
  return (
    <QueryProvider>
      <ErrorBoundary fallback={<NotFound />}>
        <CoordProvider>
          <Home />
        </CoordProvider>
      </ErrorBoundary>
    </QueryProvider>
  );
};

export default App;
