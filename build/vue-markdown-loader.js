var cheerio = require('cheerio');
var hljs = require('highlight.js');
var markdownIt = require('markdown-it');
var markdownItContainer = require('markdown-it-container');

function _convert(str) {
    str = str.replace(/(&#x)(\w{4});/gi, function($0) {
        return String.fromCharCode(parseInt(encodeURIComponent($0).replace(/(%26%23x)(\w{4})(%3B)/g, '$2'), 16));
    });
    return str;
}

function _strip(str, tags) {
    var $ = cheerio.load(str, {decodeEntities: false});

    if (!tags || tags.length === 0) {
        return str;
    }

    tags = !Array.isArray(tags) ? [tags] : tags;
    var len = tags.length;

    while (len) {
        len -= 1;
        $(tags[len], 'head').remove();
    }

    return $('head').html();
}

function _renderHighlight(str, lang) {
    if (!(lang && hljs.getLanguage(lang))) {
        return '';
    }
    return `<pre class="hljs"><code>${
        hljs.highlight(lang, str, true).value
    }</code></pre>`;
}

function setLabelRender(label) {
    return function(tokens, idx) {
        var m = tokens[idx].info.trim().match(`^${label}\\s+(.*)$`) || [];
        if (tokens[idx].nesting === 1) {
            return m[1] ?
                `<div class="page-docs__${label}">\n` +
                        `<div class="page-docs__${label}-title">${m[1]}</div>` :
                `<div class="page-docs__${label}">\n`;
        } else {
            return '</div>\n';
        }
    };
}

function getMarkdownOptions () {
    var md = markdownIt();
    return {
        raw: true,
        highlight: _renderHighlight,
        use: [
            [markdownItContainer, 'tip', {
                render: setLabelRender('tip')
            }],
            [markdownItContainer, 'warning', {
                render: setLabelRender('warning')
            }],
            [markdownItContainer, 'danger', {
                render: setLabelRender('danger')
            }],
            [markdownItContainer, 'demo', {
                validate: function(params) {
                    return params.trim().match(/^demo\s*(.*)$/);
                },
                render: function(tokens, idx) {
                    var m = tokens[idx].info.trim().match(/^demo\s*(.*)$/);

                    if (tokens[idx].nesting === 1) {
                        var title = (m && m.length > 1) ? m[1] : '';
                        var desc = '';
                        var content = tokens[idx + 1].content;

                        if (!content) {
                            content = tokens[idx + 4].content;
                            desc = tokens[idx + 2].content;
                            // 移除描述，防止被添加到代码块
                            tokens[idx + 2].children = [];
                        }

                        var html = _convert(_strip(content, ['script', 'style'])).replace(/(<[^>]*)=""(?=.*>)/g, '$1');
                        return `<demo-block>
                            <div slot="source">${html}</div>
                            <div slot="title">${title}</div>
                            <div slot="desc">${md.renderInline(desc)}</div>
                            <div slot="highlight">`;
                    }
                    return '</div></demo-block>\n';
                }
            }]
        ]
    };
}

module.exports = {
    getMarkdownOptions
};
