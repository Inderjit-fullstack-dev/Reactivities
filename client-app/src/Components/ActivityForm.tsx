import React, { useState } from "react";
import { Button, Form, Segment } from "semantic-ui-react";
import { v4 as uuid } from "uuid";

interface IProps {
  setEditMode: (editMode: boolean) => void;
  selectedActivity: any | null;
  createActivity: (activity: any) => void;
  editActivity: (activity: any) => void;
}
const ActivityForm: React.FC<IProps> = ({
  setEditMode,
  selectedActivity,
  createActivity,
  editActivity,
}) => {
  const initializeForm = () => {
    if (selectedActivity) {
      return selectedActivity;
    } else {
      return {
        id: "",
        title: "",
        description: "",
        category: "",
        date: "",
        city: "",
        venue: "",
      };
    }
  };

  const [activity, setActivity] = useState(initializeForm);

  const hangleInputChange = (event: any) => {
    const { name, value } = event.target;
    setActivity({ ...activity, [name]: value });
  };

  const handleSubmit = () => {
    if (activity.id.length === 0) {
      let newActivity = {
        ...activity,
        id: "guid",
      };
      createActivity(newActivity);
    } else {
      editActivity(activity);
    }
  };

  return (
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
        <Button floated="right" positive type="submit" content="Submit" />
        <Button
          floated="right"
          type="button"
          content="Cancel"
          onClick={() => setEditMode(false)}
        />
      </Form>
    </Segment>
  );
};

export default ActivityForm;