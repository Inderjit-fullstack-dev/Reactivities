import { history } from "./../index";
import axios, { AxiosResponse } from "axios";
import { toast } from "react-toastify";

axios.defaults.baseURL = "http://localhost:5000/api";

axios.interceptors.request.use(
  (config) => {
    const token = window.localStorage.getItem("jwt");
    if (token) config.headers.Authorization = `Bearer ${token}`;
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// adding the interceptor for handling the response
axios.interceptors.response.use(undefined, (error) => {
  console.log(error);
  const { status, data, config } = error.response;

  if (status === 404) {
    history.push("/notfound");
  }

  if (
    status === 400 &&
    config.method.toLowerCase() === "get" &&
    data.errors.hasOwnProperty("id")
  ) {
    history.push("/notfound");
  }

  if (status === 500) {
    toast.error("Server error - Something went wrong!");
  }

  throw error.response;
});

const responseBody = (response: AxiosResponse) => response.data;

const sleep = (ms: number) => (response: AxiosResponse) =>
  new Promise<AxiosResponse>((resolve) =>
    setTimeout(() => resolve(response), ms)
  );

const requests = {
  get: (url: string) => axios.get(url).then(sleep(1000)).then(responseBody),
  post: (url: string, body: any) => axios.post(url, body).then(responseBody),
  put: (url: string, body: any) => axios.put(url, body).then(responseBody),
  del: (url: string) => axios.delete(url).then(responseBody),
};

const Activities = {
  list: () => requests.get("/activities"),
  details: (id: string) => requests.get(`/activities/${id}`),
  create: (activity: any) => requests.post("/activities", activity),
  update: (activity: any) =>
    requests.put(`/activities/${activity.id}`, activity),
  delete: (id: string) => requests.del(`/activities/${id}`),
};

const User = {
  currentUser: () => requests.get("/user"),
  login: (user: any) => requests.post("/user/login", user),
  register: (user: any) => requests.post("/user/register", user),
};

export default {
  Activities,
  User,
};
