module.exports = {
  publicPath: "/",
  assetsDir: "public",
  devServer: {
    disableHostCheck: true,
    proxy: {
      "/condition": {
        target: "https://api.jisuapi.com", //目标api
        changeOrigin: true, //允许跨域
        pathRewrite: {
          "^/condition": "",
          // '/'这里理解成用‘/condition’代替target里面的地址，后面组件中我们掉接口时直接用api代替
        },
      },
      "/food": {
        target: "http://api.tianapi.com", //目标api
        changeOrigin: true, //允许跨域
        pathRewrite: {
          "^/food": "",
          // '/'这里理解成用‘/condition’代替target里面的地址，后面组件中我们掉接口时直接用api代替
        },
      },
    },
  },
  css: {},
};
