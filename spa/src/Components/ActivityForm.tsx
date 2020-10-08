import React, { useContext, useEffect, useState } from "react";
import { Button, Form, Grid, Segment } from "semantic-ui-react";
import { v4 as uuid } from "uuid";
import ActivityStore from "../store/activityStore";
import { observer } from "mobx-react-lite";
import LoadingComponent from "./common/LoadingComponent";
const ActivityForm: React.FC<any> = ({ match, history }) => {
  const activityStore = useContext(ActivityStore);
  const {
    activity: initialFormState,
    submitting,
    setEditMode,
    createActivity,
    editActivity,
    loadActivityAsync,
    loadingInitial,
    clearActivity,
  } = activityStore;

  const [activity, setActivity] = useState({
    id: "",
    title: "",
    description: "",
    category: "",
    date: "",
    city: "",
    venue: "",
  });

  useEffect(() => {
    if (match.params.id && activity.id.length === 0) {
      loadActivityAsync(match.params.id).then(() => {
        initialFormState && setActivity(initialFormState);
      });
    }
    return () => {
      clearActivity();
    };
  }, [
    loadActivityAsync,
    match.params.id,
    clearActivity,
    initialFormState,
    activity.id.length,
  ]);

  const hangleInputChange = (event: any) => {
    const { name, value } = event.target;
    setActivity({ ...activity, [name]: value });
  };

  const handleSubmit = () => {
    if (activity.id.length === 0) {
      let newActivity = {
        ...activity,
        id: uuid(),
      };
      createActivity(newActivity).then(() =>
        history.push(`/activities/${newActivity.id}`)
      );
    } else {
      editActivity(activity).then(() =>
        history.push(`/activities/${activity.id}`)
      );
    }
  };

  if (loadingInitial) return <LoadingComponent content="Loading..." />;

  return (
    <Grid>
      <Grid.Column width={10}>
        <Segment clearing>
          <Form onSubmit={handleSubmit}>
            <Form.Input
              name="title"
              placeholder="Title"
              value={activity.title}
              onChange={hangleInputChange}
            />
            <Form.TextArea
              name="description"
              rows={2}
              placeholder="Description"
              value={activity.description}
              onChange={hangleInputChange}
            />
            <Form.Input
              name="category"
              placeholder="Category"
              value={activity.category}
              onChange={hangleInputChange}
            />
            <Form.Input
              name="date"
              type="datetime-local"
              placeholder="Date"
              value={activity.date}
              onChange={hangleInputChange}
            />
            <Form.Input
              name="city"
              placeholder="City"
              value={activity.city}
              onChange={hangleInputChange}
            />
            <Form.Input
              name="venue"
              placeholder="Venue"
              value={activity.venue}
              onChange={hangleInputChange}
            />
            <Button
              loading={submitting}
              floated="right"
              positive
              type="submit"
              content="Submit"
            />
            <Button
              floated="right"
              type="button"
              content="Cancel"
              onClick={() => setEditMode(false)}
            />
          </Form>
        </Segment>
      </Grid.Column>
    </Grid>
  );
};

export default observer(ActivityForm);
