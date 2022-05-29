import axios from "axios";

const host = process.env.REACT_APP_API_HOST;

const instance = axios.create({
  baseURL: host,
  // timeout: 1000,
  headers: {
    "Content-Type": "application/json",
  },
});

export const getBanners = () => {
  const endpoint = "/photostory";
  return instance.get(endpoint);
};

export const updateBanner = (data) => {
  const endpoint = `${host}/photostory`;
  return axios.post(endpoint, data, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
};
