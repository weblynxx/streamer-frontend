import Vue from 'vue';
import App from '@/components/app/app.vue';
import router from './router';
// import store from "./store";
import vuetify from './plugins/vuetify';
import store from './shared/store';
import { Logger } from 'fsts';
import './plugins/vee-validate';
import Vuetify from 'vuetify';

var moment = require('moment-timezone');
var timezone = moment.tz.guess();
moment.tz.setDefault(timezone);
export default moment;

Vue.config.productionTip = false;
if (process.env.NODE_ENV == 'development') Logger.LOG_LEVEL = 'DEBUG';
Vue.use(Vuetify);
new Vue({
  el: '#app',
  router: router,
  store,
  vuetify,
  render: h => h(App),
});
