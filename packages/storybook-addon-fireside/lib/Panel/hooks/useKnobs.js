"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const React = require("react");
function useKnobs(channel) {
    const [knobs, setKnobs] = React.useState([]);
    const [key, setKey] = React.useState(1);
    const update = (knob, value) => {
        channel.emit('storyboard-bridge/set-knob-value', {
            knobId: knob.id,
            payload: value
        });
    };
    React.useEffect(() => {
        channel.on('storyboard-bridge/set-knobs', knobs => {
            setKnobs(knobs);
            setKey(key => key + 1);
        });
    }, [channel]);
    return [knobs, update, `${key}`];
}
exports.default = useKnobs;
//# sourceMappingURL=useKnobs.js.map