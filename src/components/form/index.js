/* 这是一个根据components.json自动生成的文件 */
import Rate from './rate';
import Input from './input';

const components = [
    Rate,
    Input
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
};

/* istanbul ignore if */
if (typeof window !== 'undefined' && window.Vue) {
    install(window.Vue);
}

export default {
    install
};

export {
    Rate,
    Input
};
