import { action, observable } from "mobx";
import { createContext } from "react";
import agent from "../api/agent";

class ActivityStore {
  @observable activities: any[] = [];
  @observable loadingInitial = false;
  @observable submitting = false;
  @observable selectedActivity: any | undefined;
  @observable editMode = false;
  @observable target = null;

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

  @action selectActivity = (id?: string) => {
    if (id !== undefined) {
      this.selectedActivity = this.activities.find((a) => a.id === id);
    } else {
      this.selectedActivity = null;
    }
  };

  @action setEditMode = (mode: boolean) => {
    this.editMode = mode;
  };

  @action createActivity = async (activity: any) => {
    this.submitting = true;
    // agent.Activities.create(activity)
    //   .then(() => {
    //     this.activities = [...this.activities, activity];
    //     this.selectedActivity = activity;
    //     this.editMode = false;
    //   })
    //   .finally(() => (this.submitting = false));

    // making it async (it will not effect the performence)

    try {
      // this statement is await means no other statements will be excuted untill this finishes
      await agent.Activities.create(activity);
      this.activities = [...this.activities, activity];
      this.selectedActivity = activity;
      this.editMode = false;
      this.submitting = false;
    } catch (err) {
      this.submitting = false;
    }
  };

  @action openCreateForm = () => {
    this.selectedActivity = null;
    this.setEditMode(true);
  };

  @action editActivity = (activity: any) => {
    this.submitting = true;
    agent.Activities.update(activity)
      .then(() => {
        this.activities = [
          ...this.activities.filter((a) => a.id !== activity.id),
          activity,
        ];
        this.selectedActivity = activity;
        this.editMode = false;
      })
      .finally(() => (this.submitting = false));
  };

  @action deleteActivity = (event: any, id: string) => {
    this.target = event.target.name;
    this.submitting = true;
    agent.Activities.delete(id)
      .then(() => {
        this.activities = this.activities.filter((a) => a.id !== id);
      })
      .finally(() => (this.submitting = false));
  };
}

export default createContext(new ActivityStore());
