import React from "react";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";

import { Button, Menu } from "antd";

import { MainPage } from "./pages/mainPage";

import "antd/dist/reset.css";
import "./App.css";

const Nav = () => {
  return (
    <Menu mode="horizontal">
      <Link to="/">
        <Menu.Item className="my-class">Main Page</Menu.Item>
      </Link>
      <Link to="/convert-page">
        <Menu.Item>Convert page</Menu.Item>
      </Link>
    </Menu>
  );
};

const App = () => (
  <Router>
    <Nav />
    <Route exact path="/">
      {/* <Button type="primary">Button</Button> */}
      <MainPage />
    </Route>
    <Route path="/convert-page">
      <>convert!</>
    </Route>
  </Router>
);

export default App;
