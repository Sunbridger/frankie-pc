/* 这是一个根据components.json自动生成的文件 */
import plugins from './plugins/index';
import Button from './components/base/button';
import Icon from './components/base/icon';
import Tag from './components/display/tag';
import Empty from './components/display/empty';
import TagClose from './components/display/tag-close';
import Modal from './components/feedback/modal';
import Loading from './components/feedback/loading';
import Toast from './components/feedback/toast';
import Confirm from './components/feedback/confirm';
import Video from './components/special/video';
import Rate from './components/form/rate';
import Input from './components/form/input';
import Tabs from './components/navigator/tabs';

const components = [
    Button,
    Icon,
    Tag,
    Empty,
    TagClose,
    Modal,
    Loading,
    Toast,
    Confirm,
    Video,
    Rate,
    Input,
    Tabs
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
    Button,
    Icon,
    Tag,
    Empty,
    TagClose,
    Modal,
    Loading,
    Toast,
    Confirm,
    Video,
    Rate,
    Input,
    Tabs
};
