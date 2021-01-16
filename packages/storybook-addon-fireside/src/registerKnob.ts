import addons from '@storybook/addons'



export default function registerKnob (name:string, component:any) {
  // @ts-ignore
  if(!window.__customKnobs) window.__customKnobs = {}
  // @ts-ignore
  window.__customKnobs[name] = component

  // @ts-ignore
  if(window.__addCustomKnob){
    // @ts-ignore
    window.__addCustomKnob(name, component)
  }
}