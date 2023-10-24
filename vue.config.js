module.exports = {
  publicPath: process.env.VUE_APP_ENV === 'prod' ? process.env.VUE_APP_PATH : "/",
  transpileDependencies: [
    'vuetify'
  ],

  productionSourceMap: process.env.VUE_APP_ENV === 'prod' ? false : true,
}
