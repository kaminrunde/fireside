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
/**
 * Updates a component by defined controller
 * - versionUpdate hook is called
 * - preprocessProps hook is called
 * - createContext hook is called
 * - createStoryEvents hook is called
 * @param c Component
 * @param config Config
 */
function preprocessComponent(c, getGridContext, config) {
    return __awaiter(this, void 0, void 0, function () {
        var controller, updated, storyEvents, _a, _b, _c, _d, _e, _f;
        return __generator(this, function (_g) {
            switch (_g.label) {
                case 0: return [4 /*yield*/, config.resolveController(c.name)];
                case 1:
                    controller = _g.sent();
                    updated = Object.assign({}, c);
                    storyEvents = [];
                    if (!controller)
                        return [2 /*return*/, [c, storyEvents]];
                    if (controller.versionUpdate) {
                        updated.props = controller.versionUpdate(updated.props);
                    }
                    if (!controller.preprocessProps) return [3 /*break*/, 3];
                    _a = updated;
                    return [4 /*yield*/, controller.preprocessProps(updated.props)];
                case 2:
                    _a.props = _g.sent();
                    _g.label = 3;
                case 3:
                    if (!controller.createContext) return [3 /*break*/, 5];
                    _b = updated;
                    _d = (_c = Object).assign;
                    _e = [{}, updated.props];
                    _f = {};
                    return [4 /*yield*/, controller.createContext(updated.props, { getGridContext: getGridContext })];
                case 4:
                    _b.props = _d.apply(_c, _e.concat([(_f.context = _g.sent(),
                            _f)]));
                    _g.label = 5;
                case 5:
                    if (!controller.createStoryEvents) return [3 /*break*/, 7];
                    return [4 /*yield*/, controller.createStoryEvents(updated.props)];
                case 6:
                    storyEvents = _g.sent();
                    _g.label = 7;
                case 7: return [2 /*return*/, [updated, storyEvents]];
            }
        });
    });
}
exports.default = preprocessComponent;
//# sourceMappingURL=preprocessComponent.js.map