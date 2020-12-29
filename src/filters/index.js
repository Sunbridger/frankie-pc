export default {
    toHttps(url) {
        if (/^http:/.test(url)) {
            return url.replace(/^http/, 'https');
        } else if (/^\/\//.test(url)) {
            return `https:${url}`;
        }
        return url;
    }
};
