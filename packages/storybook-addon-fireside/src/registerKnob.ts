import addons from '@storybook/addons'

const channel = addons.getChannel()

export default function registerKnob (name:string, component:any) {
  channel.emit('storyboard-bridge/register-custom-knob', name, component)
}