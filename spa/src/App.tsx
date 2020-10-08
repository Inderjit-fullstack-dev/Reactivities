import React, { useContext, useEffect } from "react";
import Navbar from "./Components/Navbar";
import { Container } from "semantic-ui-react";
import Dashboard from "./Components/Dashboard";
import ActivityStore from "./store/activityStore";
import { observer } from "mobx-react-lite";
import { Route, Switch, withRouter } from "react-router-dom";
import Home from "./Components/Home";
import ActivityForm from "./Components/ActivityForm";
import ActivityDetail from "./Components/ActivityDetail";

const App: React.FC<any> = ({ location }) => {
  const activityStore = useContext(ActivityStore);

  useEffect(() => {
    activityStore.loadActivities();
  }, [activityStore]);

  return (
    <div className="App">
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
          <Route exact path="/" component={Home} />
        </Switch>
      </Container>
    </div>
  );
};

export default withRouter(observer(App));
