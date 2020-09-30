import React, { useEffect, useState } from "react";
import axios from "axios";
import Navbar from "./Components/Navbar";
import { Container } from "semantic-ui-react";
import Dashboard from "./Components/Dashboard";

const App = () => {
  const [activities, setActivities] = useState<any[]>([]);
  const [selectedActivity, setSelectedActivity] = useState<any>(null);

  const [editMode, setEditMode] = useState(false);

  const handleSelectActivity = (id: string) => {
    setSelectedActivity(activities.find((a) => a.id === id));
    setEditMode(false);
  };

  const handleOpenCreateForm = () => {
    setSelectedActivity(null);
    setEditMode(true);
  };

  const handleCreateActivity = (activity: any) => {
    setActivities([...activities, activity]);
    setSelectedActivity(activity);
    setEditMode(false);
  };

  const handleEditActivity = (activity: any) => {
    setActivities([
      ...activities.filter((a) => a.id !== activity.id),
      activity,
    ]);
    setSelectedActivity(activity);
    setEditMode(false);
  };

  const handleDelete = (id: string) => {
    setActivities([...activities.filter((a) => a.id !== id)]);
  };

  useEffect(() => {
    axios.get("http://localhost:5000/api/activities").then((response) => {
      let activities: any[] = [];
      response.data.forEach((activity: any) => {
        activity.date = activity.date.split(".")[0];
        activities.push(activity);
      });

      setActivities(activities);
    });
  }, []);

  return (
    <div className="App">
      <Navbar openCreateForm={handleOpenCreateForm} />
      <Container style={{ marginTop: "5em" }}>
        <Dashboard
          activities={activities}
          selectActivity={handleSelectActivity}
          selectedActivity={selectedActivity}
          setSelectedActivity={setSelectedActivity}
          editMode={editMode}
          setEditMode={setEditMode}
          createActivity={handleCreateActivity}
          editActivity={handleEditActivity}
          deleteActivity={handleDelete}
        />
      </Container>
    </div>
  );
};

export default App;
