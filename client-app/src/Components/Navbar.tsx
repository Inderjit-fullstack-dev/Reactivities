import React from "react";
import { Button, Container, Menu } from "semantic-ui-react";

const Navbar = () => {
  return (
    <Menu fixed="top" inverted>
      <Container>
        <Menu.Item>
          <img src="/assets/logo.png" alt="logo" className="logo" />
          Eventos
        </Menu.Item>
        <Menu.Item name="messages" />
        <Menu.Item>
          <Button positive content="Create Activity"></Button>
        </Menu.Item>
      </Container>
    </Menu>
  );
};

export default Navbar;
