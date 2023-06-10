/**
 * amis-theme-editor-helper v2.0.11-beta.2
 * Copyright 2018-2023 @fex
 */

'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var styleMap = {
    border: ['border-top', 'border-right', 'border-left', 'border-bottom']
};
function styleBorder(style) {
    var styleList = styleMap.border;
    var data = {};
    for (var _i = 0, styleList_1 = styleList; _i < styleList_1.length; _i++) {
        var item = styleList_1[_i];
        var values = style.getPropertyValue(item);
        var _a = item.split('-'), border = _a[0], position = _a[1];
        var _b = values.split(' '), borderWidth = _b[0], borderStyle = _b[1], borderColor = _b.slice(2);
        data["".concat(position, "-").concat(border, "-width")] = borderWidth;
        data["".concat(position, "-").concat(border, "-style")] = borderStyle;
        data["".concat(position, "-").concat(border, "-color")] = borderColor.join('');
    }
    return data;
}
function styleBackground(style) {
    var image = style.getPropertyPriority('background-image');
    var data = image;
    if (image === 'none') {
        data = style.getPropertyValue('background-color');
    }
    return data;
}
function getStyleById(id, name) {
    if (!name) {
        return null;
    }
    var dom = document.getElementsByName(id);
    if (dom.length === 0) {
        return null;
    }
    dom = dom[0];
    var list = name.split('.');
    name = list[list.length - 1];
    var styleName = name.split(':')[0];
    var style = getComputedStyle(dom);
    var data = {};
    switch (styleName) {
        case 'border':
            data = styleBorder(style);
            break;
        case 'color':
            data = style.getPropertyValue('color');
            break;
        case 'background':
            data = styleBackground(style);
            break;
    }
    return data;
}
function getCssVarByName(name, className) {
    if (className === void 0) { className = '.ThemeEditor-body-content-item-content'; }
    name = name === null || name === void 0 ? void 0 : name.replace('var', '').replace('(', '').replace(')', '');
    try {
        var res = getComputedStyle(document.querySelector(className)).getPropertyValue(name);
        return res;
    }
    catch (error) {
        return '';
    }
}

exports.getCssVarByName = getCssVarByName;
exports.getStyleById = getStyleById;
exports.styleBackground = styleBackground;
exports.styleBorder = styleBorder;
