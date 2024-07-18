"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getPersistentChannel = void 0;
let persistentChannelInstance = null;
function getPersistentChannel(channel) {
    if (persistentChannelInstance)
        return persistentChannelInstance;
    let knobs = [];
    function initializeListeners() {
        channel.on("storyboard-bridge/set-knobs", (newKnobs) => {
            knobs = newKnobs;
        });
    }
    initializeListeners();
    persistentChannelInstance = {
        getKnobs: () => knobs,
        on: (event, callback) => channel.on(event, callback),
        emit: (event, data) => channel.emit(event, data),
    };
    return persistentChannelInstance;
}
exports.getPersistentChannel = getPersistentChannel;
