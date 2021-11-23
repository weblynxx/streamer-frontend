process.env.VUE_APP_VERSION = require('./package.json').version;

module.exports = {
  chainWebpack: config => {
    config.module
      .rule('i18n')
      .resourceQuery(/blockType=i18n/)
      .type('javascript/auto')
      .use('i18n')
      .loader('@kazupon/vue-i18n-loader')
      .end();
  },
  css: {
    extract: false,
  },
  pluginOptions: {
    i18n: {
      locale: 'de',
      fallbackLocale: 'en',
      localeDir: 'locales',
      enableInSFC: true,
    },
  },
  pwa: {
    workboxPluginMode: 'InjectManifest',
    workboxOptions: {
      swSrc: './src/sw.js',
      swDest: 'service-worker.js',
    },
  },
  transpileDependencies: ['vuetify'],
  devServer: {
    host: '0.0.0.0',
    port: 2002,
    proxy: {
      '^/api': {
        target: process.env.VUE_APP_DEFAULT_BACKEND_URL,
        ws: false,
        changeOrigin: false,
      },
      '^/odata': {
        target: process.env.VUE_APP_DEFAULT_BACKEND_URL,
        changeOrigun: false,
      },
    },
  },
  lintOnSave: false,
};
