import React, { useContext, useEffect } from "react";
import { Grid } from "semantic-ui-react";
import ActivityList from "./ActivityList";
import { observer } from "mobx-react-lite";
import LoadingComponent from "./common/LoadingComponent";
import { RootStoreContext } from "../store/rootStore";
const Dashboard = () => {
  const rootStore = useContext(RootStoreContext);
  const { loadActivities, loadingInitial } = rootStore.activityStore;
  useEffect(() => {
    loadActivities();
  }, [loadActivities]);

  if (loadingInitial)
    return <LoadingComponent content="Loading activities..." />;
  return (
    <Grid>
      <Grid.Row>
        <Grid.Column width={10}>
          <ActivityList />
        </Grid.Column>
        <Grid.Column width={6}>
          <h2>Activity Filters</h2>
        </Grid.Column>
      </Grid.Row>
    </Grid>
  );
};

export default observer(Dashboard);
