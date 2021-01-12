import * as t from '../types'

export type CreatePage<State> = {
  slug: string
  navigation?: {
    icon?: any
    label: string
  }
  page: {
    title: string
    component: any
  }
}

export default function createPage <State, Options extends t.PluginOptions>(
  config:CreatePage<State>,
  options: Options
):t.PluginEvent[] {
  let events:t.PluginEvent[] = []

  if(config.navigation) events.push({
    type: 'CREATE_PAGE_NAVIGATION',
    meta: {key:options.key, slug: config.slug},
    payload: config.navigation
  })

  if(config.page) events.push({
    type: 'CREATE_PAGE_PAGE',
    meta: {key:options.key, slug: config.slug},
    payload: config.page
  })

  return events
}
