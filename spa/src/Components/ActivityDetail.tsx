import React, { useContext } from "react";
import { Button, Card, Icon, Image } from "semantic-ui-react";
import ActivityStore from "../store/activityStore";

const ActivityDetail = () => {
  const activityStore = useContext(ActivityStore);
  const { selectedActivity, setEditMode, selectActivity } = activityStore;
  return (
    <Card>
      <Image
        src={`/assets/categoryImages/${selectedActivity?.category}.jpg`}
        wrapped
        ui={false}
      />
      <Card.Content>
        <Card.Header>{selectedActivity?.title}</Card.Header>
        <Card.Meta>
          <span className="date">{selectedActivity?.date}</span>
        </Card.Meta>
        <Card.Description>{selectedActivity?.description}</Card.Description>
      </Card.Content>
      <Card.Content extra>
        <Button.Group widths={2}>
          <Button basic color="blue" onClick={() => setEditMode(true)}>
            <Icon name="edit" /> Edit
          </Button>

          <Button basic color="grey" onClick={() => selectActivity()}>
            <Icon name="cancel" /> Cancel
          </Button>
        </Button.Group>
      </Card.Content>
    </Card>
  );
};

export default ActivityDetail;
