import Vue from "vue";
import axios from "axios";
import VueAxios from "vue-axios";
import { Message } from 'element-ui';
import requestUrl from "./requestUrl";

Vue.use(VueAxios, axios);
axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded; charset=UTF-8';

const instance = axios.create({
  baseURL: requestUrl,
  timeout: 30000
});

axios.interceptors.response.use(function (response) {
    // Any status code that lie within the range of 2xx cause this function to trigger
    // Do something with response data
    if (response.data.errno == 0) {
        return response.data;
    } else {
        Message({
            message: `Error No.${response.data.errno} Error Messages: ${response.data.errmsg}`,
            type: "error"
        });
        return;
    }
}, function (error) {
    Message({
        message: "服务器错误",
        type: "error"
    });
    // Any status codes that falls outside the range of 2xx cause this function to trigger
    // Do something with response error
    return Promise.reject(error);
});

export default instance;