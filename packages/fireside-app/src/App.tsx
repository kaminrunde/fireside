import * as React from "react";
import { HistoryRouter } from "redux-first-history/rr6";
import { Routes, Route } from "react-router-dom";
import Snackbar from "widgets/Snackbar";
import { history } from "./store";
import Header from "containers/Header";
import Sidebar from "containers/Sidebar";
import Modal from "containers/Modal";
import EnforceFullscreen from "containers/EnforceFullscreen";
import Storybook from "widgets/Storybook";

import IndexRoute from "routes/Index";
import GridRoute from "routes/Grid";
import Settings from "routes/Settings";
import AlertBox from "widgets/AlertBox/AlertBox";
import StaticComponents from "widgets/StaticComponents/StaticComponents";

export default function App() {
  return (
    <HistoryRouter history={history}>
      <div className="App">
        <EnforceFullscreen />
        <Header />
        <Sidebar />
        <Routes>
          <Route path="/" element={<IndexRoute />} />
          <Route path="/grid/:mediaSize" element={<GridRoute />} />
          <Route path="/settings" element={<Settings />} />
        </Routes>
        <Storybook />
        <Snackbar />
        <Modal />
        <StaticComponents />
        <AlertBox />
      </div>
    </HistoryRouter>
  );
}
