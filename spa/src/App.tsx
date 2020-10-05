import React, { useContext, useEffect } from "react";
import Navbar from "./Components/Navbar";
import { Container } from "semantic-ui-react";
import Dashboard from "./Components/Dashboard";
import LoadingComponent from "./Components/common/LoadingComponent";
import ActivityStore from "./store/activityStore";
import { observer } from "mobx-react-lite";

const App = () => {
  const activityStore = useContext(ActivityStore);

  useEffect(() => {
    activityStore.loadActivities();
  }, [activityStore]);

  if (activityStore.loadingInitial)
    return <LoadingComponent content="Loading activities..." />;

  return (
    <div className="App">
      <Navbar />
      <Container style={{ marginTop: "5em" }}>
        <Dashboard />
      </Container>
    </div>
  );
};

export default observer(App);
