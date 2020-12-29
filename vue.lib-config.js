const path = require('path');

const resolve = dir => path.join(__dirname, dir);

function addStyleResource(rule) {
    rule.use('style-resource')
        .loader('style-resources-loader')
        .options({
            patterns: [
                resolve('src/theme/variables.less'),
                resolve('doc/styles/global.less'),
                resolve('node_modules/@souche-ui/lemon/less/global.less')
            ]
        });
}

module.exports = {
    chainWebpack(config) {
        config.resolve.alias.set('lemon', '@souche-ui/lemon');

        const types = ['vue-modules', 'vue', 'normal-modules', 'normal'];
        types.forEach(type => addStyleResource(config.module.rule('less').oneOf(type)));
    }
};

if (process.env.LIB === 'components') {
    module.exports.css = {
        extract: false
    };
}
