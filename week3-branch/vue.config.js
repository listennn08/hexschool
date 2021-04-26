// vue.config.js
module.exports = {
  // options...
  publicPath: process.env.NODE_ENV === 'production'
    ? '/hexschool/week3-branch/'
    : '/',
};
