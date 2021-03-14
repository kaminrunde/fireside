"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const crypto_browserify_1 = require("crypto-browserify");
const React = require("react");
const addons_1 = require("@storybook/addons");
const Panel_1 = require("./Panel");
addons_1.default.register('addons:storyboard-bridge', api => {
    const channel = addons_1.default.getChannel();
    addons_1.default.addPanel('addons:storyboard-bridge', {
        title: 'Eigenschaften',
        render: () => React.createElement(Panel_1.default, { channel: channel, api: api }),
    });
    let component = {
        id: crypto_browserify_1.randomBytes(12).toString('hex'),
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
    window.addEventListener('message', (e) => {
        if (typeof e.data !== 'object' || !e.data.type)
            return;
        console.log('e.data', e.data);
        switch (e.data.type) {
            case 'fireside-hydrate-component': {
                if (!e.data.component) {
                    component.id = crypto_browserify_1.randomBytes(12).toString('hex');
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
    const hash = crypto_browserify_1.createHash('md5').update(JSON.stringify({
        props: component.props,
        name: component.name,
        id: component.id
    })).digest('hex');
    window.parent.postMessage({
        type: 'fireside-update-component',
        component: Object.assign(Object.assign({}, component), { hash })
    }, '*');
}
//# sourceMappingURL=register.js.map