import Home from "../../pages/home";
import QueryProvider from "../providers/query-provider";
import "../styles/index.css";

const App = () => {
  return (
    <QueryProvider>
      <Home />
    </QueryProvider>
  );
};

export default App;
