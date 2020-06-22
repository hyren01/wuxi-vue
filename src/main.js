import 'material-design-icons-iconfont/dist/material-design-icons.css' // Ensure you are using css-loader
import Vue from 'vue'
import Antd from 'ant-design-vue'
import './plugins/vuetify'
import './plugins/axios'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';

import App from './App.vue'
import router from './router'
import { Upload,Tree,TreeSelect } from 'ant-design-vue';
import 'ant-design-vue/dist/antd.css';
// import '@/assets/bootstrap.min.css';
import api from './api/api';
import Vuex from 'vuex';
import store from '@/api/store';
Vue.use(Vuex);
Vue.use(ElementUI);
Vue.use(Antd);
Vue.prototype.$api = api;
Vue.config.productionTip = false;
new Vue({
    router,
    store,
    render: h => h(App),
}).$mount('#app')