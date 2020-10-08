import React, { useContext, useEffect } from "react";
import { Button, Card, Icon, Image } from "semantic-ui-react";
import ActivityStore from "../store/activityStore";
import LoadingComponent from "./common/LoadingComponent";
import { observer } from "mobx-react-lite";
import { Link } from "react-router-dom";
const ActivityDetail: React.FC<any> = ({ match, history }) => {
  const activityStore = useContext(ActivityStore);
  const { activity, loadActivity, loadingInitial } = activityStore;

  useEffect(() => {
    loadActivity(match.params.id);
  }, [loadActivity, match.params.id]);

  if (loadingInitial)
    return <LoadingComponent content="Loading activity..." inverted={false} />;
  return (
    <Card fluid>
      <Image
        src={`/assets/categoryImages/${activity?.category}.jpg`}
        wrapped
        ui={false}
      />
      <Card.Content>
        <Card.Header>{activity?.title}</Card.Header>
        <Card.Meta>
          <span className="date">{activity?.date}</span>
        </Card.Meta>
        <Card.Description>{activity?.description}</Card.Description>
      </Card.Content>
      <Card.Content extra>
        <Button.Group widths={2}>
          <Button basic color="blue" as={Link} to={`/manage/${activity?.id}`}>
            <Icon name="edit" /> Edit
          </Button>

          <Button
            basic
            color="grey"
            onClick={() => history.push("/activities")}
          >
            <Icon name="cancel" /> Cancel
          </Button>
        </Button.Group>
      </Card.Content>
    </Card>
  );
};

export default observer(ActivityDetail);
