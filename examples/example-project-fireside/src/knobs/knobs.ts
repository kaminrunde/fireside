import {createCustomKnob} from '@kaminrunde/storybook-addon-fireside'

type StringOptions = {
  /** foo-bar */
  foo: 'bar'
}

/**
 * My cool custom Knob
 */
export const string = createCustomKnob<string, StringOptions>('string')
