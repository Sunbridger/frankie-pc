const render = require('json-templater/string');
const fs = require('fs');
const { namespace } = require('../../components.json');
const { title } = require('./utils');

const moduleIndexEntryTemplate = `/* 这是一个根据components.json自动生成的文件 */
import plugins from './plugins/index'
{{importList}}

const components = [
{{componentList}}
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
{{componentList}}
};
`;

const componentSrcIndexTemplate = `<template>
    <div class="${namespace}-{{componentName}}">{{componentName}}</div>
</template>

<script>
export default {
    name: '${title(namespace)}{{componentTitleName}}'
};
</script>

<style lang="less">
.${namespace}-{{componentName}} {

}
</style>
`;

const componentDocTemplate = `## {{componentName}}

:::demo {{componentChineseName}}
使用说明

\`\`\`html
<template>
    <${namespace}-{{componentName}}></${namespace}-{{componentName}}>
</template>
\`\`\`
:::
`;

const componentTestTemplate = `import { mount } from '@vue/test-utils';
import {{componentTitleName}} from 'main/components/base/{{componentName}}.vue';
import { namespace } from 'root/components.json';
import { title } from 'root/build/share/utils';

describe('{{componentName}}', () => {
    it('渲染{{componentChineseName}}组件', () => {
        const wrapper = mount({{componentTitleName}});
        expect(wrapper.element).toMatchSnapshot();
        expect(wrapper.name()).toMatch(new RegExp(\`^\${title(namespace)}\`));
    });
});
`;

const componentExampleTemplate = `<template>
    <div class="pg-component-{{componentName}}">{{componentName}}</div>
</template>
`;

/**
 * 渲染并保存模板
 * @param {Object} param { template, data, path }
 */
function renderTemplate({ template, data, path }) {
    const templates = render(template, data);
    fs.writeFileSync(path, templates);
}

module.exports = {
    /**
     * 渲染模块入口文件
     * @param {String} path 路径
     * @param {Object} data { importList, componentList }
     */
    renderModuleIndexEntry(path, data) {
        renderTemplate({
            template: moduleIndexEntryTemplate,
            data,
            path
        });
    },
    /**
     * 渲染组件
     * @param {String} path 路径
     * @param {Object} data { componentName, componentTitleName }
     */
    renderComponentSrcIndex(path, data) {
        renderTemplate({
            template: componentSrcIndexTemplate,
            data,
            path
        });
    },
    /**
     * 渲染组件文档
     * @param {String} path 路径
     * @param {Object} data { componentName， componentChineseName }
     */
    renderComponentDoc(path, data) {
        renderTemplate({
            template: componentDocTemplate,
            data,
            path
        });
    },
    /**
     * 渲染组件测试文件
     * @param {String} path 路径
     * @param {Object} data { componentName, componentTitleName, componentChineseName }
     */
    renderComponentTest(path, data) {
        renderTemplate({
            template: componentTestTemplate,
            data,
            path
        });
    },
    /**
     * 渲染组件测试文件
     * @param {String} path 路径
     * @param {Object} data { componentName }
     */
    renderComponentExample(path, data) {
        renderTemplate({
            template: componentExampleTemplate,
            data,
            path
        });
    }
};
