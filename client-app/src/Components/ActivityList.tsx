import React from "react";
import { Button, Item, Label, Segment } from "semantic-ui-react";

const ActivityList: React.FC<any> = (props) => {
  return (
    <Segment>
      <Item.Group divided>
        {props.activities.map((value: any) => (
          <Item>
            <Item.Content>
              <Item.Header as="a">{value.title}</Item.Header>
              <Item.Meta>{value.date}</Item.Meta>
              <Item.Description>
                <div>{value.description}</div>
                <div>
                  {value.city}, {value.venue}
                </div>
                <Label
                  className="activity__category"
                  size="tiny"
                  basic
                  content={value.category}
                />
              </Item.Description>
              <Item.Extra>
                <Button content="View" color="blue" floated="right" />
              </Item.Extra>
            </Item.Content>
          </Item>
        ))}
      </Item.Group>
    </Segment>
  );
};

export default ActivityList;
