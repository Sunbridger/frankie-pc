const exec = require('child_process').exec;
const { modules } = require('../components.json');
const { success, error } = require('./share/utils');
const {
    logWithSpinner,
    stopSpinner
} = require('@vue/cli-shared-utils');

const entries = {};
modules.forEach((moduleInfo) => {
    const { name: moduleName, components } = moduleInfo;
    entries[moduleName] = `src/components/${moduleName}/index.js`;

    components.forEach((component) => {
        entries[component] = `src/components/${moduleName}/${component}.vue`;
    });
});

const taskList = Object.keys(entries).map(entryName => new Promise((resolve, reject) => {
    exec(`LIB=components npm run lib -- --name ${entryName} --entry ${entries[entryName]} --entryObj ${JSON.stringify(entries)}`, (err) => {
        if (err) {
            reject(err);
        }
        resolve();
    });
}));

logWithSpinner('打包各个模块和组件...');
Promise.all(taskList).then(() => {
    stopSpinner(true);
    success('全部打包完成');
}).catch((err) => {
    stopSpinner(false);
    error(err);
});
