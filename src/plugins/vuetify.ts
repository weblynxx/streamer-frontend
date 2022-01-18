import '@fortawesome/fontawesome-free/css/all.css';
import Vue from 'vue';
import Vuetify from 'vuetify/lib';
import '../style/fonts/Gilroy/stylesheet.css';

Vue.use(Vuetify);

export default new Vuetify({
  theme: { dark: false },
  icons: {
    iconfont: 'mdi', // 'md' || 'fa' || 'mdi'|| 'mdiSvg' || 'md' || 'fa' || 'fa4'
  },
  font: {
    family: 'Gilroy',
  },
});
