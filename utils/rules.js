/**
 * @file 验证判断公共方法
 * @author Leon Liu
 * @email liujianyong@cd.baidu.com
 */
import * as regular from './regular';

export default {
  isObject: function (value) {
    return Object.prototype.toString.call(value) === '[object Object]';
  },
  isEmptyObject: function (value) {
    return this.isObject(value) && Object.keys(value).length === 0;
  },
  isArray: function (value) {
    return Object.prototype.toString.call(value) === '[object Array]';
  },
  isFunction: function (value) {
    return Object.prototype.toString.call(value) === '[object Function]';
  },
  isRegExp: function (value) {
    return Object.prototype.toString.call(value) === '[object RegExp]';
  },
  isString: function (value) {
    return Object.prototype.toString.call(value) === '[object String]';
  },
  isNumber: function (value) {
    return !isNaN(value);
  },
  isEmail: function (value) {
    return !!regular.EMAIL_RE.test(value);
  },
  isPhone: function (value) {
    return !!regular.PHONE_RE.test(value);
  }
};
