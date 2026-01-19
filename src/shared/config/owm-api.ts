import axios from "axios";

export const owmAxios = axios.create({
  baseURL: `https://api.openweathermap.org/data`,
  params: {
    appid: import.meta.env.VITE_DATA_API_KEY,
    units: "metric",
    lang: "kr",
  },
});
