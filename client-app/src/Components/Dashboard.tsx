import React from "react";
import { Grid } from "semantic-ui-react";
import ActivityDetail from "./ActivityDetail";
import ActivityForm from "./ActivityForm";
import ActivityList from "./ActivityList";
interface IProps {
  activities: any[];
  selectActivity: (id: string) => void;
  selectedActivity: any | null;
  setSelectedActivity: (activity: any | null) => void;
  editMode: boolean;
  setEditMode: (editMode: boolean) => void;
  createActivity: (activity: any) => void;
  editActivity: (activity: any) => void;
  deleteActivity: (event: any, id: string) => void;
  submitting: boolean;
  target: string;
}
const Dashboard: React.FC<IProps> = ({
  activities,
  selectActivity,
  selectedActivity,
  setSelectedActivity,
  editMode,
  setEditMode,
  createActivity,
  editActivity,
  deleteActivity,
  submitting,
  target,
}) => {
  return (
    <Grid>
      <Grid.Row>
        <Grid.Column width={10}>
          <ActivityList
            activities={activities}
            selectActivity={selectActivity}
            deleteActivity={deleteActivity}
            submitting={submitting}
            target={target}
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
              key={(selectedActivity && selectedActivity.id) || 0}
              setEditMode={setEditMode}
              selectedActivity={selectedActivity}
              createActivity={createActivity}
              editActivity={editActivity}
              submitting={submitting}
              target={target}
            />
          )}
        </Grid.Column>
      </Grid.Row>
    </Grid>
  );
};

export default Dashboard;
