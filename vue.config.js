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
        target: 'http://127.0.0.1:5252',
        ws: false,
        changeOrigin: false,
      },
      '^/odata': {
        target: 'http://127.0.0.1:5252',
        changeOrigun: false,
      },
    },
  },
  lintOnSave: false,
};
