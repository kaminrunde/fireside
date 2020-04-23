"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const React = require("react");
const addons_1 = require("@storybook/addons");
const Panel_1 = require("./Panel");
addons_1.default.register('addons:storyboard-bridge', api => {
    const channel = addons_1.default.getChannel();
    addons_1.default.addPanel('addons:storyboard-bridge', {
        title: 'Eigenschaften',
        render: () => React.createElement(Panel_1.default, { channel: channel, api: api }),
    });
    console.log('mount');
    window.parent.postMessage('hello world', '*');
    let component = {
        id: '',
        name: 'not-known',
        props: {}
    };
    channel.on('storyboard-bridge/select-story', context => {
        api.selectStory(context.kind, context.story);
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
    // simulate hydrating
    setTimeout(() => channel.emit('storyboard-bridge/hydrate-component', {
        id: 'generic-id',
        name: 'Button',
        props: {
            label: 'hydrated'
        }
    }), 2000);
});
function sendToFiresideApp(component) {
    window.parent.postMessage({
        type: 'fireside-update-component',
        component
    }, '*');
}
//# sourceMappingURL=register.js.map