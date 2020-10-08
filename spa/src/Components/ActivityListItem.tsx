import React from "react";
import { Link } from "react-router-dom";
import { Button, Icon, Item, Segment, SegmentGroup } from "semantic-ui-react";
const ActivityListitem: React.FC<any> = ({ activity }) => {
  return (
    <SegmentGroup>
      <Segment>
        <Item.Group>
          <Item>
            <Item.Image
              size="tiny"
              circular
              src={`/assets/user.png`}
              alt="avatar"
            />
            <Item.Content>
              <Item.Header as="a">{activity.title}</Item.Header>
              <Item.Description>Hosted By Inder</Item.Description>
            </Item.Content>
          </Item>
        </Item.Group>
      </Segment>
      <Segment>
        <Icon name="clock" /> {activity.date} &nbsp;
        <Icon name="marker" />
        {activity.venue}, {activity.city}
      </Segment>
      <Segment secondary>Attendee will go here...</Segment>
      <Segment clearing>
        {activity.description}
        <Button
          content="View"
          color="blue"
          floated="right"
          as={Link}
          to={`/activities/${activity.id}`}
        />
      </Segment>
    </SegmentGroup>
  );
};

export default ActivityListitem;
