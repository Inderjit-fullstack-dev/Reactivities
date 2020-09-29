import React, { useEffect, useState } from "react";
import axios from "axios";
import Navbar from "./Components/Navbar";
import { Container } from "semantic-ui-react";

const App = () => {
  const [activities, setActivities] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:5000/api/activities").then((response) => {
      setActivities(response.data);
    });
  }, []);

  return (
    <div className="App">
      <Navbar />
      <Container style={{ marginTop: "5em" }}>
        <ul>
          {activities.map((value: any) => (
            <li key={value.id}>{value.title}</li>
          ))}
        </ul>
      </Container>
    </div>
  );
};

export default App;
