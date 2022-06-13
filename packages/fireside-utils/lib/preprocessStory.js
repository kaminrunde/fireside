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
var preprocessComponent_1 = require("./preprocessComponent");
var createComponentGridContexts_1 = require("./createComponentGridContexts");
var versionUpdate_1 = require("./versionUpdate");
function preprocessStory(story, config) {
    return __awaiter(this, void 0, void 0, function () {
        var formatted, usedComponentIds, ms, _i, _a, row, _b, row_1, id, cachedGridContexts, getGridContexts, formattedComponents;
        return __generator(this, function (_c) {
            switch (_c.label) {
                case 0:
                    story = versionUpdate_1.default(story);
                    formatted = {
                        hash: story.hash,
                        componentsById: {},
                        allComponents: [],
                        grids: story.grids,
                        events: [],
                        plugins: story.plugins || {}
                    };
                    usedComponentIds = {};
                    for (ms in story.grids) {
                        for (_i = 0, _a = story.grids[ms].grid; _i < _a.length; _i++) {
                            row = _a[_i];
                            for (_b = 0, row_1 = row; _b < row_1.length; _b++) {
                                id = row_1[_b];
                                usedComponentIds[id] = true;
                            }
                        }
                    }
                    getGridContexts = function (id) {
                        if (!cachedGridContexts)
                            cachedGridContexts = createComponentGridContexts_1.default(story);
                        return cachedGridContexts[id];
                    };
                    return [4 /*yield*/, Promise.all(story.allComponents
                            .filter(function (name) { return usedComponentIds[name]; })
                            .map(function (name) { return story.componentsById[name]; })
                            .map(function (c) { return preprocessComponent_1.default(c, function () { return getGridContexts(c.id); }, {
                            resolveController: config.resolveController
                        }); }))];
                case 1:
                    formattedComponents = _c.sent();
                    formattedComponents.forEach(function (_a, i) {
                        var _b;
                        var c = _a[0], events = _a[1];
                        formatted.componentsById[c.id] = c;
                        formatted.allComponents.push(c.id);
                        (_b = formatted.events).push.apply(_b, events);
                    });
                    return [2 /*return*/, formatted];
            }
        });
    });
}
exports.default = preprocessStory;
//# sourceMappingURL=preprocessStory.js.map