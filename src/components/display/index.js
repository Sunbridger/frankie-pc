/* 这是一个根据components.json自动生成的文件 */
import plugins from './plugins/index'
import Tag from './tag';
import Empty from './empty';
import TagClose from './tag-close';

const components = [
    Tag,
    Empty,
    TagClose
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

    plugins(Vue);
};

/* istanbul ignore if */
if (typeof window !== 'undefined' && window.Vue) {
    install(window.Vue);
}

export default {
    install
};

export {
    Tag,
    Empty,
    TagClose
};
