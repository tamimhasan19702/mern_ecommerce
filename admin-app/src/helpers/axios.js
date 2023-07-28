/**
 * * title: axios helper
 * * description: this is axios helper function to create some axios instance and to help calling the api
 * * author: Tareq Monower
 * *
 *
 * @format
 */

import axios from "axios";
import { api } from "../urlConfig";
const token = window.localStorage.getItem("token");

//creating a axios instance
const axiosIntance = axios.create({
  baseURL: api,
  headers: {
    Authorization: token ? `Bearer ${token}` : "",
  },
});

export default axiosIntance;
