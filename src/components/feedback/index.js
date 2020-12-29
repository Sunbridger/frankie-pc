/* 这是一个根据components.json自动生成的文件 */
import plugins from './plugins/index'
import Modal from './modal';
import Loading from './loading';
import Toast from './toast';
import Confirm from './confirm';

const components = [
    Modal,
    Loading,
    Toast,
    Confirm
];

components.forEach((component) => {
    component.install = function(Vue) { // eslint-disable-line
        Vue.component(component.name, component);
    };
});

const install = function(Vue) {
    /* istanbul ignore if */
    if (install.installed) return;

    components.forEach((component) => {
        Vue.component(component.name, component);
    });

    plugins(Vue)
};

/* istanbul ignore if */
if (typeof window !== 'undefined' && window.Vue) {
    install(window.Vue);
}

export default {
    install
};

export {
    Modal,
    Loading,
    Toast,
    Confirm
};
