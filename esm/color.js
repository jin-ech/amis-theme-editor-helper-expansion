/*
 * @Author: JC96821 13478707150@163.com
 * @Date: 2023-06-10 13:56:30
 * @LastEditors: JC96821 13478707150@163.com
 * @LastEditTime: 2023-06-10 15:21:25
 * @FilePath: \toeic-frontend-management\src\views\account-register\list\AmisTest\amis-theme-editor-helper\esm\color.js
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
/**
 * amis-theme-editor-helper v2.0.11-beta.2
 * Copyright 2018-2023 @fex
 */

import { ColorGenerator } from './ColorGenerator.js';

function computedLight(R, G, B) {
    var gray = 0.299 * R + 0.587 * G + 0.114 * B;
    return { gray: gray, light: (gray / 255) * 100 };
}
var getColorPalette = function (color, vv) {
    var rgb = ColorGenerator.hexToRgb(color);
    console.log('rgb: ', rgb);
    console.log('hsv: ', ColorGenerator.rgbToHsv(rgb));
    var _a = ColorGenerator.rgbToHsv(rgb), h = _a[0], s = _a[1], v = _a[2];
    var newColors = [];
    // 原色的灰色模型
    var _b = computedLight(rgb[0], rgb[1], rgb[2]), gray = _b.gray, mainLight = _b.light;
    newColors.push({
        rgb: rgb,
        newHsv: ColorGenerator.hsvToRgb([h, s, v]),
        hsv: [h, s, v],
        gray: gray,
        light: mainLight,
        checkedRgb: rgb,
        checkedColor: ColorGenerator.rgbToHex(rgb),
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
        console.log('newH', h, newH);
        var newRgb = ColorGenerator.hsvToRgb([newH, s, v]);
        // 灰度关系
        var _c = computedLight(newRgb[0], newRgb[1], newRgb[2]), gray_1 = _c.gray, light = _c.light;
        var newColor = {
            // rgb: rgb,
            rgb: newRgb,
            hsv: [h, s, v],
            gray: gray_1,
            light: light,
            checkedRgb: rgb,
            checkedColor: ColorGenerator.rgbToHex(rgb),
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
            checkedRgb = ColorGenerator.hsvToRgb([newH, checkedS, checkedV]);
            var _d = computedLight(checkedRgb[0], checkedRgb[1], checkedRgb[2]), checkedGray = _d.gray, checkedLight = _d.light;
            light = checkedLight;
            gray_1 = checkedGray;
        }
        // 降低明度
        while (mainLight < light && checkedV > 0) {
            checkedV--;
            checkedRgb = ColorGenerator.hsvToRgb([newH, checkedS, checkedV]);
            var _e = computedLight(checkedRgb[0], checkedRgb[1], checkedRgb[2]), checkedGray = _e.gray, checkedLight = _e.light;
            light = checkedLight;
            gray_1 = checkedGray;
        }
        newColor.checkedLight = light;
        newColor.checkedGray = gray_1;
        newColor.checkedRgb = checkedRgb;
        newColor.checkedColor = ColorGenerator.rgbToHex(checkedRgb);
        newColors.push(newColor);
    }
    console.log('newColors res: ', newColors);
    return newColors;
};

export { computedLight, getColorPalette };
