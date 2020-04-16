import React from "react";
import { Route, Switch, BrowserRouter } from "react-router-dom";
import { FeedForwardPage } from "./components/FeedForwardPage/FeedForwardPage";

export default () => {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/" component={FeedForwardPage} />
      </Switch>
    </BrowserRouter>
  );
};
