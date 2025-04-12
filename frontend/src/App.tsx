import "./styles/global.css";
import { CustomCursor } from "./components/CustomCursor";
import { GlobalContextProvider } from "./context/Global";
import Routes from "./routes/routes";

function App() {
  return (
    <GlobalContextProvider>
      <CustomCursor />
      <Routes />
    </GlobalContextProvider>
  );
}

export default App;
