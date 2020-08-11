// // import * as a from '../actions'
// // import * as t from '../types'
// import * as s from '../selectors'
// import {State} from '../reducer'
// import useConnect, {Config} from 'hooks/useConnect'

// // type OmitParam1<T> = 
// // T extends (arg1:any, ...args: infer Args) => infer R ? (...args:Args) => R : never

// type Result = {
//   data: {
//     active: boolean,
//     onClick: Function
//   }[],
  
//   // updateGridArea: typeof a.updateGridArea
// }


// type Props = {
//   mediaSize: string,
// }

// const config:Config<Props,Result,State,object> = {
//   moduleKey: 'plugins',
//   name: 'plugins/useComponentIcons',
//   createCacheKey: () => '',
//   mapState: (state,props) => ({
//     data: s.getGrid(state,props.mediaSize)
//   }),
//   mapDispatch: {
//     addWidth: a.addWidth,
//   },
// }

// export default function useGrid (mediaSize:string):Result {
//   const props = {mediaSize}
//   const hook = useConnect<Props,Result,State,DP>(props, config)
//   return hook
// }