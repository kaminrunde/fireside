"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var extendComponent_1 = require("./extendComponent");
function createPlugin(cb) {
    var events = [];
    var context = {
        extendComponent: function (cb) { events.push.apply(events, extendComponent_1.default(cb, {})); }
    };
    var initialState = cb(context, {});
    events.push({ type: 'INITIAL_STATE', payload: initialState });
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