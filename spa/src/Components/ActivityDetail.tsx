import React, { useContext, useEffect } from "react";
import { Grid } from "semantic-ui-react";
import ActivityStore from "../store/activityStore";
import LoadingComponent from "./common/LoadingComponent";
import { observer } from "mobx-react-lite";
import ActivityDetailSidebar from "./details/ActivityDetailSidebar";
import ActivityDetailHeader from "./details/ActivityDetailHeader";
import ActivityDetailInfo from "./details/ActivityDetailInfo";
import ActivityDetailChat from "./details/ActivityDetailChat";
const ActivityDetail: React.FC<any> = ({ match, history }) => {
  const activityStore = useContext(ActivityStore);
  const { activity, loadActivityAsync, loadingInitial } = activityStore;

  useEffect(() => {
    loadActivityAsync(match.params.id);
  }, [loadActivityAsync, match.params.id, history]);

  if (loadingInitial)
    return <LoadingComponent content="Loading activity..." inverted={false} />;

  if (!loadingInitial && !activity) return <h1>Activity not found!</h1>;

  return (
    <Grid>
      <Grid.Column width={10}>
        <ActivityDetailHeader activity={activity} />
        <ActivityDetailInfo activity={activity} />
        <ActivityDetailChat />
      </Grid.Column>

      <Grid.Column width={6}>
        <ActivityDetailSidebar />
      </Grid.Column>
    </Grid>
  );
};

export default observer(ActivityDetail);
