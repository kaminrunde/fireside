"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var fa_1 = require("react-icons/fa");
var fireside_utils_1 = require("@kaminrunde/fireside-utils");
var immer_1 = require("immer");
exports.default = fireside_utils_1.createPlugin(function (ctx) {
    ctx.extendComponent({
        badge: {
            component: fa_1.FaArrowsAltH,
            isActive: function (_a) {
                var state = _a.state, component = _a.component, mediaSize = _a.mediaSize;
                if (!state[component.id])
                    return false;
                return (!!state[component.id][mediaSize]);
            }
        },
        icon: {
            component: fa_1.FaArrowsAltH,
            isActive: function (_a) {
                var state = _a.state, component = _a.component, mediaSize = _a.mediaSize;
                if (!state[component.id])
                    return false;
                return (!!state[component.id][mediaSize]);
            },
            onClick: function (_a) {
                var state = _a.state, component = _a.component, mediaSize = _a.mediaSize, setState = _a.setState;
                setState(immer_1.default(state, function (draft) {
                    if (!draft[component.id])
                        draft[component.id] = {};
                    draft[component.id][mediaSize] = !draft[component.id][mediaSize];
                    if (!draft[component.id][mediaSize])
                        delete draft[component.id][mediaSize];
                    if (Object.keys(draft[component.id]).length === 0) {
                        delete draft[component.id];
                    }
                }));
            }
        }
    });
    return {};
});
//# sourceMappingURL=index.js.map