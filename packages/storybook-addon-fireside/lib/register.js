"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const uuid_1 = require("uuid");
const React = require("react");
const addons_1 = require("@storybook/addons");
const Panel_1 = require("./Panel");
const hashit = require('hash-it');
addons_1.default.register('addons:storyboard-bridge', api => {
    const channel = addons_1.default.getChannel();
    addons_1.default.addPanel('addons:storyboard-bridge', {
        title: 'Eigenschaften',
        render: () => React.createElement(Panel_1.default, { channel: channel, api: api, key: 'fireside' }),
    });
    let component = {
        id: uuid_1.v4(),
        name: 'not-known',
        props: {}
    };
    if (window.localStorage.getItem('debugFireside')) {
        channel.on("channelCreated", e => console.log("channelCreated", e));
        channel.on("getCurrentStory", e => console.log("getCurrentStory", e));
        channel.on("setCurrentStory", e => console.log("setCurrentStory", e));
        channel.on("getStories", e => console.log("getStories", e));
        channel.on("setStories", e => console.log("setStories", e));
        channel.on("storiesConfigured", e => console.log("storiesConfigured", e));
        channel.on("selectStory", e => console.log("selectStory", e));
        channel.on("previewKeydown", e => console.log("previewKeydown", e));
        channel.on("storyAdded", e => console.log("storyAdded", e));
        channel.on("storyChanged", e => console.log("storyChanged", e));
        channel.on("storyUnchanged", e => console.log("storyUnchanged", e));
        channel.on("forceReRender", e => console.log("forceReRender", e));
        channel.on("registerSubscription", e => console.log("registerSubscription", e));
        channel.on("storyInit", e => console.log("storyInit", e));
        channel.on("storyRender", e => console.log("storyRender", e));
        channel.on("storyRendered", e => console.log("storyRendered", e));
        channel.on("storyMissing", e => console.log("storyMissing", e));
        channel.on("storyErrored", e => console.log("storyErrored", e));
        channel.on("storyThrewException", e => console.log("storyThrewException", e));
        channel.on("storiesCollapseAll", e => console.log("storiesCollapseAll", e));
        channel.on("storiesExpandAll", e => console.log("storiesExpandAll", e));
        channel.on("docsRendered", e => console.log("docsRendered", e));
        channel.on("navigateUrl", e => console.log("navigateUrl", e));
        channel.on('storyboard-bridge/set-knobs', e => console.log('storyboard-bridge/set-knobs', e));
        channel.on('storyboard-bridge/set-knob-value', e => console.log('storyboard-bridge/set-knob-value', e));
        channel.on('storyboard-bridge/select-story', e => console.log('storyboard-bridge/select-story', e));
        channel.on('storyboard-bridge/story-selected', e => console.log('storyboard-bridge/story-selected', e));
        channel.on('storyboard-bridge/hydrate-component', e => console.log('storyboard-bridge/hydrate-component', e));
        channel.on('storyboard-bridge/update-component-name', e => console.log('storyboard-bridge/update-component-name', e));
        channel.on('storyboard-bridge/update-component-props', e => console.log('storyboard-bridge/update-component-props', e));
        channel.on('storyboard-bridge/init-knob-manager', e => console.log('storyboard-bridge/init-knob-manager', e));
    }
    channel.on('storyboard-bridge/select-story', context => {
        const storyId = api.storyId(context.kind, context.story);
        if (window.localStorage.getItem('debugFireside')) {
            console.log('createStoryId', storyId);
        }
        api.selectStory(storyId);
    });
    channel.on('storyboard-bridge/update-component-name', name => {
        component.name = name;
        sendToFiresideApp(component);
    });
    channel.on('storyboard-bridge/update-component-props', props => {
        component.props = props;
        sendToFiresideApp(component);
    });
    channel.on('storyboard-bridge/hydrate-component', ({ id }) => {
        component.id = id;
    });
    window.addEventListener('message', (e) => {
        if (typeof e.data !== 'object' || !e.data.type)
            return;
        switch (e.data.type) {
            case 'fireside-hydrate-component': {
                if (!e.data.component) {
                    component.id = uuid_1.v4();
                    channel.emit('storyboard-bridge/clear-props');
                }
                if (e.data.component) {
                    channel.emit('storyboard-bridge/hydrate-component', e.data.component);
                }
                else if (e.data.defaultStory) {
                    let paths = e.data.defaultStory.split('/');
                    const kind = paths.pop();
                    api.selectStory(paths.join('/'), kind);
                }
            }
        }
    });
    channel.on('storyboard-bridge/init-knob-manager', () => {
        window.parent.postMessage({
            type: 'fireside-init'
        }, '*');
    });
});
function sendToFiresideApp(component) {
    if (!component.createdAt) {
        const now = Date.now();
        component.createdAt = now;
        component.updatedAt = now;
    }
    component.updatedAt = Date.now();
    const hash = hashit({
        props: component.props,
        name: component.name,
        id: component.id
    });
    window.parent.postMessage({
        type: 'fireside-update-component',
        component: Object.assign(Object.assign({}, component), { hash })
    }, '*');
}
//# sourceMappingURL=register.js.map