import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import ProductDetails from "./productdetails";
import ProductList from "./productlist";

const AppRouter = () => {
  return (
    <Router>
      <Switch>
        <Route exact path="/" component={ProductList} />
        <Route path="/product/:id" component={ProductDetails} />
      </Switch>
    </Router>
  );
};

export default AppRouter;
