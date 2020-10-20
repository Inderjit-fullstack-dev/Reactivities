import React, { Fragment, useContext, useEffect } from "react";
import Navbar from "./Components/Navbar";
import { Container } from "semantic-ui-react";
import Dashboard from "./Components/Dashboard";
import { observer } from "mobx-react-lite";
import { Route, Switch, withRouter } from "react-router-dom";
import Home from "./Components/Home";
import ActivityForm from "./Components/ActivityForm";
import ActivityDetail from "./Components/ActivityDetail";
import NotFound from "./Components/common/NotFound";
import { ToastContainer } from "react-toastify";
import { RootStoreContext } from "./store/rootStore";
import LoginForm from "./Components/LoginForm";
import LoadingComponent from "./Components/common/LoadingComponent";
import ModalContainer from "./Components/common/modals/ModalContainer";
const App: React.FC<any> = ({ location }) => {
  const rootStore = useContext(RootStoreContext);
  const { setAppLoaded, token, appLoaded } = rootStore.commonStore;
  const { getUser } = rootStore.userStore;

  useEffect(() => {
    if (token) {
      getUser().finally(() => setAppLoaded());
    } else {
      setAppLoaded();
    }
  }, [token, getUser, setAppLoaded]);

  if (!appLoaded) return <LoadingComponent content="Loading app..." />;

  return (
    <div className="App">
      <ModalContainer />

      <ToastContainer position="bottom-right" />

      <Route exact path="/" component={Home} />
      <Route
        path={"/(.+)"}
        render={() => (
          <Fragment>
            <Navbar />
            <Container style={{ marginTop: "5em" }}>
              <Switch>
                <Route path="/activities/:id" component={ActivityDetail} />
                <Route path="/activities" component={Dashboard} />
                <Route
                  key={location.key}
                  path={["/createActivity", "/manage/:id"]}
                  component={ActivityForm}
                />
                <Route path="/login" component={LoginForm} />

                <Route component={NotFound} />
              </Switch>
            </Container>
          </Fragment>
        )}
      />
    </div>
  );
};

export default withRouter(observer(App));
