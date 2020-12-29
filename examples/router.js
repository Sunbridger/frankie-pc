import Vue from 'vue';
import Router from 'vue-router';
import Index from 'examples/views/index';
import ComponentIndex from 'examples/views/components/index';

import componentNav from 'doc/map/component-nav.json';

const componentsInfo = componentNav.find(item => item.name === 'components');
const modules = componentsInfo.modules;
const components = [].concat(...modules.map(item => item.children));

const componentRoutes = components.map(component => ({
    path: `/${component.name}`,
    name: component.name,
    component: () => import(`examples/views${component.path}.vue`)
}));

const routes = [
    {
        path: '/',
        name: 'index',
        component: Index,
        children: [
            {
                path: '/:componentName',
                component: ComponentIndex,
                children: componentRoutes
            }
        ]
    },
    {
        path: '*',
        redirect: '/'
    }
];

Vue.use(Router);

export default new Router({
    routes
});
