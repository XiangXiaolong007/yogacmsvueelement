const isDev = process.env.NODE_ENV === "development";
const isTest = process.env.VUE_APP_BUILD_TYPE === "test";
const isOnline = process.env.VUE_APP_BUILD_TYPE === "online";

// eslint-disable-next-line no-unused-vars
let requestUrl = "";

if(isDev) {
    requestUrl = window.location.origin
} else if(isTest) {
    requestUrl = "http://115.29.202.161:8090/appadmin/"
} else if(isOnline) {
    requestUrl = "http://admin.dailyyoga.com.cn/appadmin/"
}
export default requestUrl;