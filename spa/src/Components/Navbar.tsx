import React, { useContext } from "react";
import { Button, Container, Menu } from "semantic-ui-react";
import ActivityStore from "../store/activityStore";
const Navbar = () => {
  const activityStore = useContext(ActivityStore);
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
            onClick={activityStore.openCreateForm}
          ></Button>
        </Menu.Item>
      </Container>
    </Menu>
  );
};

export default Navbar;
