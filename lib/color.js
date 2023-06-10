/**
 * amis-theme-editor-helper v2.0.11-beta.2
 * Copyright 2018-2023 @fex
 */

'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var ColorGenerator = require('./ColorGenerator.js');

function computedLight(R, G, B) {
    var gray = 0.299 * R + 0.587 * G + 0.114 * B;
    return { gray: gray, light: (gray / 255) * 100 };
}
var getColorPalette = function (color, vv) {
    var rgb = ColorGenerator.ColorGenerator.hexToRgb(color);
    var _a = ColorGenerator.ColorGenerator.rgbToHsv(rgb), h = _a[0], s = _a[1], v = _a[2];
    var newColors = [];
    // 原色的灰色模型
    var _b = computedLight(rgb[0], rgb[1], rgb[2]), gray = _b.gray, mainLight = _b.light;
    newColors.push({
        rgb: rgb,
        hsv: [h, s, v],
        gray: gray,
        light: mainLight,
        checkedRgb: rgb,
        checkedColor: ColorGenerator.ColorGenerator.rgbToHex(rgb),
        checkedGray: gray,
        checkedLight: mainLight
    });
    /** 基础校正 */
    // // 降低亮度
    // if (mainLight > 55) {
    //   mainLight = mainLight / 2;
    // }
    // // 提高饱和度
    // if (s < 70) {
    //   s = 70 + 70 - s;
    // }
    // // 提高饱和度
    // if (v < 70) {
    //   v = 70 + 70 - v;
    // }
    /** ***** */
    for (var i = 1; i < 24; i++) {
        var newH = (h + 15 * i) % 360;
        var newRgb = ColorGenerator.ColorGenerator.hsvToRgb([newH, s, v]);
        // 灰度关系
        var _c = computedLight(newRgb[0], newRgb[1], newRgb[2]), gray_1 = _c.gray, light = _c.light;
        var newColor = {
            rgb: rgb,
            hsv: [h, s, v],
            gray: gray_1,
            light: light,
            checkedRgb: rgb,
            checkedColor: ColorGenerator.ColorGenerator.rgbToHex(rgb),
            checkedGray: gray_1,
            checkedLight: light
        };
        var checkedS = s;
        var checkedV = v;
        // 灰色校正
        var checkedRgb = newRgb;
        // 降低饱和度
        while (mainLight > light && checkedS > 0) {
            checkedS--;
            checkedRgb = ColorGenerator.ColorGenerator.hsvToRgb([newH, checkedS, checkedV]);
            var _d = computedLight(checkedRgb[0], checkedRgb[1], checkedRgb[2]), checkedGray = _d.gray, checkedLight = _d.light;
            light = checkedLight;
            gray_1 = checkedGray;
        }
        // 降低明度
        while (mainLight < light && checkedV > 0) {
            checkedV--;
            checkedRgb = ColorGenerator.ColorGenerator.hsvToRgb([newH, checkedS, checkedV]);
            var _e = computedLight(checkedRgb[0], checkedRgb[1], checkedRgb[2]), checkedGray = _e.gray, checkedLight = _e.light;
            light = checkedLight;
            gray_1 = checkedGray;
        }
        newColor.checkedLight = light;
        newColor.checkedGray = gray_1;
        newColor.checkedRgb = checkedRgb;
        newColor.checkedColor = ColorGenerator.ColorGenerator.rgbToHex(checkedRgb);
        newColors.push(newColor);
    }
    return newColors;
};

exports.computedLight = computedLight;
exports.getColorPalette = getColorPalette;
