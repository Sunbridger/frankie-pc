/**
 * props 验证辅助函数
 */

import basic from './basic';

// 枚举验证
export const enumValidator = arr =>
    function(value) {
        return arr.indexOf(value) !== -1;
    };

export const ObjValidator = () => {};

export default {
    ...basic
};
