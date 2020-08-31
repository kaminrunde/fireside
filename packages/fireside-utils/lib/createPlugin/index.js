"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var extendComponent_1 = require("./extendComponent");
function createPlugin(cb, options) {
    var events = [];
    var context = {
        extendComponent: function (config) { events.push.apply(events, extendComponent_1.default(config, options)); }
    };
    var initialState = cb(context, options);
    events.push({ type: 'INITIAL_STATE', meta: options, payload: initialState });
    return events;
}
exports.default = createPlugin;
// createPlugin<{foo:string}>(ctx => {
//   ctx.extendComponent(api => ({
//     icon: {
//       isActive: state => false,
//       component: 'hello',
//       onClick: () => null
//     }
//   }))
//   return {foo:'bar'}
// })
//# sourceMappingURL=index.js.map