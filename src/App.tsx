import React from "react";
import { BrowserRouter, Route } from "react-router-dom";

import { Button } from "antd";

import "antd/dist/reset.css";
import "./App.css";

const App = () => (
  <BrowserRouter>
    <Button type="primary">Button</Button>
  </BrowserRouter>
);

export default App;
