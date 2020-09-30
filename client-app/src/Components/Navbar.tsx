import React from "react";
import { Button, Container, Menu } from "semantic-ui-react";
interface IProps {
  openCreateForm: () => void;
}
const Navbar: React.FC<IProps> = ({ openCreateForm }) => {
  return (
    <Menu fixed="top" inverted>
      <Container>
        <Menu.Item>
          <img src="/assets/logo.png" alt="logo" className="logo" />
          Eventos
        </Menu.Item>
        <Menu.Item>Events</Menu.Item>
        <Menu.Item>
          <Button
            positive
            content="Create Activity"
            onClick={openCreateForm}
          ></Button>
        </Menu.Item>
      </Container>
    </Menu>
  );
};

export default Navbar;
