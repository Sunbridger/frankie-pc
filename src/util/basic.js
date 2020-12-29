export default {
    isIphoneX: /iphone/gi.test(navigator.userAgent) && window.screen.height === 812 && window.screen.width === 375,
    isIphoneXRXMax: /iphone/gi.test(navigator.userAgent) && window.screen.height === 896 && window.screen.width === 414,
    inAndroid: navigator.userAgent.indexOf('Android') > -1 || navigator.userAgent.indexOf('Adr') > -1
};
