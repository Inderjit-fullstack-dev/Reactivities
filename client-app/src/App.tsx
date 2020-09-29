import React, { useEffect, useState } from "react";
import axios from "axios";
import { Header, Icon } from "semantic-ui-react";

const App = () => {
  const [activities, setActivities] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:5000/api/activities").then((response) => {
      setActivities(response.data);
    });
  }, []);

  return (
    <div className="App">
      <Header as="h2">
        <Icon name="users" />
        <Header.Content>Reactivities</Header.Content>
      </Header>
      <ul>
        {activities.map((value: any) => (
          <li key={value.id}>{value.title}</li>
        ))}
      </ul>
    </div>
  );
};

export default App;
