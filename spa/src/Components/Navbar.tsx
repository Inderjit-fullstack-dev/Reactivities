import React, { useContext } from "react";
import { Link, NavLink } from "react-router-dom";
import { Button, Container, Dropdown, Menu, Image } from "semantic-ui-react";
import { RootStoreContext } from "../store/rootStore";
const Navbar = () => {
  const rootStore = useContext(RootStoreContext);
  const { isLoggedIn, user, logout } = rootStore.userStore;

  return (
    <Menu fixed="top" inverted>
      <Container>
        <Menu.Item as={NavLink} to="/">
          <img src="/assets/logo.png" alt="logo" className="logo" />
          Reacvities
        </Menu.Item>
        <Menu.Item as={NavLink} to="/activities">
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

        {isLoggedIn && user && (
          <Menu.Item position="right">
            <Image
              avatar
              spaced="right"
              src={user.image || "/assets/user.png"}
            />
            <Dropdown pointing="top left" text={`Welcome ${user.displayName}`}>
              <Dropdown.Menu>
                <Dropdown.Item
                  as={Link}
                  to={`/profile/${user.username}`}
                  text="My profile"
                  icon="user"
                />
                <Dropdown.Item text="Logout" onClick={logout} icon="power" />
              </Dropdown.Menu>
            </Dropdown>
          </Menu.Item>
        )}
      </Container>
    </Menu>
  );
};

export default Navbar;
