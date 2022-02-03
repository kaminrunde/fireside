"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function registerKnob(name, component) {
    if (typeof window === 'undefined')
        return;
    // @ts-ignore
    if (!window.__customKnobs)
        window.__customKnobs = {};
    // @ts-ignore
    window.__customKnobs[name] = component;
    // @ts-ignore
    if (window.__addCustomKnob) {
        // @ts-ignore
        window.__addCustomKnob(name, component);
    }
}
exports.default = registerKnob;
//# sourceMappingURL=registerKnob.js.map