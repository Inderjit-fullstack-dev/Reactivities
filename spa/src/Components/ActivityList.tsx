import React, { useContext } from "react";
import { Button, Icon, Item, Label, Segment } from "semantic-ui-react";
import { observer } from "mobx-react-lite";
import ActivityStore from "../store/activityStore";
const ActivityList = () => {
  const activityStore = useContext(ActivityStore);
  const {
    activitiesByDate,
    selectActivity,
    deleteActivity,
    submitting,
    target,
  } = activityStore;
  return (
    <Segment>
      <Item.Group divided>
        {activitiesByDate.map((activity: any) => (
          <Item key={activity.id}>
            <Item.Content>
              <Item.Header as="a">{activity.title}</Item.Header>
              <Item.Meta>{activity.date}</Item.Meta>
              <Item.Description>
                <div>{activity.description}</div>
                <div>
                  {activity.city}, {activity.venue}
                </div>
                <Label
                  className="activity__category"
                  size="tiny"
                  basic
                  content={activity.category}
                />
              </Item.Description>
              <Item.Extra>
                <Button
                  content="View"
                  color="blue"
                  floated="right"
                  onClick={() => selectActivity(activity.id)}
                />

                <Button
                  name={activity.id}
                  loading={target === activity.id && submitting}
                  color="red"
                  floated="right"
                  onClick={(event) => deleteActivity(event, activity.id)}
                >
                  <Icon name="trash" /> Delete
                </Button>
              </Item.Extra>
            </Item.Content>
          </Item>
        ))}
      </Item.Group>
    </Segment>
  );
};

export default observer(ActivityList);
