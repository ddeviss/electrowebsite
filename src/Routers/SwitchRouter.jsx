import React from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import { Cart } from "../components/pages/Cart";
import { Detail } from "../components/pages/Detail";
import { Product } from "../components/pages/Product";

export const SwitchRouter = () => {
  return (
    <Switch>
      <Route exact path="/" component={Product} />
      <Route exact path="/product/:id" component={Detail} />
      <Route exact path="/cart" component={Cart} />
      <Redirect to="/" />
    </Switch>
  );
};
