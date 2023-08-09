import { BrowserRouter as Router } from "react-router-dom";
import AppRoutes from "./AppRoutes";
import Header from "./components/header/Header";

const App = () => {
  return (
    <Router>
      <Header />
      <AppRoutes />
    </Router >
  );
}

export default App;
