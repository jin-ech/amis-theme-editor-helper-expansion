/**
 * amis-theme-editor-helper v2.0.11-beta.2
 * Copyright 2018-2023 @fex
 */

'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

function getGlobalData(data) {
    if (!data || !data.global) {
        return {};
    }
    var _a = data.global, colors = _a.colors, fonts = _a.fonts, borders = _a.borders, sizes = _a.sizes, shadows = _a.shadows;
    var colorOptions = [];
    var fontFamilyOptions = [];
    var fontSizeOptions = [];
    var fontWeightOptions = [];
    var lineHeightOptions = [];
    var borderRadiusOptions = [];
    var borderWidthOptions = [];
    var borderStyleOptions = [];
    var sizesOptions = [];
    var shadowOptions = [];
    // 解析颜色
    function getGlobalColors(item) {
        var children = [];
        item.body.common.forEach(function (common, i) {
            children.push({
                label: common.label,
                value: "var(".concat(item.token).concat(common.color + 1, ")"),
                realValue: item.body.colors[common.color].color
            });
        });
        // if (item.token === '--colors-neutral-fill-') {
        //   children.push({
        //     label: COLORLABELMAP['none'],
        //     value: `var(${item.token}none)`
        //   });
        // }
        return {
            label: item.label,
            value: item.token,
            children: children
        };
    }
    colorOptions.push({
        label: '品牌色',
        value: 'brand',
        children: [getGlobalColors(colors.brand)]
    });
    var neutralColors = {
        label: '中性色',
        value: 'neutral',
        children: []
    };
    colors.neutral.body.forEach(function (color, i) {
        neutralColors.children.push(getGlobalColors(color));
    });
    colorOptions.push(neutralColors);
    var funcColors = {
        label: '辅助色',
        value: 'neutral',
        children: []
    };
    colors.func.body.forEach(function (color, i) {
        funcColors.children.push(getGlobalColors(color));
    });
    colorOptions.push(funcColors);
    var _loop_1 = function (k) {
        var _b;
        var key = k;
        var options = {
            size: fontSizeOptions,
            lineHeight: lineHeightOptions,
            weight: fontWeightOptions
        };
        var children = [];
        if (key !== 'base') {
            fonts[key].body.forEach(function (font, i) {
                children.push({
                    label: "".concat(font.label, "(").concat(font.value, ")"),
                    value: "var(".concat(font.token, ")"),
                    realValue: "".concat(font.value)
                });
            });
            (_b = options[key]).push.apply(_b, children);
        }
        else {
            fonts['base'].body.forEach(function (font, i) {
                children.push({
                    label: font.value,
                    value: font.value,
                    realValue: font.value
                });
            });
            fontFamilyOptions.push.apply(fontFamilyOptions, children);
        }
    };
    // 解析文字
    for (var k in fonts) {
        _loop_1(k);
    }
    var _loop_2 = function (k) {
        var _c;
        var key = k;
        var options = {
            width: borderWidthOptions,
            style: borderStyleOptions,
            radius: borderRadiusOptions
        };
        var children = [];
        borders[key].body.forEach(function (border, i) {
            children.push({
                label: key === 'style' ? border.label : "".concat(border.label, "(").concat(border.value, ")"),
                realValue: border.value,
                value: "var(".concat(border.token, ")")
            });
        });
        (_c = options[key]).push.apply(_c, children);
    };
    // 解析边框
    for (var k in borders) {
        _loop_2(k);
    }
    // 解析常用尺寸
    sizes.size.body.forEach(function (size) {
        sizesOptions.push({
            label: "".concat(size.label, "(").concat(size.value, ")"),
            value: "var(".concat(size.token, ")"),
            realValue: size.value
        });
    });
    // 解析扩展尺寸
    var baseSizeStart = sizes.size.start;
    var baseSizeStartNumber = parseFloat(baseSizeStart);
    var baseSizeStartUnit = baseSizeStart.replace(baseSizeStartNumber.toString(), '');
    var baseSizeBase = sizes.size.base;
    for (var i = 1; i <= 50; i++) {
        var realValue = (i - 1) * baseSizeBase + baseSizeStartNumber + baseSizeStartUnit;
        sizesOptions.push({
            label: "\u5C3A\u5BF8".concat(i, "(").concat(realValue, ")"),
            value: "var(--sizes-base-".concat(i, ")"),
            realValue: realValue
        });
    }
    // 解析阴影
    shadows.shadow.body.forEach(function (shadow) {
        shadowOptions.push({
            label: shadow.label,
            value: "var(".concat(shadow.token, ")"),
            realValue: shadow.value
        });
    });
    return {
        colorOptions: colorOptions,
        fontFamilyOptions: fontFamilyOptions,
        fontSizeOptions: fontSizeOptions,
        lineHeightOptions: lineHeightOptions,
        fontWeightOptions: fontWeightOptions,
        borderRadiusOptions: borderRadiusOptions,
        borderWidthOptions: borderWidthOptions,
        borderStyleOptions: borderStyleOptions,
        sizesOptions: sizesOptions,
        shadowOptions: shadowOptions
    };
}

exports.getGlobalData = getGlobalData;
