/**
 * amis-theme-editor-helper v2.0.11-beta.2
 * Copyright 2018-2023 @fex
 */

import { __spreadArray } from 'tslib';
import { getColorPalette } from './color.js';

var ColorGenerator = /** @class */ (function () {
    function ColorGenerator(color) {
        Object.defineProperty(this, "color", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: ''
        });
        //十六进制颜色值的正则表达式
        Object.defineProperty(this, "reg", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: /^#([0-9a-fA-f]{3}|[0-9a-fA-f]{6})$/
        });
        this.setPrimaryColor(color);
    }
    /**
     * 生成衍生色
     */
    Object.defineProperty(ColorGenerator.prototype, "getDerivedColor", {
        enumerable: false,
        configurable: true,
        writable: true,
        value: function () {
            var rgb = ColorGenerator.hexToRgb(this.color);
            var _a = ColorGenerator.rgbToHsv(rgb), h = _a[0], s = _a[1], v = _a[2];
            var scolors = [];
            var wcolors = [];
            var hsvCorrection = function (hsv) {
                var h = hsv[0], s = hsv[1], v = hsv[2];
                if (s < 10) {
                    s = 10;
                }
                return ColorGenerator.hsvCorrection([h, s, v]);
            };
            for (var i = 0; i < 4; i++) {
                var index = i + 1;
                var sh = void 0, ss = void 0, sv = void 0;
                if (h > 60 && h < 300) {
                    // 冷色
                    sh = h + index * 2;
                    ss = s + index * 5;
                    sv = v - index * 15;
                }
                else {
                    // 暖色
                    sh = h - index * 2;
                    ss = s + index * 5;
                    sv = v - index * 15;
                }
                var shsv = hsvCorrection([sh, ss, sv]);
                var srgb = ColorGenerator.hsvToRgb(shsv);
                var shex = ColorGenerator.rgbToHex(srgb);
                scolors.push({ hex: shex, hsv: shsv });
            }
            for (var i = 0; i < 5; i++) {
                var index = i + 1;
                var wh = void 0, ws = void 0, wv = void 0;
                if (h > 60 && h < 300) {
                    // 冷色
                    wh = h - index * 1;
                    ws = s - index * (s / 5);
                    wv = v + index * 5;
                }
                else {
                    // 暖色
                    wh = h + index * 1;
                    ws = s - index * (s / 5);
                    wv = v + index * (100 - v) * 5;
                }
                var whsv = hsvCorrection([wh, ws, wv]);
                var wrgb = ColorGenerator.hsvToRgb(whsv);
                var whex = ColorGenerator.rgbToHex(wrgb);
                wcolors.push({ hex: whex, hsv: whsv });
            }
            return __spreadArray(__spreadArray(__spreadArray([], scolors.reverse(), true), [
                { hex: this.color, hsv: [h, s, v] }
            ], false), wcolors, true);
        }
    });
    /**
    * 生成亮色衍生色
    */
    Object.defineProperty(ColorGenerator.prototype, "getLightDerivedColor", {
        enumerable: false,
        configurable: true,
        writable: true,
        value: function () {
            const rgb = ColorGenerator.hexToRgb(this.color);
            const hsv = ColorGenerator.rgbToHsv(rgb);
            const baseColor = { hex: this.color, hsv, rgb };
            const [h, s, v] = hsv;
            const getHsv = (hsv) => {
                let h = hsv[0], s = hsv[1], v = hsv[2];
                if (s < 10) {
                    s = 10;
                }
                return ColorGenerator.hsvCorrection([h, s, v]);
            };
            // 获取冷色调派生色盘
            const getColdColors = () => {
                const lightColors = new Array(5).fill('').map((_, index) => {
                    const _index = index + 1;
                    const _h = h - _index;
                    const _s = s - _index * 17;
                    const _v = v + _index * 5;
                    const newHsv = getHsv([_h, _s, _v]);
                    const newRgb = ColorGenerator.hsvToRgb(newHsv);
                    const newHex = ColorGenerator.rgbToHex(newRgb);
                    return {
                        hsv: newHsv,
                        rgb: newRgb,
                        hex: newHex
                    };
                });
                const deepColors = new Array(4).fill('').map((_, index) => {
                    const _index = index + 1;
                    const _h = h + _index * 2;
                    const _s = s + _index * 5;
                    const _v = v - _index * 15;
                    const newHsv = getHsv([_h, _s, _v]);
                    const newRgb = ColorGenerator.hsvToRgb(newHsv);
                    const newHex = ColorGenerator.rgbToHex(newRgb);
                    return {
                        hsv: newHsv,
                        rgb: newRgb,
                        hex: newHex
                    };
                }).reverse();
                return [...deepColors, baseColor, ...lightColors];
            };
            // 获取暖色调派生色盘
            const getWarmColors = () => {
                const lightColors = new Array(5).fill('').map((_, index) => {
                    const _index = index + 1;
                    const _h = h + _index;
                    const _s = s - _index * 15;
                    const _v = v + _index * 5;
                    const newHsv = getHsv([_h, _s, _v]);
                    const newRgb = ColorGenerator.hsvToRgb(newHsv);
                    const newHex = ColorGenerator.rgbToHex(newRgb);
                    return {
                        hsv: newHsv,
                        rgb: newRgb,
                        hex: newHex
                    };
                });
                const deepColors = new Array(4).fill('').map((_, index) => {
                    const _index = index + 1;
                    const _h = h - _index * 2;
                    const _s = s + _index * 5;
                    const _v = v - _index * 15;
                    const newHsv = getHsv([_h, _s, _v]);
                    const newRgb = ColorGenerator.hsvToRgb(newHsv);
                    const newHex = ColorGenerator.rgbToHex(newRgb);
                    return {
                        hsv: newHsv,
                        rgb: newRgb,
                        hex: newHex
                    };
                }).reverse();
                return [...deepColors, baseColor, ...lightColors];
            };
            // 冷模型
            if (h > 60 && h < 300) {
                return getColdColors();
            }
            // 暖模型
            return getWarmColors();
        }
    });
    /**
   * 生成深色衍生色
   */
    Object.defineProperty(ColorGenerator.prototype, "getDeepDerivedColor", {
        enumerable: false,
        configurable: true,
        writable: true,
        value: function () {
            // 以亮色为基准,先获取亮色派生色
            const lightDerivedColor = this.getLightDerivedColor(this.color);
            const getHsv = (hsv) => {
                let h = hsv[0], s = hsv[1], v = hsv[2];
                return ColorGenerator.hsvCorrection([h, s, v]);
            };
            const deepDerivedColor = lightDerivedColor.map((color, index) => {
                const [_h, _s, _v] = color.hsv;
                // 深色
                if (index < 5) {
                    return { ...color, hsv: getHsv([_h, _s, _v + 5]) }
                }
                // 基准色
                if (index === 5) {
                    // 亮色五阶颜色,也是基准色
                    const hsv4 = lightDerivedColor[4].hsv;
                    // 亮色六阶颜色
                    const hsv5 = lightDerivedColor[5].hsv;
                    // 计算最新的基准色
                    const hsv = [_h, Math.floor((hsv4[1] + hsv5[1]) / 2), _v];
                    return { ...color, hsv: getHsv(hsv) };
                }
                // 深色
                return { ...color, hsv: getHsv([_h, _s - 5, _v]) };
            });
            return deepDerivedColor;
        }
    });
    /**
     * 生成中性色
     */
    Object.defineProperty(ColorGenerator.prototype, "getNeutralColor", {
        enumerable: false,
        configurable: true,
        writable: true,
        value: function () {
            var rgb = ColorGenerator.hexToRgb(this.color);
            var _a = ColorGenerator.rgbToHsv(rgb), h = _a[0];
            var S = [65, 45, 25, 10, 6, 4, 2, 1, 1, 1, 0];
            var V = [8, 15, 25, 40, 55, 75, 85, 92, 96, 98, 100];
            var colors = [];
            for (var i = 0; i < 11; i++) {
                var newHsv = ColorGenerator.hsvCorrection([h, S[i], V[i]]);
                var newRgb = ColorGenerator.hsvToRgb(newHsv);
                var newHex = ColorGenerator.rgbToHex(newRgb);
                colors.push({ hex: newHex, hsv: newHsv });
            }
            return colors;
        }
    });
    /**
     * 生成功能色
     */
    Object.defineProperty(ColorGenerator.prototype, "getFunctionalColor", {
        enumerable: false,
        configurable: true,
        writable: true,
        value: function () {
            var rgb = ColorGenerator.hexToRgb(this.color);
            var _a = ColorGenerator.rgbToHsv(rgb), h = _a[0], s = _a[1]; _a[2];
            var errorH = { a: 375.06, b: 0.6, c: 134.93, d: 353.95 };
            var warnH = { a: 217.7, b: -0.02, c: 514460.59, d: -118.56 };
            var successH = { a: 130.48, b: -0.24, c: 0.00066 };
            var errorS = { a: 95.12, b: 2.34, c: 72.07, d: 69.59 };
            var warnS = { a: 95.1, b: 0.53, c: 74.9, d: 66.82 };
            var successS = { a: 100.5, b: -6.41, c: 80.99, d: 65.5 };
            var errorV = { a: 100.21, b: -16.63, c: 89.6, d: 83 };
            var warnV = { a: 270.03, b: -0.1, c: 1.18, d: -103.6 };
            var successV = { a: 81.5, b: -6.31, c: 91.2, d: 64.5 };
            var hs = [
                [
                    h === 0 ? 0 : ColorGenerator.functionY(h, errorH) - 3,
                    ColorGenerator.functionY(s, errorS) - 5,
                    ColorGenerator.functionY(s, errorV) + 7
                ],
                [
                    ColorGenerator.functionY(h + 1, warnH) - 7,
                    ColorGenerator.functionY(s + 1, warnS) + 5,
                    ColorGenerator.functionY(s + 1, warnV) - 23
                ],
                [
                    Math.round(successH.a + successH.b * h + successH.c * h * h),
                    ColorGenerator.functionY(s, successS) + 4,
                    ColorGenerator.functionY(s, successV) + 4
                ]
            ];
            var colors = hs.map(function (hsv) {
                hsv = ColorGenerator.hsvCorrection(hsv);
                var newRgb = ColorGenerator.hsvToRgb(hsv);
                var hex = ColorGenerator.rgbToHex(newRgb);
                return { hex: hex, hsv: hsv };
            });
            return colors;
        }
    });
    /**
     * 生成数据色
     */
    Object.defineProperty(ColorGenerator.prototype, "getDataColor", {
        enumerable: false,
        configurable: true,
        writable: true,
        value: function () {
            var colors = getColorPalette(this.color);
            var color1 = [
                colors[0],
                colors[4],
                colors[8],
                colors[12],
                colors[16],
                colors[20],
                colors[23]
            ];
            var color2 = [
                colors[0],
                colors[5],
                colors[10],
                colors[15],
                colors[19],
                colors[23],
                colors[3]
            ];
            var color3 = [
                colors[0],
                colors[1],
                colors[2],
                colors[3],
                colors[4],
                colors[5],
                colors[6]
            ];
            return [color1, color2, color3];
        }
    });
    Object.defineProperty(ColorGenerator.prototype, "setPrimaryColor", {
        enumerable: false,
        configurable: true,
        writable: true,
        value: function (color) {
            if (this.reg.test(color)) {
                this.color = color;
            }
            else {
                throw new Error('请传入十六进制色值');
            }
        }
    });
    Object.defineProperty(ColorGenerator, "hexToRgb", {
        enumerable: false,
        configurable: true,
        writable: true,
        value: function (hexColor) {
            if (hexColor.length === 4) {
                var hexColorNew = '#';
                for (var i = 1; i < 4; i += 1) {
                    hexColorNew += hexColor
                        .slice(i, i + 1)
                        .concat(hexColor.slice(i, i + 1));
                }
                hexColor = hexColorNew;
            }
            //处理六位的颜色值
            var hexColorChange = [];
            for (var i = 1; i < 7; i += 2) {
                hexColorChange.push(parseInt('0x' + hexColor.slice(i, i + 2)));
            }
            return hexColorChange;
        }
    });
    Object.defineProperty(ColorGenerator, "rgbToHex", {
        enumerable: false,
        configurable: true,
        writable: true,
        value: function (rgb) {
            var r = rgb[0], g = rgb[1], b = rgb[2];
            var hexr = r.toString(16).padStart(2, '0');
            var hexg = g.toString(16).padStart(2, '0');
            var hexb = b.toString(16).padStart(2, '0');
            return '#' + hexr + hexg + hexb;
        }
    });
    Object.defineProperty(ColorGenerator, "rgbToHsv", {
        enumerable: false,
        configurable: true,
        writable: true,
        value: function (rgb) {
            var r = rgb[0], g = rgb[1], b = rgb[2];
            r = r / 255;
            g = g / 255;
            b = b / 255;
            var h = 0, s, v;
            var min = Math.min(r, g, b);
            var max = (v = Math.max(r, g, b));
            var difference = max - min;
            if (max == min) {
                h = 0;
            }
            else {
                switch (max) {
                    case r:
                        h = (g - b) / difference + (g < b ? 6 : 0);
                        break;
                    case g:
                        h = 2 + (b - r) / difference;
                        break;
                    case b:
                        h = 4 + (r - g) / difference;
                        break;
                }
                h = Math.round(h * 60);
            }
            if (max == 0) {
                s = 0;
            }
            else {
                s = 1 - min / max;
            }
            s = Math.round(s * 100);
            v = Math.round(v * 100);
            return [h, s, v];
        }
    });
    Object.defineProperty(ColorGenerator, "hsvToRgb", {
        enumerable: false,
        configurable: true,
        writable: true,
        value: function (hsv) {
            var h = hsv[0], s = hsv[1], v = hsv[2];
            s = s / 100;
            v = v / 100;
            var r = 0, g = 0, b = 0;
            var i = Math.floor((h / 60) % 6);
            var f = h / 60 - i;
            var p = v * (1 - s);
            var q = v * (1 - f * s);
            var t = v * (1 - (1 - f) * s);
            switch (i) {
                case 0:
                    r = v;
                    g = t;
                    b = p;
                    break;
                case 1:
                    r = q;
                    g = v;
                    b = p;
                    break;
                case 2:
                    r = p;
                    g = v;
                    b = t;
                    break;
                case 3:
                    r = p;
                    g = q;
                    b = v;
                    break;
                case 4:
                    r = t;
                    g = p;
                    b = v;
                    break;
                case 5:
                    r = v;
                    g = p;
                    b = q;
                    break;
            }
            r = this.rgbCorrection(Math.round(r * 255.0));
            g = this.rgbCorrection(Math.round(g * 255.0));
            b = this.rgbCorrection(Math.round(b * 255.0));
            return [r, g, b];
        }
    });
    Object.defineProperty(ColorGenerator, "hsvCorrection", {
        enumerable: false,
        configurable: true,
        writable: true,
        value: function (hsv) {
            var h = hsv[0], s = hsv[1], v = hsv[2];
            if (h < 0) {
                h = 360 + h;
            }
            if (h >= 360) {
                h = h - 360;
            }
            if (s < 0) {
                s = 0;
            }
            if (s > 100) {
                s = 100;
            }
            if (v < 0) {
                v = 0;
            }
            if (v > 100) {
                v = 100;
            }
            return [h, s, v];
        }
    });
    Object.defineProperty(ColorGenerator, "rgbCorrection", {
        enumerable: false,
        configurable: true,
        writable: true,
        value: function (value) {
            if (value < 0) {
                return 0;
            }
            if (value > 255) {
                return 255;
            }
            return value;
        }
    });
    Object.defineProperty(ColorGenerator, "functionY", {
        enumerable: false,
        configurable: true,
        writable: true,
        value: function (x, coefficient) {
            var a = coefficient.a, b = coefficient.b, c = coefficient.c, d = coefficient.d;
            var res = (a - d) / (1 + Math.pow(x / c, b)) + d;
            return Math.round(res);
        }
    });
    Object.defineProperty(ColorGenerator, "isLightColor", {
        enumerable: false,
        configurable: true,
        writable: true,
        value: function (color) {
            var rgb = ColorGenerator.hexToRgb(color);
            var hsv = ColorGenerator.rgbToHsv(rgb);
            return hsv[1] < 20 && hsv[2] > 90;
        }
    });
    Object.defineProperty(ColorGenerator, "getFontColor", {
        enumerable: false,
        configurable: true,
        writable: true,
        value: function (color) {
            if (!color) {
                return '#fff';
            }
            return ColorGenerator.isLightColor(color) ? '#5C5F66' : '#fff';
        }
    });
    return ColorGenerator;
}());

export { ColorGenerator };
