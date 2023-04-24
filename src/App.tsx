import React from "react";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";

import { Menu } from "antd";

import { MainPage } from "./pages/mainPage/mainPage";
import { ConvertPage } from "./pages/convertPage/convertPage";

import "antd/dist/reset.css";
import "./App.css";

const Nav = () => {
  return (
    <Menu className="menu" mode="horizontal">
      <Link to="/">
        <Menu.Item className="menu-item">Main Page</Menu.Item>
      </Link>
      <Link to="/convert-page">
        <Menu.Item className="menu-item">Convert page</Menu.Item>
      </Link>
    </Menu>
  );
};

const App = () => (
  <Router>
    <Nav />
    <Route exact path="/">
      <MainPage />
    </Route>
    <Route path="/convert-page">
      <ConvertPage />
    </Route>
  </Router>
);

export default App;
