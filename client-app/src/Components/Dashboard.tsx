import React from "react";
import { Grid } from "semantic-ui-react";
import ActivityDetail from "./ActivityDetail";
import ActivityForm from "./ActivityForm";
import ActivityList from "./ActivityList";

const Dashboard: React.FC<any> = ({
  activities,
  selectActivity,
  selectedActivity,
  setSelectedActivity,
  editMode,
  setEditMode,
}) => {
  return (
    <Grid>
      <Grid.Row>
        <Grid.Column width={10}>
          <ActivityList
            activities={activities}
            selectActivity={selectActivity}
          />
        </Grid.Column>
        <Grid.Column width={6}>
          {selectedActivity && !editMode && (
            <ActivityDetail
              selectedActivity={selectedActivity}
              setSelectedActivity={setSelectedActivity}
              setEditMode={setEditMode}
            />
          )}

          {editMode && (
            <ActivityForm
              setEditMode={setEditMode}
              selectedActivity={selectedActivity}
            />
          )}
        </Grid.Column>
      </Grid.Row>
    </Grid>
  );
};

export default Dashboard;
