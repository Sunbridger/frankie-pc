/* eslint-disable no-shadow, class-methods-use-this */
const path = require('path');
const exec = require('child_process').execSync;
const render = require('./templates');
const {
    title,
    checkStat,
    mkDir,
    setJsonFile
} = require('./utils');
const componentsInfo = require('../../components.json');
const componentNav = require('../../doc/map/component-nav.json');

const resolve = (...dirs) => path.resolve(__dirname, '../..', ...dirs);

const componentNavPath = resolve('doc/map/component-nav.json');
const componentsInfoPath = resolve('components.json');
const rootIndexPath = resolve('src/index.js');


// 设置导航和组件列表的数据
function setNavAndInfo() {
    setJsonFile(componentNavPath, componentNav);
    setJsonFile(componentsInfoPath, componentsInfo);
}

class Module {
    constructor(moduleName, moduleChineseName) {
        this.moduleName = moduleName;
        this.moduleChineseName = moduleChineseName;
        this.moduleSrcDir = resolve(`src/components/${moduleName}`);
        this.moduleSrcIndexEntry = resolve(this.moduleSrcDir, 'index.js');
        this.moduleDocDir = resolve(`doc/views/components/${moduleName}`);
        this.moduleTestDir = resolve(`tests/unit/spec/${moduleName}`);
        this.moduleExampleDir = resolve(`examples/views/components/${moduleName}`);

        this.componentNavModule = null;
        this.componentsInfoModule = null;

        this.init();
    }

    /**
     * 初始化
     */
    init() {
        // 创建文件夹
        mkDir(this.moduleSrcDir);
        mkDir(this.moduleDocDir);
        mkDir(this.moduleTestDir);
        mkDir(this.moduleExampleDir);

        // 设置模块导航数据
        const nav = componentNav.find(item => item.name === 'components');
        this.componentNavModule = nav.modules.find(item => item.name === this.moduleName);
        if (!this.componentNavModule) {
            this.componentNavModule = {
                name: this.moduleName,
                alias: this.moduleChineseName,
                children: []
            };
            nav.modules.push(this.componentNavModule);
        }

        // 设置模块组件列表
        const modules = componentsInfo.modules;
        this.componentsInfoModule = modules.find(item => item.name === this.moduleName);
        if (!this.componentsInfoModule) {
            this.componentsInfoModule = {
                name: this.moduleName,
                components: []
            };
            modules.push(this.componentsInfoModule);
        }

        setNavAndInfo();
    }

    /**
     * 获取组件相关的路径
     * @param {String} componentName 组件名
     */
    getComponentSources(componentName) {
        const componentSrcIndex = resolve(this.moduleSrcDir, `${componentName}.vue`);
        const componentDoc = resolve(this.moduleDocDir, `${componentName}.md`);
        const componentTest = resolve(this.moduleTestDir, `${componentName}.spec.js`);
        const componentExample = resolve(this.moduleExampleDir, `${componentName}.vue`);
    
        return {
            componentSrcIndex,
            componentDoc,
            componentTest,
            componentExample
        };
    }

    /**
     * 判断组件是否是否存在
     * @param {String} componentName 组件名
     */
    isExistComponent(componentName) {
        const {
            componentSrcIndex,
            componentDoc,
            componentTest,
            componentExample
        } = this.getComponentSources(componentName);

        const sourceList = [
            {
                path: componentSrcIndex,
                type: 'file'
            },
            {
                path: componentDoc,
                type: 'file'
            },
            {
                path: componentTest,
                type: 'file'
            },
            {
                path: componentExample,
                type: 'file'
            }
        ];

        // 判断组件是否存在
        for (const { path, type } of sourceList) {
            if (checkStat(path, type)) {
                return true;
            }
        }
        // 判斷導航和組件列表中是否存在
        const ifComponentInNav = this.componentNavModule.children.find(item => item.name === componentName);
        if (ifComponentInNav) return true;
        const ifComponentInInfo = this.componentsInfoModule.components.find(item => item === componentName);
        if (ifComponentInInfo) return true;

        return false;
    }

    /**
     * 模块删除
     */
    destroy() {
        exec(`rm -rf ${this.moduleSrcDir} ${this.moduleDocDir} ${this.moduleTestDir} ${this.moduleExampleDir}`);
        
        this.componentNavModule = null;
        this.componentsInfoModule = null;

        const nav = componentNav.find(item => item.name === 'components');
        const componentNavModuleIndex = nav.modules.findIndex(item => item.name === this.moduleName);
        nav.modules.splice(componentNavModuleIndex, 1);

        const modules = componentsInfo.modules;
        const componentsInfoModuleIndex = modules.findIndex(item => item.name === this.moduleName);
        modules.splice(componentsInfoModuleIndex, 1);

        setNavAndInfo();
        this.setRootEntry();
    }

    /**
     * 根据components.json设置 根、模块的入口文件
     */
    setEntry() {
        const components = this.componentsInfoModule.components;
        const importList = [];
        const componentList = [];
        components.forEach((item) => {
            importList.push(`import ${title(item)} from './${item}';`);
            componentList.push(`    ${title(item)}`);
        });
        // 模块入口文件
        render.renderModuleIndexEntry(this.moduleSrcIndexEntry, {
            importList: importList.join('\n'),
            componentList: componentList.join(',\n')
        });

        this.setRootEntry();
    }

    /**
     * 根据components.json设置 根入口文件
     */
    setRootEntry() {
        const rootImportList = [];
        const rootComponentList = [];
        for (const moduleItem of componentsInfo.modules) {
            const { name: moduleName, components } = moduleItem;
            for (const componentName of components) {
                const componentTitleName = title(componentName);
                rootImportList.push(`import ${componentTitleName} from './components/${moduleName}/${componentName}';`);
                rootComponentList.push(`    ${componentTitleName}`);
            }
        }
        render.renderModuleIndexEntry(rootIndexPath, {
            importList: rootImportList.join('\n'),
            componentList: rootComponentList.join(',\n')
        });
    }

    /**
     * 创建组件
     * @param {String} componentName 组件名
     * @param {String} componentChineseName 组件中文名
     */
    createComponent(componentName, componentChineseName) {
        const isExistComponent = this.isExistComponent(componentName);
        if (isExistComponent) return false;
        const {
            componentSrcIndex,
            componentDoc,
            componentTest,
            componentExample
        } = this.getComponentSources(componentName);

        try {
            const componentTitleName = title(componentName);

            // 模板渲染
            this.componentNavModule.children.push({
                name: componentName,
                alias: componentChineseName,
                path: `/components/${this.moduleName}/${componentName}`
            });
            this.componentsInfoModule.components.push(componentName);
            setNavAndInfo();

            render.renderComponentSrcIndex(componentSrcIndex, {
                componentName,
                componentTitleName
            });
            render.renderComponentTest(componentTest, {
                componentName,
                componentTitleName,
                componentChineseName
            });
            render.renderComponentDoc(componentDoc, {
                componentName,
                componentChineseName
            });
            render.renderComponentExample(componentExample, {
                componentName
            });
                

            // 根入口文件
            this.setEntry();

        } catch (e) {
            this.removeComponent(componentName);
        }

        return true;
    }

    /**
     * 删除组件
     * @param {String} componentName 组件名
     */
    removeComponent(componentName) {
        const isExistComponent = this.isExistComponent(componentName);
        if (!isExistComponent) return false;
        const {
            componentSrcIndex,
            componentDoc,
            componentTest,
            componentExample
        } = this.getComponentSources(componentName);

        exec(`rm -f ${componentSrcIndex} ${componentDoc} ${componentTest} ${componentExample}`);

        const componentInNavIndex = this.componentNavModule.children.findIndex(item => item.name === componentName);
        if (componentInNavIndex > -1) {
            this.componentNavModule.children.splice(componentInNavIndex, 1);
        }
        const componentInInfoIndex = this.componentsInfoModule.components.findIndex(item => item === componentName);
        if (componentInInfoIndex > -1) {
            this.componentsInfoModule.components.splice(componentInInfoIndex, 1);
        }
        setNavAndInfo();
        this.setEntry();
    }
}

module.exports = Module;
