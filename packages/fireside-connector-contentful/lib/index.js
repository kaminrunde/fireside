"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
var contentful_ui_extensions_sdk_1 = require("contentful-ui-extensions-sdk");
var zlib_1 = require("zlib");
var util_1 = require("util");
var gzipAsync = util_1.promisify(zlib_1.gzip);
var gunzipAsync = util_1.promisify(zlib_1.gunzip);
var sdk = null;
var initValue = 'empty';
var globalCb = function (val) {
    initValue = val;
};
var connector = {
    name: 'contentful',
    onChange: function (cb) {
        globalCb = cb;
        if (initValue !== 'empty')
            cb(initValue);
    },
    setStory: function (story) { return __awaiter(void 0, void 0, void 0, function () {
        var storyBuffer, compressedStory, compressedBase64;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    storyBuffer = Buffer.from(JSON.stringify(story));
                    return [4 /*yield*/, gzipAsync(storyBuffer)];
                case 1:
                    compressedStory = _a.sent();
                    compressedBase64 = Buffer.from(compressedStory).toString("base64");
                    try {
                        sdk && sdk.field.setValue({ compressedStory: compressedBase64 });
                    }
                    catch (e) {
                        console.log("error sdk.field.setValue: ", e);
                    }
                    return [2 /*return*/];
            }
        });
    }); }
};
contentful_ui_extensions_sdk_1.init(function (_sdk) { return __awaiter(void 0, void 0, void 0, function () {
    var value, compressedBuffer, decompressedBuffer;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                sdk = _sdk;
                try {
                    // @ts-ignore
                    sdk.window.updateHeight(1000);
                }
                catch (e) { }
                value = sdk.field.getValue();
                if (!(value && value.hasOwnProperty("compressedStory"))) return [3 /*break*/, 2];
                compressedBuffer = Buffer.from(value.compressedStory, "base64");
                return [4 /*yield*/, gunzipAsync(compressedBuffer)];
            case 1:
                decompressedBuffer = _a.sent();
                value = JSON.parse(decompressedBuffer.toString());
                console.log('value', value);
                _a.label = 2;
            case 2:
                globalCb(value);
                sdk.field.onValueChanged(globalCb);
                return [2 /*return*/];
        }
    });
}); });
exports.default = connector;
//# sourceMappingURL=index.js.map