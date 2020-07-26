// vue.config.js
const path = require("path");
const resolve = dir => path.join(__dirname, dir);
const IS_PROD = ["production", "prod"].includes(process.env.NODE_ENV);

module.exports = {
  // options...
  publicPath: process.env.NODE_ENV === 'production'
    ? '/hexschool/week5/'
    : '/',
}