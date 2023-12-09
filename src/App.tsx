import * as Sentry from "@sentry/react";
import { FC, ReactElement } from "react";
import { BrowserRouter as Router } from "react-router-dom";
import './App.scss';
import AppRoutes from "./AppRoutes";
import Brand from "./components/brand/Brand";
import Header from "./components/header/Header";

Sentry.init({
  dsn: import.meta.env.REACT_APP_DSN,
  integrations: [
    new Sentry.BrowserTracing({
      tracePropagationTargets: ["localhost", /^http:\/\/localhost:3000/],
    }),
    new Sentry.Replay(),
  ],
  // Performance Monitoring
  tracesSampleRate: 1.0,
  replaysSessionSampleRate: 1,
  replaysOnErrorSampleRate: 1,
});

const App: FC = (): ReactElement => {
  return (
    <Router>
      <Header />
      <Brand />
      <AppRoutes />
    </Router >
  );
}

export default App;
