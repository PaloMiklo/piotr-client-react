import { ReactElement } from "react";
import { BrowserRouter as Router } from "react-router-dom";
import './App.scss';
import AppRoutes from "./AppRoutes";
import Brand from "./components/brand/Brand";
import Header from "./components/header/Header";

const App = (): ReactElement => {
  return (
    <Router>
      <Header />
      <Brand />
      <AppRoutes />
    </Router >
  );
}

export default App;
