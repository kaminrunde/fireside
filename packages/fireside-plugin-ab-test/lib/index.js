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
var React = require("react");
var fireside_utils_1 = require("@kaminrunde/fireside-utils");
var immer_1 = require("immer");
var utils = require("./utils");
exports.default = fireside_utils_1.createPlugin(function (ctx) {
    var modalConfirmed = false;
    var pw = '';
    ctx.extendSettingsPage({
        row: {
            title: 'AB-TEST',
            component: function (api) {
                var activate = function () {
                    if (ctx.options.password && pw !== ctx.options.password) {
                        ctx.actions.alert({
                            title: 'Wrong Password'
                        });
                        return;
                    }
                    modalConfirmed = true;
                    api.setState({
                        components: {},
                        byId: {}
                    });
                };
                var deactivate = function () { return __awaiter(void 0, void 0, void 0, function () {
                    var result;
                    return __generator(this, function (_a) {
                        switch (_a.label) {
                            case 0: return [4 /*yield*/, ctx.actions.alert({
                                    title: 'Remove AB-Test',
                                    description: 'This will complete remove the ab-test logic. The components will persist. Please remove the components you don\'t want any longer manually afterwars',
                                    options: ['ABORT', 'OK']
                                })];
                            case 1:
                                result = _a.sent();
                                if (result === 'OK') {
                                    modalConfirmed = false;
                                    api.setState(undefined);
                                }
                                return [2 /*return*/];
                        }
                    });
                }); };
                return (React.createElement("div", null,
                    React.createElement("button", { onClick: api.state ? deactivate : activate, style: styles.btn(Boolean(api.state)) }, api.state ? 'on' : 'off'),
                    ctx.options.password && !api.state && (React.createElement("input", { style: styles.input(), type: 'text', defaultValue: pw, placeholder: 'password', onChange: function (e) { return pw = e.target.value; } }))));
            }
        }
    });
    ctx.extendGridRow({
        badge: {
            component: function (api) { return (React.createElement("div", { style: styles.badge(api.state.components[api.mediaSize].A.includes(api.row)) }, api.state.components[api.mediaSize].A.includes(api.row) ? 'A' : 'B')); },
            isActive: function (api) {
                var _a, _b;
                return api.state && (((_a = api.state.components[api.mediaSize]) === null || _a === void 0 ? void 0 : _a.A.includes(api.row)) || ((_b = api.state.components[api.mediaSize]) === null || _b === void 0 ? void 0 : _b.B.includes(api.row)));
            }
        },
        settingsModal: {
            title: 'AB-Test',
            isActive: function (api) { return Boolean(api.state); },
            component: function RowModalRow(api) {
                var _a, _b;
                var setVariation = function (v) { return function () {
                    var state = api.state, mediaSize = api.mediaSize, row = api.row, story = api.story;
                    var newState = immer_1.produce(state, function (state) {
                        if (!state.components[mediaSize])
                            state.components[mediaSize] = {
                                A: [],
                                B: []
                            };
                        var r = function (i) { return i !== row; };
                        if (v === 'AB') {
                            state.components[mediaSize]['A'] = state.components[mediaSize]['A'].filter(r);
                            state.components[mediaSize]['B'] = state.components[mediaSize]['B'].filter(r);
                            if (state.components[mediaSize]['A'].length === 0
                                && state.components[mediaSize]['B'].length === 0) {
                                delete state.components[mediaSize];
                            }
                        }
                        else {
                            state.components[mediaSize]['A'] = state.components[mediaSize]['A'].filter(r);
                            state.components[mediaSize]['B'] = state.components[mediaSize]['B'].filter(r);
                            state.components[mediaSize][v].push(row);
                        }
                        utils.updateStateByComponents(state, story);
                    });
                    var maxComponents = ctx.options.maxComponents;
                    if (maxComponents && Object.keys(newState.byId).length > maxComponents) {
                        ctx.actions.alert({
                            title: 'Limit reached',
                            description: "You can only add up to " + maxComponents + " components as an ab-test"
                        });
                        return;
                    }
                    api.setState(newState);
                }; };
                var state = api.state, mediaSize = api.mediaSize, row = api.row;
                var mode = ((_a = state.components[mediaSize]) === null || _a === void 0 ? void 0 : _a.A.includes(row)) ? 'A'
                    : ((_b = state.components[mediaSize]) === null || _b === void 0 ? void 0 : _b.B.includes(row)) ? 'B'
                        : 'AB';
                return (React.createElement("div", { style: styles.btnWrapper() },
                    React.createElement("button", { style: styles.btn(mode === 'A'), onClick: setVariation('A') }, "A"),
                    React.createElement("button", { style: styles.btn(mode === 'B'), onClick: setVariation('B') }, "B"),
                    React.createElement("button", { style: styles.btn(mode === 'AB'), onClick: setVariation('AB') }, "Both")));
            }
        }
    });
    ctx.createStaticComponent({
        component: function (api) {
            if (!api.state)
                return null;
            if (modalConfirmed)
                return null;
            var handleSubmit = function () {
                if (pw !== ctx.options.password)
                    return;
                modalConfirmed = true;
                api.setState(api.state);
            };
            return (React.createElement("div", null,
                React.createElement("div", { style: styles.staticOverlay() }),
                React.createElement("div", { style: styles.staticWrapper() },
                    React.createElement("h3", { style: { textAlign: 'center', fontFamily: "'Open Sans', sans-serif" } }, "Running AB-Test"),
                    React.createElement("input", { onChange: function (e) { return pw = e.target.value; }, style: styles.staticInput(), placeholder: 'password' }),
                    React.createElement("br", null),
                    React.createElement("button", { onClick: handleSubmit, style: styles.staticButton() }, "Submit"))));
        }
    });
    var lastStoryHash = '';
    ctx.onStoryUpdate(function (api) {
        if (!api.state)
            return;
        if (lastStoryHash === api.story.hash)
            return;
        lastStoryHash = api.story.hash;
        var newState = immer_1.produce(api.state, function (state) {
            var _loop_1 = function (ms) {
                if (!api.story.grids[ms].enabled) {
                    delete state.components[ms];
                    return "continue";
                }
                var maxRowIndex = api.story.grids[ms].grid.length - 1;
                if (maxRowIndex === -1) {
                    state.components[ms] = { A: [], B: [] };
                }
                console.log(maxRowIndex, api.state.components[ms]);
                state.components[ms].A = state.components[ms].A.filter(function (n) { return n <= maxRowIndex; });
                state.components[ms].B = state.components[ms].B.filter(function (n) { return n <= maxRowIndex; });
            };
            for (var ms in state.components) {
                _loop_1(ms);
            }
            utils.updateStateByComponents(state, api.story);
        });
        if (JSON.stringify(newState) !== JSON.stringify(api.state)) {
            api.setState(newState);
        }
    });
    return undefined;
});
var styles = {
    badge: function (isA) { return ({
        background: isA ? 'green' : 'red',
        width: '100%',
        height: '100%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: '100%',
        color: 'white'
    }); },
    btnWrapper: function () { return ({
        display: 'flex',
        gap: 10,
        padding: 10
    }); },
    btn: function (active) { return ({
        border: 'none',
        padding: '10px 20px',
        background: active ? 'green' : 'lightgrey',
        fontSize: 18,
        cursor: 'pointer',
    }); },
    input: function () { return ({
        border: '1px solid grey',
        padding: '11px 20px',
        marginLeft: '10px',
        borderRadius: '2px'
    }); },
    staticOverlay: function () { return ({
        position: 'fixed',
        left: '0px',
        top: '0px',
        right: '0px',
        bottom: '0px',
        background: 'rgba(0,0,0,0.4)',
        zIndex: 9999999999999999
    }); },
    staticWrapper: function () { return ({
        position: 'fixed',
        left: '50%',
        top: '100px',
        padding: '40px 60px',
        background: 'white',
        transform: 'translateX(-50%)',
        zIndex: 9999999999999999
    }); },
    staticInput: function () { return ({
        padding: '8px',
        border: '1px solid grey',
        borderRadius: '5px',
        marginBottom: '20px'
    }); },
    staticButton: function () { return ({
        display: 'block',
        width: '100%',
        padding: '10px',
        border: 'none',
        background: 'lightgrey',
        cursor: 'pointer'
    }); }
};
//# sourceMappingURL=index.js.map