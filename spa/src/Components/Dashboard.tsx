import React, { useContext } from "react";
import { Grid } from "semantic-ui-react";
import ActivityDetail from "./ActivityDetail";
import ActivityForm from "./ActivityForm";
import ActivityList from "./ActivityList";
import { observer } from "mobx-react-lite";
import ActivityStore from "../store/activityStore";

const Dashboard = () => {
  const activityStore = useContext(ActivityStore);
  const { selectedActivity, editMode } = activityStore;
  return (
    <Grid>
      <Grid.Row>
        <Grid.Column width={10}>
          <ActivityList />
        </Grid.Column>
        <Grid.Column width={6}>
          {selectedActivity && !editMode && <ActivityDetail />}

          {editMode && <ActivityForm />}
        </Grid.Column>
      </Grid.Row>
    </Grid>
  );
};

export default observer(Dashboard);
