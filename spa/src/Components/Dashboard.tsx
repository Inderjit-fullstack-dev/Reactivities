import React, { useContext } from "react";
import { Grid } from "semantic-ui-react";
import ActivityList from "./ActivityList";
import { observer } from "mobx-react-lite";
import LoadingComponent from "./common/LoadingComponent";
import ActivityStore from "../store/activityStore";
const Dashboard = () => {
  const { loadingInitial } = useContext(ActivityStore);
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
