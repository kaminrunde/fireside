import {RawStory} from 'fireside-utils'

export type Story = RawStory

export type Connector = {
  name: string,
  onChange: (cb:(story?:Story) => void) => void,
  setStory: (story:Story) => void
}