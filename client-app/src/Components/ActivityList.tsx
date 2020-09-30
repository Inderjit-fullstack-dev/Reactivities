import React from "react";
import { Button, Icon, Item, Label, Segment } from "semantic-ui-react";

const ActivityList: React.FC<any> = ({
  activities,
  selectActivity,
  deleteActivity,
  submitting,
  target,
}) => {
  return (
    <Segment>
      <Item.Group divided>
        {activities.map((activity: any) => (
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

export default ActivityList;
