import { action, computed, observable, runInAction } from "mobx";
import { createContext } from "react";
import agent from "../api/agent";

class ActivityStore {
  @observable activityRegistry = new Map();
  @observable activities: any[] = [];
  @observable loadingInitial = false;
  @observable submitting = false;
  @observable activity: any | undefined;
  @observable editMode = false;
  @observable target = null;

  @computed get activitiesByDate() {
    return Array.from(this.activityRegistry.values()).sort(
      (a, b) => a.date - b.date
    );
  }

  @action loadActivities = () => {
    this.loadingInitial = true;
    agent.Activities.list()
      .then((activities) => {
        activities.forEach((activity: any) => {
          activity.date = activity.date.split(".")[0];
          this.activityRegistry.set(activity.id, activity);
        });
      })
      .finally(() => (this.loadingInitial = false));
  };

  @action loadActivity = (id: string) => {
    let activity = this.getActivity(id);
    if (activity) {
      this.activity = activity;
    } else {
      this.loadingInitial = true;
      agent.Activities.details(id)
        .then((res) => {
          this.activity = res;
        })
        .catch((error) => {
          this.loadingInitial = false;
        })
        .finally(() => (this.loadingInitial = false));
    }
  };

  @action loadActivityAsync = async (id: string) => {
    let activity = this.getActivity(id);
    if (activity) {
      this.activity = activity;
    } else {
      this.loadingInitial = true;
      try {
        activity = await agent.Activities.details(id);
        runInAction("getting activity", () => {
          this.activity = activity;
          this.loadingInitial = false;
        });
      } catch (error) {
        runInAction(
          "getting activity error",
          () => (this.loadingInitial = false)
        );
      }
    }
  };

  getActivity = (id: string) => {
    return this.activityRegistry.get(id);
  };

  @action selectActivity = (id?: string) => {
    if (id !== undefined) {
      this.activity = this.activityRegistry.get(id);
    } else {
      this.activity = null;
    }
  };

  @action setEditMode = (mode: boolean) => {
    this.editMode = mode;
  };

  @action createActivity = async (activity: any) => {
    this.submitting = true;
    try {
      // this statement is await means no other statements will be excuted untill this finishes
      await agent.Activities.create(activity);
      this.activityRegistry.set(activity.id, activity);
      this.activity = activity;
      this.editMode = false;
      this.submitting = false;
    } catch (err) {
      this.submitting = false;
    }
  };

  @action openCreateForm = () => {
    this.activity = null;
    this.setEditMode(true);
  };

  @action editActivity = async (activity: any) => {
    this.submitting = true;
    try {
      await agent.Activities.update(activity);
      this.submitting = false;
      this.activityRegistry.set(activity.id, activity);
      this.activity = activity;
      this.editMode = false;
    } catch (error) {
      this.submitting = false;
    }
  };

  @action deleteActivity = (event: any, id: string) => {
    this.target = event.target.name;
    this.submitting = true;
    agent.Activities.delete(id)
      .then(() => {
        this.activityRegistry.delete(id);
      })
      .finally(() => (this.submitting = false));
  };

  @action clearActivity = () => (this.activity = null);
}

export default createContext(new ActivityStore());
