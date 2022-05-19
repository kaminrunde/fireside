"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var React = require("react");
var fireside_utils_1 = require("@kaminrunde/fireside-utils");
var immer_1 = require("immer");
var utils = require("./utils");
exports.default = fireside_utils_1.createPlugin(function (ctx) {
    var modalConfirmed = false;
    ctx.extendSettingsPage({
        row: {
            title: 'AB-TEST',
            component: function (api) {
                var activate = function () {
                    modalConfirmed = true;
                    api.setState({
                        components: {},
                        byId: {}
                    });
                };
                var deactivate = function () {
                    modalConfirmed = false;
                    api.setState(undefined);
                };
                return (React.createElement("div", null,
                    React.createElement("button", { onClick: activate }, "activate ab-test"),
                    React.createElement("button", { onClick: deactivate }, "deactivate ab-test")));
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
                    api.setState(immer_1.produce(state, function (state) {
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
                    }));
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
    // ctx.createModal({
    //   isActive: ({state}) => state.active && !modalConfirmed,
    //   component: api => {
    //   }
    // })
    // return undefined
    // return {
    //   components: {},
    //   byId: {}
    // }
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
    }); }
};
//# sourceMappingURL=index.js.map