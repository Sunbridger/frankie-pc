import Vue from 'vue';
import Router from 'vue-router';

import map from 'doc/map';

const templates = {
    side: () => import('views/templates/side'),
    main: () => import('views/templates/main')
};

const generateRoutes = (navConfig) => {
    const {
        pageName,
        path,
        template,
        nav,
        redirect
    } = navConfig;

    // 没有指定模板
    const targetTpl = templates[template];
    if (!template || !targetTpl) return false;

    const parentRoute = {
        path: `/${pageName}`,
        component: targetTpl,
        children: []
    };

    // 没有子路由
    if (!nav) {
        parentRoute.children.push({
            path: '',
            name: pageName,
            component: () => import(`doc/views${path}.md`).catch(() => import(`doc/views${path}.vue`))
        });
        return parentRoute;
    }

    if (redirect) {
        parentRoute.redirect = redirect;
    }
    nav.forEach((navItem) => {
        let { children, modules, name: navItemName } = navItem;
        children = modules ?
            [].concat(...modules.map(group => group.children)) :
            children;

        if (!children) return false;

        children.forEach((item) => {
            const { path: itemPath, name: itemName } = item;
            if (!itemPath) return false;

            parentRoute.children.push({
                path: itemName,
                name: `${navItemName}-${itemName}`,
                component: () => import(`doc/views${itemPath}.md`).catch(() => import(`doc/views${itemPath}.vue`))
            });
        });
    });
    return parentRoute;
};

const routes = map.map(generateRoutes).filter(route => route.path);
routes.push({
    path: '*',
    redirect: '/components/install'
});

Vue.use(Router);

export default new Router({
    routes
});
