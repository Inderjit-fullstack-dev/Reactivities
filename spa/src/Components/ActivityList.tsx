import React, { Fragment, useContext } from "react";
import { Item, Label, Segment } from "semantic-ui-react";
import { observer } from "mobx-react-lite";
import ActivityStore from "../store/activityStore";
import ActivityListitem from "./ActivityListItem";
const ActivityList = () => {
  const activityStore = useContext(ActivityStore);
  const { activitiesByDate } = activityStore;

  return (
    <Fragment>
      {activitiesByDate.map(([group, activities]) => (
        <Fragment key={group}>
          <Label size="large" color="blue">
            {group}
          </Label>
          <Segment clearing>
            <Item.Group divided>
              {activities.map((activity: any) => (
                <ActivityListitem key={activity.id} activity={activity} />
              ))}
            </Item.Group>
          </Segment>
        </Fragment>
      ))}
    </Fragment>
  );
};

export default observer(ActivityList);
