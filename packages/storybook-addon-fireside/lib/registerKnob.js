"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const addons_1 = require("@storybook/addons");
const channel = addons_1.default.getChannel();
function registerKnob(name, component) {
    channel.emit('storyboard-bridge/register-custom-knob', name, component);
}
exports.default = registerKnob;
//# sourceMappingURL=registerKnob.js.map