import React, { Fragment } from "react";
import logo from "./logo.svg";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import Navbar from "./components/Navbar";
import Cart from "./components/cart";
import Product from "./components/Product";
import ProductList from "./components/ProductList";
import Default from "./components/Default";
import Details from "./components/Details";
import { Route, Switch } from "react-router-dom";
import Modal from "./components/Modal";

function App() {
  return (
    <Fragment>
      <Navbar />
      <Switch>
        <Route path="/" exact component={ProductList} />
        <Route path="/details" exact component={Details} />
        <Route path="/cart" exact component={Cart} />
        <Route component={Default} />
      </Switch>
      <Modal />
    </Fragment>
  );
}

export default App;
