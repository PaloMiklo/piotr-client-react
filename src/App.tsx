import { BrowserRouter as Router } from "react-router-dom";
import AppRoutes from "./AppRoutes";
import Header from "./components/header/Header";
import './App.scss';
import Brand from "./components/brand/Brand";

const App = () => {
  return (
    <Router>
      <Header />
      <Brand />
      <AppRoutes />
    </Router >
  );
}

export default App;
