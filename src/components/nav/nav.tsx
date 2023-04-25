import { Menu } from "antd";
import { Link } from "react-router-dom";

import "./nav.css";

export const Nav = () => {
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
