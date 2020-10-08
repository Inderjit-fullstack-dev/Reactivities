import React from "react";
import { NavLink } from "react-router-dom";
import { Button, Container, Menu } from "semantic-ui-react";
const Navbar = () => {
  return (
    <Menu fixed="top" inverted>
      <Container>
        <Menu.Item as={NavLink} to="/">
          <img src="/assets/logo.png" alt="logo" className="logo" />
          Reacvities
        </Menu.Item>
        <Menu.Item exact as={NavLink} to="/activities">
          Activities
        </Menu.Item>
        <Menu.Item>
          <Button
            as={NavLink}
            to="/createActivity"
            positive
            content="Create Activity"
          ></Button>
        </Menu.Item>
      </Container>
    </Menu>
  );
};

export default Navbar;
