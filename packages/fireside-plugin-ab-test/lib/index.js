"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var React = require("react");
var fireside_utils_1 = require("@kaminrunde/fireside-utils");
exports.default = fireside_utils_1.createPlugin(function (ctx) {
    var modalConfirmed = false;
    // ctx.extendSettingsPage({
    //   row: {
    //     title: 'AB-TEST',
    //     component: api => {
    //       const activate = () => {
    //         modalConfirmed = true
    //         api.setState({
    //           components: {}
    //         })
    //       }
    //       const deactivate = () => {
    //         modalConfirmed = false
    //         api.setState(undefined)
    //       }
    //       return (
    //         <div>
    //           <button onClick={activate}>activate ab-test</button>
    //           <button onClick={deactivate}>deactivate ab-test</button>
    //         </div>
    //       )
    //     }
    //   }
    // })
    ctx.extendGridRow({
        settingsModal: {
            title: 'AB-Test',
            // isActive: api => Boolean(api.state),
            component: function RowModalRow(api) {
                var setVariation = function (v) { return function () {
                }; };
                return (React.createElement("div", null,
                    React.createElement("button", { onClick: setVariation('A') }, "A"),
                    React.createElement("button", { onClick: setVariation('B') }, "B"),
                    React.createElement("button", { onClick: setVariation('AB') }, "Both")));
            }
        }
    });
    // ctx.createModal({
    //   isActive: ({state}) => state.active && !modalConfirmed,
    //   component: api => {
    //   }
    // })
    // return undefined
    return {
        components: {}
    };
});
//# sourceMappingURL=index.js.map