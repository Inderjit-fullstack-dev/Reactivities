import React, { useContext } from "react";
import { Grid } from "semantic-ui-react";
import ActivityDetail from "./ActivityDetail";
import ActivityForm from "./ActivityForm";
import ActivityList from "./ActivityList";
import { observer } from "mobx-react-lite";
import ActivityStore from "../store/activityStore";
interface IProps {
  setSelectedActivity: (activity: any | null) => void;
  setEditMode: (editMode: boolean) => void;
  createActivity: (activity: any) => void;
  editActivity: (activity: any) => void;
  deleteActivity: (event: any, id: string) => void;
  submitting: boolean;
  target: string;
}
const Dashboard: React.FC<IProps> = ({
  setSelectedActivity,
  setEditMode,
  createActivity,
  editActivity,
  deleteActivity,
  submitting,
  target,
}) => {
  const activityStore = useContext(ActivityStore);
  const { selectedActivity, editMode } = activityStore;
  return (
    <Grid>
      <Grid.Row>
        <Grid.Column width={10}>
          <ActivityList
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

export default observer(Dashboard);
