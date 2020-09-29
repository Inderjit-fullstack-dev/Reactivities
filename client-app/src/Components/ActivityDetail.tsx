import React from "react";
import { Button, Card, Image } from "semantic-ui-react";

const ActivityDetail: React.FC<any> = (props) => {
  return (
    <Card>
      <Image src="/assets/placeholder.png" wrapped ui={false} />
      <Card.Content>
        <Card.Header>Matthew</Card.Header>
        <Card.Meta>
          <span className="date">Joined in 2015</span>
        </Card.Meta>
        <Card.Description>
          Matthew is a musician living in Nashville.
        </Card.Description>
      </Card.Content>
      <Card.Content extra>
        <Button.Group widths={2}>
          <Button basic content="Edit" color="blue" />
          <Button basic content="Cancel" color="grey" />
        </Button.Group>
      </Card.Content>
    </Card>
  );
};

export default ActivityDetail;
