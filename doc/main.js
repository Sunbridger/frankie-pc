import 'highlight.js/styles/monokai-sublime.css';
import 'lemon';
import 'lemon/less/reset.less';
import 'styles/common.less';
import Vue from 'vue';
import main from 'main';
import { Menu, MenuItem, Row, Col, Dropdown, DropdownMenu, DropdownItem } from 'element-ui';
import docApi from '@souche-vue/component-doc-api';
import VueScrollbar from 'vue-custom-scrollbar';
import App from './App.vue';
import router from './router';
import DemoBlock from './components/common/demo';

Vue.config.productionTip = false;

const isProduction = process.env.NODE_ENV === 'production';

Vue.use(main);
const elComponents = [
    Menu, MenuItem, Row, Col, Dropdown, DropdownMenu, DropdownItem
];
elComponents.forEach(elComponent => Vue.use(elComponent));
Vue.component('demo-block', DemoBlock);
Vue.component('VueScrollbar', VueScrollbar);
Vue.use(docApi, {
    isProduction
});

new Vue({
    router,
    render: h => h(App)
}).$mount('#app');
