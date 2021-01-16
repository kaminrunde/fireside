"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function registerKnob(name, component) {
    if (!window.__customKnobs)
        window.__customKnobs = {};
    window.__customKnobs[name] = component;
    if (window.__addCustomKnob) {
        window.__addCustomKnob(name, component);
    }
}
exports.default = registerKnob;
//# sourceMappingURL=registerKnob.js.map