import Vue from 'vue';

import App from './Root';
import router from './router';
import httpPlugin from './plugins/http';
import store from './vuex/store';

Vue.use(httpPlugin);

/* eslint-disable no-new */
new Vue({
  router,
  el: '#app',
  store,
  render: h => h(App),
});
