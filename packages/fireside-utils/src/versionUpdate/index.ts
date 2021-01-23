import * as t from '../types'
import v2_0_0 from './v2_0_0'

export default function versionUpdate(story:t.RawStory):t.RawStory {
  story = v2_0_0(story)

  return story
}