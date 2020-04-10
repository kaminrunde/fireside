
export type Story = {

}

export type Connector = {
  onChange: (story?:Story) => void,
  setStory: (story:Story) => void
}