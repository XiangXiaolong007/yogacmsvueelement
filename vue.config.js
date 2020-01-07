const isDev = process.env.NODE_ENV === "development";
const isTest = process.env.VUE_APP_BUILD_TYPE === "test";

module.exports = {
  productionSourceMap: false,
  publicPath: './',
  outputDir: `./dist/${process.env.VUE_APP_BUILD_TYPE}`,
  devServer: {
    // baseUrl: "/",
    port: 8081,
    overlay: {
      warnings: false,
      errors: true
    },
    proxy: {
      "/": {
        target:
          isDev || isTest
            ? "http://115.29.202.161:8090/appadmin/"
            : "http://admin.dailyyoga.com.cn/appadmin/",
        changeOrigin: true, //是否跨域
        pathRewrite: {
          "^/": ""
        }
      }
    }
  }
};
