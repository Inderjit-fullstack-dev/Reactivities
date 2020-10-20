import { RootStore } from "./rootStore";
import { action, computed, observable, runInAction } from "mobx";
import { toast } from "react-toastify";
import { history } from "..";
import agent from "../api/agent";

export default class ActivityStore {
  rootStore: RootStore;

  constructor(rootStore: RootStore) {
    this.rootStore = rootStore;
  }

  @observable activityRegistry = new Map();
  @observable activities: any[] = [];
  @observable loadingInitial = false;
  @observable submitting = false;
  @observable activity: any | undefined;
  @observable editMode = false;
  @observable target = null;

  @computed get activitiesByDate() {
    return this.groupActivityByDate(Array.from(this.activityRegistry.values()));
  }

  groupActivityByDate(activities: any[]): [string, any[]][] {
    const sortedActivities = activities.sort(
      (a, b) => new Date(a.date).getTime() - new Date(b.date).getTime()
    );

    return Object.entries(
      sortedActivities.reduce((activities, activity) => {
        const date = new Date(activity.date).toISOString().split("T")[0];
        activities[date] = activities[date]
          ? [...activities[date], activity]
          : [activity];
        return activities;
      }, {} as { [key: string]: any[] })
    );
  }

  @action loadActivities = () => {
    this.loadingInitial = true;
    agent.Activities.list()
      .then((activities) => {
        activities.forEach((activity: any) => {
          this.activityRegistry.set(activity.id, activity);
        });
      })
      .finally(() => (this.loadingInitial = false));
  };

  @action loadActivityAsync = async (id: string) => {
    let activity = this.getActivity(id);
    if (activity) {
      this.activity = activity;
      return activity;
    } else {
      try {
        activity = await agent.Activities.details(id);
        runInAction("getting activity", () => {
          this.activity = activity;
          this.activityRegistry.set(activity.id, activity);
        });
        return activity;
      } catch (error) {
        runInAction("getting activity error", () => console.log(error));
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
      history.push(`/activities/${activity.id}`);
    } catch (err) {
      this.submitting = false;
      toast.error("Problem submitting the data.");
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
      history.push(`/activities/${activity.id}`);
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
