import Vue from "vue";
import axios from "axios";
import { HELPERS } from "./helpers";

 const {accessToken} = localStorage;

export const axiosIns = axios.create({
    baseURL: HELPERS.URL_API,
    //timeout: 1000,
    headers: {
        "Contenct-type": "multipart/form-data"
    },
});

export const axiosToken = axios.create({
    baseURL: HELPERS.URL_API,

    headers: {
        "Contenct-type": "multipart/form-data",
    },
});

Vue.prototype.$http = axiosIns;

export default axiosIns;
