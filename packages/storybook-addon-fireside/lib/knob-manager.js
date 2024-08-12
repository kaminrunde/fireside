"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.addSelector = exports.getProps = exports.getKnobs = void 0;
const objPath = require("object-path");
const preview_api_1 = require("@storybook/preview-api");
const csf_1 = require("@storybook/csf");
const uuid_1 = require("uuid");
const knobStore = {};
const contextStore = {};
const selectorStore = {};
let forceReRender = () => null;
let currentStoryId = '';
let currentKnobs = [];
let currentController = {};
const channel = preview_api_1.addons.getChannel();
let hydratedProps = null;
const functionRegistry = {};
let currentComponent = '';
function getKnobs(context, simpleKnobs, controller, name, rerender) {
    contextStore[context.id] = context;
    forceReRender = rerender;
    const knobs = simpleKnobs.map(simpleKnob => {
        const id = `${context.kind}--${context.story}--${simpleKnob.prop}`;
        if (knobStore[id])
            return knobStore[id];
        else
            return knobStore[id] = {
                ...simpleKnob,
                id: id,
                story: context,
                defaultValue: simpleKnob.value
            };
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
    console.log('---');
    console.log('context.id', context.id);
    console.log('currentComponent', currentComponent);
    console.log('---');
    if (currentComponent === context.id) {
        currentComponent = '';
        currentKnobs = knobs;
        currentController = controller;
        hydratedProps = null;
        console.log('hydrateProps:59', hydratedProps);
        channel.emit('storyboard-bridge/update-component-name', name);
        channel.emit("storyboard-bridge/set-knobs", replaceFunctionsWithIdsAndEmit(knobs));
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
    forceReRender();
    channel.emit('storyboard-bridge/set-knobs', replaceFunctionsWithIdsAndEmit(currentKnobs));
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
    forceReRender();
});
channel.on('storyboard-bridge/hydrate-component', (component) => {
    const selector = selectorStore[component.name];
    if (!selector) {
        throw new Error('you forgot to implement "registerWidgetSelector" for widget ' + component.name);
    }
    clearKnobs();
    let context = selector(component.props);
    // transform of the story name to match the storybook id
    // storybook is doing this, when the story is registered
    // based on the exported storyname
    context.id = (0, csf_1.toId)(context.kind, startCase(context.story));
    context.story = transformIfPascalCase(context.story);
    const hydrate = () => {
        const props = currentController.versionUpdate
            ? currentController.versionUpdate(component.props)
            : component.props;
        currentKnobs.forEach(knob => {
            const hydratedValue = objPath.get(props, knob.prop);
            knob.value = hydratedValue ?? knob.value;
        });
        channel.emit('storyboard-bridge/set-knobs', replaceFunctionsWithIdsAndEmit(currentKnobs));
        channel.emit('storyboard-bridge/update-component-props', getProps(currentKnobs));
        forceReRender();
    };
    if (currentStoryId !== context.id) {
        hydratedProps = component.props;
        console.log('hydrateProps:129', hydratedProps);
        channel.emit('storyboard-bridge/select-story', context);
        setTimeout(() => hydrate(), 500);
    }
    else
        hydrate();
});
channel.emit('storyboard-bridge/init-knob-manager');
window.addEventListener('message', (message) => {
    try {
        const data = JSON.parse(message.data);
        if (data.type === 'create-component') {
            currentComponent = data.payload;
        }
    }
    catch (e) { }
});
channel.on("storyboard-bridge/register-function", ({ id, fn }) => {
    functionRegistry[id] = fn;
});
channel.on("storyboard-bridge/request-function", (id) => {
    if (functionRegistry[id]) {
        channel.emit(`storyboard-bridge/response-function-${id}`, functionRegistry[id]);
    }
});
const startCase = (str) => {
    return str
        .replace(/([a-z])([A-Z])/g, '$1 $2')
        .replace(/(\s|_)+/g, ' ')
        .replace(/(^\w{1})|(\s+\w{1})/g, (match) => match.toUpperCase());
};
const isPascalCase = (str) => {
    const isPascalCase = /^([A-Z][a-z0-9]*)+$/;
    return isPascalCase.test(str);
};
const pascalToSnakeCase = (str) => str.replace(/[A-Z]/g, letter => `_${letter.toLowerCase()}`);
// storybook-transformation
const transformIfPascalCase = (str) => {
    if (isPascalCase(str)) {
        return pascalToSnakeCase(str);
    }
    else {
        return str;
    }
};
const generateUniqueId = () => {
    return `function_${(0, uuid_1.v4)()}`;
};
const replaceFunctionsWithIdsAndEmit = (knobs) => {
    const knobsWithIds = knobs;
    for (const knob of knobsWithIds) {
        for (const key in knob.options) {
            if (typeof knob.options[key] === "function") {
                const id = generateUniqueId();
                functionRegistry[id] = knob.options[key].toString();
                channel.emit("storyboard-bridge/register-function", {
                    id,
                    fn: knob.options[key].toString(),
                });
                knob.options[key] = id;
            }
        }
    }
    return knobsWithIds;
};
