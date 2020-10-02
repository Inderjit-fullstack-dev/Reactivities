import { action, observable } from "mobx";
import { createContext } from "react";
import agent from "../api/agent";

class ActivityStore {
  @observable activities: any[] = [];
  @observable loadingInitial = false;
  @observable selectedActivity: any | undefined;
  @observable editMode = false;

  @action loadActivities = () => {
    this.loadingInitial = true;
    agent.Activities.list()
      .then((activities) => {
        activities.forEach((activity: any) => {
          activity.date = activity.date.split(".")[0];
          this.activities.push(activity);
        });
      })
      .finally(() => (this.loadingInitial = false));
  };

  @action selectActivity = (id: string) => {
    this.selectedActivity = this.activities.find((a) => a.id === id);
  };

  @action setEditMode = (mode: boolean) => {
    this.editMode = mode;
  };
}

export default createContext(new ActivityStore());
