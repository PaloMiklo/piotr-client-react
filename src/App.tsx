import { BrowserRouter } from "react-router-dom";
import AppRoutes from "./AppRoutes";
import Header from "./components/header/Header";

const App = () => {
  return (
    <BrowserRouter>
      <Header />
      <AppRoutes />
    </BrowserRouter >
  );
}

export default App;
