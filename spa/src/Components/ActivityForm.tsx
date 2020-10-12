import React, { useContext, useEffect, useState } from "react";
import { Button, Form, Grid, Segment } from "semantic-ui-react";
import { v4 as uuid } from "uuid";
import ActivityStore from "../store/activityStore";
import { observer } from "mobx-react-lite";
import { Field, Form as FinalForm } from "react-final-form";
import TextInput from "./common/Form/TextInput";
import TextAreaInput from "./common/Form/TextAreaInput";
import SelectInput from "./common/Form/SelectInput";
import { category } from "./common/options/categoryOptions";
import DateInput from "./common/Form/DateInput";
import {
  combineValidators,
  isRequired,
  composeValidators,
  hasLengthGreaterThan,
} from "revalidate";

const validate = combineValidators({
  title: isRequired({ message: "The event title is required." }),
  description: composeValidators(
    isRequired("Description"),
    hasLengthGreaterThan(4)({
      message: "Description needs to be at least 5 characters long.",
    })
  )(),
  category: isRequired({ message: "The category title is required." }),
  date: isRequired({ message: "The date title is required." }),
  city: isRequired({ message: "The city title is required." }),
  venue: isRequired({ message: "The venue title is required." }),
});

const ActivityForm: React.FC<any> = ({ match, history }) => {
  const activityStore = useContext(ActivityStore);
  const {
    submitting,
    createActivity,
    editActivity,
    loadActivityAsync,
    loadingInitial,
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
    if (match.params.id) {
      loadActivityAsync(match.params.id).then((activity) => {
        setActivity(activity);
      });
    }
  }, [loadActivityAsync, match.params.id]);

  const handleFinalFormSubmit = (activity: any) => {
    if (activity.id.length === 0) {
      let newActivity = {
        ...activity,
        id: uuid(),
      };
      createActivity(newActivity);
    } else {
      editActivity(activity);
    }
  };

  return (
    <Grid>
      <Grid.Column width={10}>
        <Segment clearing>
          <FinalForm
            validate={validate}
            onSubmit={handleFinalFormSubmit}
            initialValues={activity}
            render={({ handleSubmit, invalid, pristine }) => (
              <Form onSubmit={handleSubmit} loading={loadingInitial}>
                <Field
                  name="title"
                  placeholder="Title"
                  value="this is the hard-coded value"
                  component={TextInput}
                />
                <Field
                  name="description"
                  placeholder="Description"
                  value={activity.description}
                  rows={2}
                  component={TextAreaInput}
                />
                <Field
                  name="category"
                  placeholder="Category"
                  value={activity.category}
                  component={SelectInput}
                  options={category}
                />

                <Field
                  name="date"
                  placeholder="Date"
                  value={activity.date}
                  component={DateInput}
                />

                <Field
                  name="city"
                  placeholder="City"
                  value={activity.city}
                  component={TextInput}
                />
                <Field
                  name="venue"
                  placeholder="Venue"
                  value={activity.venue}
                  component={TextInput}
                />
                <Button
                  loading={submitting}
                  floated="right"
                  positive
                  type="submit"
                  content="Submit"
                  disabled={loadingInitial || invalid || pristine}
                />
                <Button
                  floated="right"
                  type="button"
                  content="Cancel"
                  onClick={
                    activity.id
                      ? () => {
                          history.push(`/activities/${activity.id}`);
                        }
                      : () => {
                          history.push(`/activities`);
                        }
                  }
                  disabled={loadingInitial}
                />
              </Form>
            )}
          />
        </Segment>
      </Grid.Column>
    </Grid>
  );
};

export default observer(ActivityForm);
