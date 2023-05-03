import axios from "axios";
import * as https from "https";

const instance = axios.create({
  baseURL: process.env.ELASTIC_URL,
  headers: {
    Authorization: `ApiKey ${process.env.ELASTIC_API_KEY}`,
  },
  httpsAgent: new https.Agent({
    rejectUnauthorized: false,
  }),
});

export default instance;
