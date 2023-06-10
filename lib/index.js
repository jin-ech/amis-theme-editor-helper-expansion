/**
 * amis-theme-editor-helper v2.0.11-beta.2
 * Copyright 2018-2023 @fex
 */

'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var ColorGenerator = require('./ColorGenerator.js');
var ParseThemeData = require('./ParseThemeData.js');
var getGlobalData = require('./getGlobalData.js');
var styleOperation = require('./styleOperation.js');
var cxd = require('./systemTheme/cxd.js');
var antd = require('./systemTheme/antd.js');
var styleHelper = require('./styleHelper.js');
var color = require('./color.js');



exports.ColorGenerator = ColorGenerator.ColorGenerator;
exports.ParseThemeData = ParseThemeData.ParseThemeData;
exports.getGlobalData = getGlobalData.getGlobalData;
exports.addStyle = styleOperation.addStyle;
exports.findOrCreactStyle = styleOperation.findOrCreactStyle;
exports.insertStyle = styleOperation.insertStyle;
exports.cxdData = cxd["default"];
exports.antdData = antd["default"];
exports.getCssVarByName = styleHelper.getCssVarByName;
exports.getStyleById = styleHelper.getStyleById;
exports.styleBackground = styleHelper.styleBackground;
exports.styleBorder = styleHelper.styleBorder;
exports.computedLight = color.computedLight;
exports.getColorPalette = color.getColorPalette;
