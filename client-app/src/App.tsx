import React, { useEffect, useState } from "react";
import Navbar from "./Components/Navbar";
import { Container } from "semantic-ui-react";
import Dashboard from "./Components/Dashboard";
import agent from "./api/agent";
import LoadingComponent from "./Components/common/LoadingComponent";
const App = () => {
  const [activities, setActivities] = useState<any[]>([]);
  const [selectedActivity, setSelectedActivity] = useState<any>(null);
  const [editMode, setEditMode] = useState(false);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [target, setTarget] = useState("");

  const handleSelectActivity = (id: string) => {
    setSelectedActivity(activities.find((a) => a.id === id));
    setEditMode(false);
  };

  const handleOpenCreateForm = () => {
    setSelectedActivity(null);
    setEditMode(true);
  };

  const handleCreateActivity = (activity: any) => {
    setSubmitting(true);
    agent.Activities.create(activity)
      .then(() => {
        setActivities([...activities, activity]);
        setSelectedActivity(activity);
        setEditMode(false);
      })
      .then(() => setSubmitting(false));
  };

  const handleEditActivity = (activity: any) => {
    setSubmitting(true);
    agent.Activities.update(activity)
      .then(() => {
        setActivities([
          ...activities.filter((a) => a.id !== activity.id),
          activity,
        ]);
        setSelectedActivity(activity);
        setEditMode(false);
      })
      .then(() => setSubmitting(false));
  };

  const handleDelete = (event: any, id: string) => {
    setTarget(event.target.name);
    setSubmitting(true);
    agent.Activities.delete(id)
      .then(() => {
        setActivities([...activities.filter((a) => a.id !== id)]);
      })
      .then(() => setSubmitting(false));
  };

  useEffect(() => {
    agent.Activities.list()
      .then((response) => {
        let activities: any[] = [];
        response.forEach((activity: any) => {
          activity.date = activity.date.split(".")[0];
          activities.push(activity);
        });
        setActivities(activities);
      })
      .then(() => setLoading(false));
  }, []);

  if (loading) return <LoadingComponent content="Loading activities..." />;

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
          submitting={submitting}
          target={target}
        />
      </Container>
    </div>
  );
};

export default App;
