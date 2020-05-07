/// <reference types="node" />
/// <reference types="react" />
/// <reference types="react-dom" />

declare namespace NodeJS {
  interface ProcessEnv {
    readonly NODE_ENV: 'development' | 'production' | 'test';
    readonly PUBLIC_URL: string;
  }
}

declare module '@reach/router' {
  const module:any;
  const Router:any;
  const push:any;
  const Link:any;
  export {Router,push,Link}
  export default module
}

declare module 'redux-ruleset' {

  interface Context {
    get: (key:string) => any,
    set: (key:string, val:any) => void
  }
  
  interface Rule<Action> {
    id: string;
    target: '*' | string | string[],
    output: string[] | string,
    position?: 'BEFORE' | 'AFTER' | 'INSTEAD',
    addUntil?: any,
    addWhen?: any,
    weight?: number,
    addOnce?:boolean,
    concurrency?: 'FIRST' | 'LAST' | 'ONCE' | 'SWITCH',
    concurrencyFilter?: (action:Action) => string,
    throttle?: number,
    debounce?: number,
    delay?:number,
    condition?: (
      action: Action,
      opt: {
        getState: () => RootState,
        context: Context
      }
    ) => boolean,
    consequence: (
      action: Action,
      opt: {
        getState: () => RootState,
        dispatch: (action:{type:string}) => void,
        context: Context,
        addRule: (name:string, ...args:any[])=>void,
        removeRule: (name:string)=>void
      }
    ) => void | {type:string} | Promise<{type:string}> | null
    | Promise<void> | Promise<null> | Function,
    subRules?: Record<string,any>
  }
  // const addRule: <A>(rule:any)=>any;
  const addRule: <Action>(rule:Rule<Action>)=>Rule<Action>;
  const dispatchEvent:<Action>(action:Action)=>Action;
  const skipRule:<Action>(id:string[]|string,action:Action)=>Action;
  const middleware:any;
  export {addRule, dispatchEvent, skipRule};
  export default middleware;
}

declare module 'styled-components' {
  const module:any;
  export default module;
}

declare module 'react-grid-layout' {
  const module:any;
  export default module;
}

declare module '*.bmp' {
  const src: string;
  export default src;
}

declare module '*.gif' {
  const src: string;
  export default src;
}

declare module '*.jpg' {
  const src: string;
  export default src;
}

declare module '*.jpeg' {
  const src: string;
  export default src;
}

declare module '*.png' {
  const src: string;
  export default src;
}

declare module '*.webp' {
    const src: string;
    export default src;
}

declare module '*.svg' {
  import * as React from 'react';

  export const ReactComponent: React.FunctionComponent<React.SVGProps<
    SVGSVGElement
  > & { title?: string }>;

  const src: string;
  export default src;
}

declare module '*.module.css' {
  const classes: { readonly [key: string]: string };
  export default classes;
}

declare module '*.module.scss' {
  const classes: { readonly [key: string]: string };
  export default classes;
}

declare module '*.module.sass' {
  const classes: { readonly [key: string]: string };
  export default classes;
}
