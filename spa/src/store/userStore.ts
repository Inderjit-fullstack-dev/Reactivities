import { RootStore } from "./rootStore";
import { action, computed, observable, runInAction } from "mobx";
import agent from "../api/agent";
import { history } from "./../index";
export default class UserStore {
  rootStore: RootStore;

  constructor(rootStore: RootStore) {
    this.rootStore = rootStore;
  }
  @observable submitting = false;
  @observable user: any | null = null;

  @computed get isLoggedIn() {
    return !!this.user;
  }

  @action login = async (values: any) => {
    try {
      this.submitting = true;
      const user = await agent.User.login(values);
      this.rootStore.modalStore.closeModal();
      runInAction(() => {
        this.user = user;
        this.submitting = false;
      });
      this.rootStore.commonStore.setToken(user.token);
      history.push("/activities");
    } catch (error) {
      this.submitting = false;
      throw error;
    }
  };

  @action register = async (values: any) => {
    try {
      this.submitting = true;
      const user = await agent.User.register(values);
      this.rootStore.modalStore.closeModal();
      runInAction(() => {
        this.user = user;
        this.submitting = false;
      });
      this.rootStore.commonStore.setToken(user.token);
      history.push("/activities");
    } catch (error) {
      this.submitting = false;
      throw error;
    }
  };

  @action getUser = async () => {
    try {
      const user = await agent.User.currentUser();
      runInAction(() => {
        this.user = user;
      });
    } catch (error) {
      console.log(error);
    }
  };

  @action logout = () => {
    this.rootStore.commonStore.setToken(null);
    this.user = null;
    history.push("/");
  };
}
