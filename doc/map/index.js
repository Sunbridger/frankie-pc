import componentNav from './component-nav.json';

export default [
    {
        pageName: 'components',
        path: '/components',
        redirect: '/components/install',
        alias: '组件',
        template: 'side',
        nav: componentNav
    },
    {
        pageName: 'changelog',
        path: '/changelog',
        alias: '更新日志',
        template: 'main'
    },
    {
        pageName: 'help',
        path: '/help',
        alias: '帮助',
        template: 'main'
    }
];
