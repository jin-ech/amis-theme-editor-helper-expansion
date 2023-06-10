/**
 * amis-theme-editor-helper v2.0.11-beta.2
 * Copyright 2018-2023 @fex
 */

var ParseThemeData = /** @class */ (function () {
    function ParseThemeData(data, scope) {
        Object.defineProperty(this, "style", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: []
        });
        Object.defineProperty(this, "class", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: []
        });
        Object.defineProperty(this, "data", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        Object.defineProperty(this, "scope", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        Object.defineProperty(this, "theme", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        this.data = data;
        this.scope = scope;
        this.theme = data.config.key;
    }
    Object.defineProperty(ParseThemeData.prototype, "generator", {
        enumerable: false,
        configurable: true,
        writable: true,
        value: function () {
            var _a = this.data, global = _a.global, component = _a.component;
            var colors = global.colors, fonts = global.fonts, borders = global.borders, sizes = global.sizes, shadows = global.shadows;
            this.parseColor(colors);
            this.parseFont(fonts);
            this.parseGlobalCommon(borders);
            this.parseGlobalCommon(sizes);
            this.parseSizesBase(sizes);
            this.parseShadows(shadows);
            for (var key in component) {
                if (key === 'button1') {
                    this.parseButton(component['button1']);
                }
                else if (key === 'inputRating') {
                    this.parseInputRating(component['inputRating']);
                }
                else {
                    this.parseComponentCommon(component[key]);
                }
            }
        }
    });
    Object.defineProperty(ParseThemeData.prototype, "getStyle", {
        enumerable: false,
        configurable: true,
        writable: true,
        value: function () {
            return this.getCssVariable() + this.getCustomClass();
        }
    });
    Object.defineProperty(ParseThemeData.prototype, "getCssVariable", {
        enumerable: false,
        configurable: true,
        writable: true,
        value: function () {
            return "".concat(this.scope.join(', '), "{").concat(this.style.join(';'), ";}\n");
        }
    });
    Object.defineProperty(ParseThemeData.prototype, "getCustomClass", {
        enumerable: false,
        configurable: true,
        writable: true,
        value: function () {
            return "".concat(this.class.join('\n'));
        }
    });
    /**
     * 获取自定义样式，需要使用less或scss编译后使用
     */
    Object.defineProperty(ParseThemeData.prototype, "getCustomStyle", {
        enumerable: false,
        configurable: true,
        writable: true,
        value: function () {
            var _a, _b;
            var customStyle = ((_b = (_a = this.data) === null || _a === void 0 ? void 0 : _a.customStyle) === null || _b === void 0 ? void 0 : _b.style) || '';
            return customStyle;
        }
    });
    /**
     * 装载css变量
     */
    Object.defineProperty(ParseThemeData.prototype, "cssFormat", {
        enumerable: false,
        configurable: true,
        writable: true,
        value: function (key, value) {
            if (!value) {
                return;
            }
            this.style.push("".concat(key, ": ").concat(value));
        }
    });
    /**
     * 装载class
     */
    Object.defineProperty(ParseThemeData.prototype, "classFormat", {
        enumerable: false,
        configurable: true,
        writable: true,
        value: function (classname, value) {
            // 自定义的不需要在命名空间下了
            this.class.push("".concat(classname, "{").concat(value, "}"));
        }
    });
    /**
     * 解析全局颜色
     */
    Object.defineProperty(ParseThemeData.prototype, "parseColor", {
        enumerable: false,
        configurable: true,
        writable: true,
        value: function (colors) {
            var _this = this;
            this.cssFormat('--colors-neutral-fill-none', 'translate');
            for (var key in colors) {
                var color = colors[key];
                if (key !== 'brand') {
                    color.body.forEach(function (item) {
                        var prefix = item.token;
                        for (var colorKey in item.body) {
                            if (colorKey === 'colors') {
                                item.body.colors.forEach(function (color) {
                                    _this.cssFormat(color.token, color.color);
                                });
                            }
                            else if (!Array.isArray(item.body[colorKey])) {
                                _this.cssFormat(prefix + colorKey, item.body[colorKey]);
                            }
                        }
                    });
                }
                else {
                    var prefix = color.token;
                    for (var colorKey in color.body) {
                        if (colorKey === 'colors') {
                            color.body.colors.forEach(function (color) {
                                _this.cssFormat(color.token, color.color);
                            });
                        }
                        else if (!Array.isArray(color.body[colorKey])) {
                            this.cssFormat(prefix + colorKey, color.body[colorKey]);
                        }
                    }
                }
            }
        }
    });
    /**
     * 解析全局字体
     */
    Object.defineProperty(ParseThemeData.prototype, "parseFont", {
        enumerable: false,
        configurable: true,
        writable: true,
        value: function (fonts) {
            var _this = this;
            var _loop_1 = function (key) {
                var font = fonts[key];
                if (key === 'base') {
                    var family_1 = '';
                    font.body.forEach(function (item, index) {
                        family_1 += item.value || '';
                        if (index !== font.body.length - 1) {
                            family_1 += ', ';
                        }
                    });
                    this_1.cssFormat(font.token, family_1);
                }
                else {
                    font.body.forEach(function (item) {
                        _this.cssFormat(item.token, item.value);
                    });
                }
            };
            var this_1 = this;
            for (var key in fonts) {
                _loop_1(key);
            }
        }
    });
    // 解析基础尺寸
    Object.defineProperty(ParseThemeData.prototype, "parseSizesBase", {
        enumerable: false,
        configurable: true,
        writable: true,
        value: function (item) {
            var reg = /\d+(\.\d+)?/;
            var unitReg = /[^\d\.]+/;
            var start = parseFloat(item.size.start.match(reg)[0]);
            var base = item.size.base;
            var unit = item.size.start.match(unitReg)[0];
            for (var i = 0; i < 50; i++) {
                this.cssFormat("--sizes-base-".concat(i + 1), start + i * base + unit);
            }
        }
    });
    /**
     * 解析全局样式通用
     */
    Object.defineProperty(ParseThemeData.prototype, "parseGlobalCommon", {
        enumerable: false,
        configurable: true,
        writable: true,
        value: function (items) {
            var _this = this;
            for (var key in items) {
                var item = items[key];
                item.body.forEach(function (i) {
                    _this.cssFormat(i.token, i.value);
                });
            }
        }
    });
    /**
     * 解析阴影样式
     */
    Object.defineProperty(ParseThemeData.prototype, "parseShadows", {
        enumerable: false,
        configurable: true,
        writable: true,
        value: function (items) {
            var _this = this;
            var item = items.shadow;
            item.body.forEach(function (i) {
                var shadowStyle = i.value.map(function (shadow) {
                    return "".concat(shadow.inset ? 'inset' : '', " ").concat(shadow.x, " ").concat(shadow.y, " ").concat(shadow.blur, " ").concat(shadow.spread, " ").concat(shadow.color);
                });
                _this.cssFormat(i.token, shadowStyle.join(', '));
            });
        }
    });
    /**
     * 设置组件样式
     */
    Object.defineProperty(ParseThemeData.prototype, "setComponentStyle", {
        enumerable: false,
        configurable: true,
        writable: true,
        value: function (key, token, value) {
            if (typeof value === 'string') {
                this.cssFormat(token + key, value);
            }
            else {
                if (key.indexOf('padding-and-margin') > -1) {
                    for (var k in value) {
                        this.cssFormat(token + key.replace('padding-and-margin', '') + k, value[k]);
                    }
                }
                else if (key.indexOf('size') > -1) {
                    for (var k in value) {
                        this.cssFormat(token + key.replace('size', '') + k, value[k]);
                    }
                }
                else if (key.indexOf('font') > -1) {
                    for (var k in value) {
                        this.cssFormat(token + key.replace('font', '') + k, value[k]);
                    }
                }
                else if (key.indexOf('border') > -1) {
                    for (var k in value) {
                        this.cssFormat(token + key.replace('border', '') + k, value[k]);
                    }
                }
                else {
                    for (var k in value) {
                        this.cssFormat("".concat(token).concat(k), value[k]);
                    }
                }
            }
        }
    });
    /**
     * 解析Button
     */
    Object.defineProperty(ParseThemeData.prototype, "parseButton", {
        enumerable: false,
        configurable: true,
        writable: true,
        value: function (button) {
            var _this = this;
            var type = button.type, size = button.size;
            var setButtonCssValue = function (token, body) {
                for (var key in body) {
                    var data = body[key];
                    _this.setComponentStyle(key, token, data);
                }
            };
            var _loop_2 = function (item) {
                ['default', 'hover', 'active', 'disabled'].forEach(function (state) {
                    setButtonCssValue(item[state].token, item[state].body);
                });
                if (item.custom) {
                    var fontType_1 = item.type;
                    var style = function (state) {
                        return [
                            "color: var(--button-".concat(fontType_1, "-").concat(state, "-font-color)"),
                            "background: var(--button-".concat(fontType_1, "-").concat(state, "-bg-color)"),
                            "box-shadow: var(--button-".concat(fontType_1, "-").concat(state, "-shadow)"),
                            "border-width: var(--button-".concat(fontType_1, "-").concat(state, "-top-border-width) var(--button-").concat(fontType_1, "-").concat(state, "-right-border-width) var(--button-").concat(fontType_1, "-").concat(state, "-bottom-border-width) var(--button-").concat(fontType_1, "-").concat(state, "-left-border-width)"),
                            "border-color: var(--button-".concat(fontType_1, "-").concat(state, "-top-border-color) var(--button-").concat(fontType_1, "-").concat(state, "-right-border-color) var(--button-").concat(fontType_1, "-").concat(state, "-bottom-border-color) var(--button-").concat(fontType_1, "-").concat(state, "-left-border-color)"),
                            "border-style: var(--button-".concat(fontType_1, "-").concat(state, "-top-border-style) var(--button-").concat(fontType_1, "-").concat(state, "-right-border-style) var(--button-").concat(fontType_1, "-").concat(state, "-bottom-border-style) var(--button-").concat(fontType_1, "-").concat(state, "-left-border-style)")
                        ].join(';');
                    };
                    this_2.classFormat(".cxd-Button--".concat(fontType_1), "".concat(style('default')));
                    this_2.classFormat(".cxd-Button--".concat(fontType_1, ":not(:disabled):not(.is-disabled):hover"), "".concat(style('hover')));
                    this_2.classFormat(".cxd-Button--".concat(fontType_1, ":not(:disabled):not(.is-disabled):hover:active"), "".concat(style('active')));
                }
            };
            var this_2 = this;
            for (var _i = 0, type_1 = type; _i < type_1.length; _i++) {
                var item = type_1[_i];
                _loop_2(item);
            }
            for (var _a = 0, size_1 = size; _a < size_1.length; _a++) {
                var item = size_1[_a];
                setButtonCssValue(item.token, item.body);
                if (item.custom) {
                    var fontType = item.type;
                    this.classFormat(".cxd-Button--size-".concat(fontType), [
                        "font-size: var(--button-size-".concat(fontType, "-fonSize)"),
                        "font-weight: var(--button-size-".concat(fontType, "-fontWeight)"),
                        "line-height: var(--button-size-".concat(fontType, "-lineHeight)"),
                        "min-width: var(--button-size-".concat(fontType, "-minWidth)"),
                        "height: var(--button-size-".concat(fontType, "-height)"),
                        "border-radius: var(--button-size-".concat(fontType, "-top-right-border-radius) var(--button-size-").concat(fontType, "-top-left-border-radius) var(--button-size-").concat(fontType, "-bottom-right-border-radius) var(--button-size-").concat(fontType, "-bottom-left-border-radius)"),
                        "padding: var(--button-size-".concat(fontType, "-paddingTop) var(--button-size-").concat(fontType, "-paddingRight) var(--button-size-").concat(fontType, "-paddingBottom) var(--button-size-").concat(fontType, "-paddingLeft)"),
                        "margin: var(--button-size-".concat(fontType, "-marginTop) var(--button-size-").concat(fontType, "-marginRight) var(--button-size-").concat(fontType, "-marginBottom) var(--button-size-").concat(fontType, "-marginLeft)")
                    ].join(';'));
                }
            }
        }
    });
    /**
     * 解析Tranfer
     */
    Object.defineProperty(ParseThemeData.prototype, "parseTransfer", {
        enumerable: false,
        configurable: true,
        writable: true,
        value: function (transfer) {
            for (var typeKey in transfer) {
                var token = transfer[typeKey].token;
                var body = transfer[typeKey].body;
                for (var key in body) {
                    this.setComponentStyle(key, token, body[key]);
                }
            }
        }
    });
    /**
     * 解析inputRating
     */
    Object.defineProperty(ParseThemeData.prototype, "parseInputRating", {
        enumerable: false,
        configurable: true,
        writable: true,
        value: function (inputRating) {
            var data = JSON.parse(JSON.stringify(inputRating));
            var colors = data.activeColors;
            this.cssFormat('--Rating-colors', "'".concat(JSON.stringify(colors), "'"));
            delete data.activeColors;
            this.parseComponentCommon(data);
        }
    });
    // 解析组件通用方法
    Object.defineProperty(ParseThemeData.prototype, "parseComponentCommon", {
        enumerable: false,
        configurable: true,
        writable: true,
        value: function (component) {
            if (component.token) {
                // 有token时结束递归
                var token = component.token;
                for (var key in component.body) {
                    this.setComponentStyle(key, token, component.body[key]);
                }
            }
            else {
                for (var key in component) {
                    if (typeof component[key] === 'object') {
                        this.parseComponentCommon(component[key]);
                    }
                }
            }
        }
    });
    return ParseThemeData;
}());

export { ParseThemeData };
