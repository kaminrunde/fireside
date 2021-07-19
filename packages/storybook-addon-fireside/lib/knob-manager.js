"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.addSelector = exports.getProps = exports.getKnobs = void 0;
const objPath = require("object-path");
const addons_1 = require("@storybook/addons");
const react_1 = require("@storybook/react");
const csf_1 = require("@storybook/csf");
const knobStore = {};
const contextStore = {};
const selectorStore = {};
let currentStoryId = '';
let currentKnobs = [];
let currentController = {};
const channel = addons_1.default.getChannel();
let hydratedProps = null;
function getKnobs(context, simpleKnobs, controller, name) {
    contextStore[context.id] = context;
    const knobs = simpleKnobs.map(simpleKnob => {
        const id = `${context.kind}--${context.story}--${simpleKnob.prop}`;
        if (knobStore[id])
            return knobStore[id];
        else
            return knobStore[id] = Object.assign(Object.assign({}, simpleKnob), { id: id, story: context, defaultValue: simpleKnob.value });
    });
    if (hydratedProps) {
        const props = controller.versionUpdate
            ? controller.versionUpdate(hydratedProps)
            : hydratedProps;
        knobs.forEach(knob => {
            const hydratedValue = objPath.get(props, knob.prop);
            knob.value = hydratedValue || knob.value;
        });
    }
    else if (controller.versionUpdate) {
        const props = controller.versionUpdate(getProps(knobs));
        knobs.forEach(knob => {
            const newValue = objPath.get(props, knob.prop);
            knob.value = newValue || knob.value;
        });
    }
    if (currentStoryId !== context.id || hydratedProps) {
        currentStoryId = context.id;
        currentKnobs = knobs;
        currentController = controller;
        hydratedProps = null;
        channel.emit('storyboard-bridge/update-component-name', name);
        channel.emit('storyboard-bridge/set-knobs', knobs);
        channel.emit('storyboard-bridge/update-component-props', getProps(knobs));
    }
    return knobs;
}
exports.getKnobs = getKnobs;
function getProps(knobs) {
    let props = {};
    for (let knob of knobs) {
        objPath.set(props, knob.prop, knob.value);
    }
    return props;
}
exports.getProps = getProps;
function addSelector(name, cb) {
    selectorStore[name] = cb;
}
exports.addSelector = addSelector;
function clearKnobs() {
    for (const id in knobStore)
        knobStore[id].value = knobStore[id].defaultValue;
    react_1.forceReRender();
    channel.emit('storyboard-bridge/set-knobs', currentKnobs);
}
channel.on('storyboard-bridge/clear-props', () => {
    clearKnobs();
});
channel.on('storyboard-bridge/set-knob-value', ({ knobId, payload }) => {
    const knob = knobStore[knobId];
    if (!knob)
        throw new Error('#1 something strange happen');
    knob.value = payload;
    channel.emit('storyboard-bridge/update-component-props', getProps(currentKnobs));
    react_1.forceReRender();
});
channel.on('storyboard-bridge/hydrate-component', (component) => {
    const selector = selectorStore[component.name];
    if (!selector) {
        throw new Error('you forgot to implement "registerWidgetSelector" for widget ' + component.name);
    }
    clearKnobs();
    let context = selector(component.props);
    context.id = csf_1.toId(context.kind, context.story);
    const props = currentController.versionUpdate
        ? currentController.versionUpdate(component.props)
        : component.props;
    currentKnobs.forEach(knob => {
        const hydratedValue = objPath.get(props, knob.prop);
        knob.value = hydratedValue || knob.value;
    });
    channel.emit('storyboard-bridge/set-knobs', currentKnobs);
    channel.emit('storyboard-bridge/update-component-props', getProps(currentKnobs));
    react_1.forceReRender();
    if (currentStoryId !== context.id) {
        hydratedProps = component.props;
        channel.emit('storyboard-bridge/select-story', context);
    }
});
channel.emit('storyboard-bridge/init-knob-manager');
//# sourceMappingURL=knob-manager.js.map