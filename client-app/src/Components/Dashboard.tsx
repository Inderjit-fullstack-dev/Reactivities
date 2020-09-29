import React from "react";
import { Grid } from "semantic-ui-react";
import ActivityDetail from "./ActivityDetail";
import ActivityList from "./ActivityList";

const Dashboard: React.FC<any> = (props) => {
  return (
    <Grid>
      <Grid.Row>
        <Grid.Column width={10}>
          <ActivityList activities={props.activities} />
        </Grid.Column>
        <Grid.Column width={6}>
          <ActivityDetail />
        </Grid.Column>
      </Grid.Row>
    </Grid>
  );
};

export default Dashboard;
