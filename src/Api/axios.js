import axios from "axios";

const axiosInstance = axios.create({
  // for local firebase functions
  // baseURL: "http://127.0.0.1:5001/clone-b55f7/us-central1/api",

  // deployed version of amazon server on render.com
  baseURL: "https://amazon-api-deploy-j96e.onrender.com",
});

export { axiosInstance };
