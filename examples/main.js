import Vue from 'vue';
import main from 'main';
import VueScrollbar from 'vue-custom-scrollbar';
import 'lemon';
import 'lemon/less/reset.less';
import 'element-ui/lib/theme-chalk/index.css';
import App from './App.vue';
import router from './router';

Vue.config.productionTip = false;

Vue.use(main);
Vue.component('VueScrollbar', VueScrollbar);

new Vue({
    router,
    render: h => h(App)
}).$mount('#app');
